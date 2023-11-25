export class videoProcessor {
  #mp4Demuxer;
  #webMWriter;

  //in memory buffer for debugging
  #buffers = [];

  /**
   *
   * @param {object} options
   * @param {import("./mp4Demuxer.js").mp4Demuxer} options.MP4Demuxer
   * @param {import("../modules/webm-writer2.js").default} options.WebMWriter
   */
  constructor({ MP4Demuxer, WebMWriter }) {
    this.#mp4Demuxer = MP4Demuxer;
    this.#webMWriter = WebMWriter;
  }

  /**
   *
   * @returns ReadableStream
   */
  #mp4Decoder(stream) {
    return new ReadableStream({
      start: async (controller) => {
        const decoder = new VideoDecoder({
          /**
           *
           * @param {VideoFrame} frame
           */
          output(frame) {
            controller.enqueue(frame);
          },
          error(err) {
            console.log("mp4Decoder", err);
            controller.error(err);
          },
        });

        return this.#mp4Demuxer.run(stream, {
          async onConfig(config) {
            const { supported } = await VideoDecoder.isConfigSupported(config);
            if (!supported) {
              console.error(
                "mp4Demuxer VideoDecoder config not supported",
                config
              );
              controller.close();
              return;
            }

            decoder.configure(config);
          },
          /**
           *
           * @param {EncodedVideoChunk} chunk
           */
          onChunk(chunk) {
            decoder.decode(chunk);
          },
        });
      },
    });
  }

  #encoder(encoderConfig) {
    let _encode;

    const readable = new ReadableStream({
      start: async (controller) => {
        const { supported } = await VideoEncoder.isConfigSupported(
          encoderConfig
        );

        if (!supported) {
          const message = "VideoEncoder config not supported";
          console.error(message, encoderConfig);
          controller.error(message);
          return;
        }

        _encode = new VideoEncoder({
          /**
           *
           * @param {EncodedVideoChunk} frame
           * @param {EncodedVideoChunkMetadata} config
           */
          output: (frame, config) => {
            if (config.decoderConfig) {
              const decoderConfig = {
                type: "config",
                config: config.decoderConfig,
              };

              controller.enqueue(decoderConfig);
            }

            controller.enqueue(frame);
          },
          error: (err) => {
            console.error("VideoEncoder", err);
            controller.error(err);
          },
        });

        _encode.configure(encoderConfig);
      },
    });

    const writable = new WritableStream({
      async write(frame) {
        _encode.encode(frame);
        frame.close();
      },
    });

    return {
      readable,
      writable,
    };
  }

  #renderDecodedFrameAndGetEncodedChunk(renderFrame) {
    let _decode;

    return new TransformStream({
      start: (controller) => {
        _decode = new VideoDecoder({
          output(frame) {
            renderFrame(frame);
          },
          error(err) {
            console.error("renderFrame", err);
            controller.error(err);
          },
        });
      },

      /**
       *
       * @param {EncodedVideoChunk} EncodedChunk
       * @param {TransformStreamDefaultController} controller
       */
      transform: async (encodedChunk, controller) => {
        if (encodedChunk.type === "config") {
          await _decode.configure(encodedChunk.config);
          return;
        }

        _decode.decode(encodedChunk);
        controller.enqueue(encodedChunk);
      },
    });
  }

  #convertToWebM() {
    const writable = new WritableStream({
      write: (frame) => {
        this.#webMWriter.addFrame(frame);
      },
      close() {},
    });

    return {
      readable: this.#webMWriter.getStream(),
      writable,
    };
  }

  //stores buffer in memory for debugging
  #storeBuffer(sendMessage) {
    return new TransformStream({
      transform: ({ data, position }, controller) => {
        this.#buffers.push(data);
        controller.enqueue(data);
      },
      flush: () => {
        console.log(this.#buffers);
        sendMessage({
          status: "done",
          buffers: this.#buffers,
        });
      },
    });
  }

  /**
   *
   * @param {object} options
   * @param {File} options.file
   * @param {{
   *    codec: string
   *    pt: number
   *    hardwareAcceleration: string
   *    width: number
   *    height: number
   *    bitrate: number
   *}} options.encoderConfig
   * @param {(frame: VideoFrame) => void} options.renderFrame
   */
  async start({ file, encoderConfig, renderFrame, sendMessage }) {
    const stream = file.stream();
    const fileName = file.name.split("/").pop().replace(".mp4", "");

    await this.#mp4Decoder(stream)
      .pipeThrough(this.#encoder(encoderConfig))
      .pipeThrough(this.#renderDecodedFrameAndGetEncodedChunk(renderFrame))
      .pipeThrough(this.#convertToWebM())
      .pipeThrough(
        this.#storeBuffer((args) =>
          sendMessage({ ...args, fileName: `${fileName}-144p.webm` })
        )
      )
      .pipeTo(
        new WritableStream({
          write(frame) {},
        })
      );
  }
}
