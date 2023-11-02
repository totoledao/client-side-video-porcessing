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

//trigger file input
fileUploadContainer.addEventListener("click", () => {
  fileUploadInput.click();
});

//update content
fileUploadInput.addEventListener("change", onChange);

let took = "";
const clock = new Clock();
const worker = new Worker(new URL("./worker/worker.js", import.meta.url));

worker.onmessage = (e) => {
  console.log("Message from worker:", e.data);
};

worker.postMessage("Working...");

function onChange(e) {
  const file = e.target.files[0];
  const { name, size } = file;
  txtfileName.innerText = name;
  fileSize.innerText = parseBytesIntoMBAndGB(size);

  fileInfoContainer.classList.remove("hidden");
  fileUploadContainer.classList.add("hidden");

  clock.start((time) => {
    took = time;
    timeElapsed.innerText = `Process started ${time}`;
  });

  setTimeout(() => {
    clock.stop();
    timeElapsed.innerText = `Process took ${took.replace("ago", "")}`;
  }, 5000);
}
