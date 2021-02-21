const http = require("http");
const { readFile } = require("fs");

const server = http.createServer((req, res) => {
  //Public Page
  if (req.url === "/")
    readFile("../index.html", (err, html) => {
      if (err) throw Error(err.message);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    });
  //SubPages
  else if (req.url.endsWith(".html"))
    readFile(`..${req.url}`, (err, html) => {
      if (err) {
        readFile("../public/404.html", (err, html) => {
          res.writeHead(400, { "Content-type": "text/html" });
          res.write(html);
          res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(html);
        res.end();
      }
    });
  //Stylesheet
  else if (req.url.endsWith(".css"))
    readFile(`..${req.url}`, (err, css) => {
      res.writeHead(200, { "Content-type": "text/css" });
      res.write(css);
      res.end();
    });
});

console.log("Log on : http://localhost:3000/");
server.listen(3000);
