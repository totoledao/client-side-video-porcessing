import Clock from "./modules/clock.js";
import { parseBytesIntoMBAndGB } from "./modules/utils.js";
import "./style.css";

//upload file
const fileUploadContainer = document.getElementById("fileUploadContainer");
const fileUploadInput = document.getElementById("fileUploadInput");

//uploaded file info
const fileInfoContainer = document.getElementById("fileInfoContainer");
const fileSize = document.getElementById("fileSize");
const txtfileName = document.getElementById("fileName");
const timeElapsed = document.getElementById("timeElapsed");

//canvas for displaying frames
/**
 * @type {HTMLCanvasElement}
 */
const getCanvas = document.getElementById("preview");

//trigger file input
fileUploadContainer.addEventListener("click", () => {
  fileUploadInput.click();
});

//update content
fileUploadInput.addEventListener("change", onChange);

let took = "";
const clock = new Clock();
const worker = new Worker(new URL("./worker/worker.js", import.meta.url), {
  type: "module",
});

worker.onmessage = ({ data }) => {
  if (data.status !== "done") return;

  clock.stop();
  timeElapsed.innerText = `Process took ${took.replace("ago", "")}`;
};

function onChange(e) {
  const file = e.target.files[0];
  const { name, size } = file;
  const canvas = getCanvas.transferControlToOffscreen();

  worker.postMessage(
    {
      file,
      canvas,
    },
    [canvas]
  );

  txtfileName.innerText = name;
  fileSize.innerText = parseBytesIntoMBAndGB(size);

  fileInfoContainer.classList.remove("hidden");
  fileUploadContainer.classList.add("hidden");

  clock.start((time) => {
    took = time;
    timeElapsed.innerText = `Process started ${time}`;
  });
}
