// console.log("Hello from nodejs");

// const User = require("./person");

// const user1 = new User("Itachi", 14);
// user1.greetings();

// const Logger = require("./logger");

// const logger = new Logger();

// logger.log(" -> Hello from nodejs");
// logger.log(" -> Hello my friend");

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  //   if (req.url === "/") {
  //     fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(data);
  //     });
  //   }

  //   if (req.url === "/about") {
  //     fs.readFile(path.join(__dirname, "public", "about.html"), (err, data) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(data);
  //     });
  //   }

  //   if (req.url === "/api/users") {
  //     const users = [
  //       { name: "Prakhar", age: 24 },
  //       { name: "Rohit", age: 21 },
  //     ];
  //     res.writeHead(200, { "Content-Type": "application/json" });
  //     res.end(JSON.stringify(users));
  //   }

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  const ext = path.extname(filePath);

  let contentType = "text/html";

  switch (ext) {
    case ".json": {
      contentType = "application/json";
      break;
    }

    case ".css": {
      contentType = "text/css";
      break;
    }

    case ".js": {
      contentType = "text/javascript";
      break;
    }

    case ".png": {
      contentType = "image/png";
      break;
    }

    case ".jpg": {
      contentType = "image/jpeg";
      break;
    }
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Error
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content);
          }
        );
      } else {
        res.writeHead(500, "Server Error");
        res.end("Internal Server Error");
      }
    } else {
      // Succes
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`server on port: ${PORT}`));
