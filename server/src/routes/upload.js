/**
 *
 * @param {object} options
 * @param {import("node:http2").Http2ServerRequest} options.req
 * @param {import("node:http2").Http2ServerResponse} options.res
 */
export function upload({ req, res }) {
  // Handle data chunks as they come in
  req.on("data", (chunk) => {
    console.log(chunk);
  });

  // Handle the end of the request
  req.on("end", () => {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
    });
    res.end(
      JSON.stringify({
        message: "File uploaded",
      })
    );
  });
}
