const fs = require("fs");

const handleRequest = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Send Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>",
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my node.js server</h1></body>");
  res.write("</html>");
  res.end();
};

// module.exports = handleRequest;

// module.exports = {
//   handler: handleRequest,
//   text: "Some Text",
// };

// module.exports.handler = handleRequest;
// module.exports.text = "Some Text";

exports.handler = handleRequest;
