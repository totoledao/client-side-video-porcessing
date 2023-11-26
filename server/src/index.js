import http from "http";
import { upload } from "./routes/upload.js";

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/upload") {
    upload({ req, res });
    return;
  }

  res.end(
    JSON.stringify({
      message: "POST on /upload to upload a file",
    })
  );
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
