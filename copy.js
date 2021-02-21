const http = require("http");
const { readFile } = require("fs");

const error = (res) => {
  readFile("../public/404.html", (err, data) => {
    if (err) console.log("Error!");
    res.writeHead(400, { "Content-type": "text/css" });
    res.write(data);
    res.end();
  });
};

const server = http.createServer((req, res) => {
  if (req.url === "/")
    readFile(`../index.html`, (err, html) => {
      if (err) {
        error(res);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    });
  //Stylesheet
  if (req.url.endsWith(".css"))
    readFile(`..${req.url}`, (err, css) => {
      console.log(req.url);
      if (err) {
        error(res);
        return;
      }
      res.writeHead(200, { "Content-type": "text/css" });
      res.write(css);
      res.end();
    });
  //Public Page
  else
    readFile(`..${req.url}`, (err, html) => {
      if (err) {
        console.log(err);
        error(res);
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    });
  // //SubPages
  // if (req.url.endsWith("about"))
  //   readFile("../public/about.html", (err, html) => {
  //     if (err) {
  //       error(res);
  //       return;
  //     }
  //     res.writeHead(200, { "Content-Type": "text/html" });
  //     res.write(html);
  //     res.end();
  //   });
  // if (req.url.endsWith("contact-me"))
  //   readFile("../public/contact-me.html", (err, html) => {
  //     if (err) {
  //       error(res);
  //       return;
  //     }
  //     res.writeHead(200, { "Content-Type": "text/html" });
  //     res.write(html);
  //     res.end();
  //   });
});

console.log("Log on : http://localhost:3000/");
server.listen(3000);
