import Clock from "./modules/clock.js";
import "./style.css";

//upload file
const fileUploadContainer = document.getElementById("fileUploadContainer");
const fileUploadInput = document.getElementById("fileUploadInput");

//uploaded file info
const fileInfoContainer = document.getElementById("fileInfoContainer");
const fileSize = document.getElementById("fileSize");
const txtfileName = document.getElementById("fileName");
const timeElapsed = document.getElementById("timeElapsed");

// trigger file input
fileUploadContainer.addEventListener("click", () => {
  fileUploadInput.click();
});

//update content
fileUploadInput.addEventListener("change", onChange);

let took = "";

function parseBytesIntoMBAndGB(bytes) {
  const mb = bytes / (1024 * 1024);
  // if mb is greater than 1024, then convert to GB
  if (mb > 1024) {
    // rount to 2 decimal places
    return `${Math.round(mb / 1024)}GB`;
  }
  return `${Math.round(mb)}MB`;
}

const clock = new Clock();

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
