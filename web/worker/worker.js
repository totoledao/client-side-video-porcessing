onmessage = (e) => {
  console.log(e.data);
  self.postMessage("Hello from the worker");
};
