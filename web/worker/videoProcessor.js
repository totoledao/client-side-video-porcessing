export class videoProcessor {
  #mp4Demuxer;

  /**
   *
   * @param {import("./mp4Demuxer.js").mp4Demuxer} mp4Demuxer
   */
  constructor(mp4Demuxer) {
    this.#mp4Demuxer = mp4Demuxer;
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
  async start({ file, encoderConfig, renderFrame }) {
    const stream = file.stream();

    await this.#mp4Decoder(stream).pipeTo(
      new WritableStream({
        write(frame) {
          renderFrame(frame);
        },
      })
    );
  }
}
