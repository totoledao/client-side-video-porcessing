let canvas = {};
let ctx = {};

/**
 *
 * @param {HTMLCanvasElement} canvas
 */
export function canvasRenderer(canvas) {
  canvas = canvas;
  ctx = canvas.getContext("2d");

  let pendingFrame = null;

  return (frame) => {
    const renderAnimationFrame = () => {
      draw(pendingFrame);
      pendingFrame = null;
    };

    if (!pendingFrame) {
      requestAnimationFrame(renderAnimationFrame);
    } else {
      pendingFrame.close();
    }

    pendingFrame = frame;
  };
}

/**
 *
 * @param {VideoFrame} frame
 */
export function draw(frame) {
  const { displayWidth, displayHeight } = frame;
  canvas.width = displayWidth;
  canvas.height = displayHeight;

  ctx.drawImage(frame, 0, 0, displayWidth, displayHeight);
  frame.close();
}
