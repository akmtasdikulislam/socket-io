const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(expressServer);

// Creating Namespaces

let buyNsp = io.of("/buy");

buyNsp.on("connection", (socket) => {
  console.log(`New User Connected to buy ${socket.id}`);
  socket.emit("MyEvent", "Hello buy");
});

let sellNsp = io.of("/sell");
sellNsp.on("connection", (socket) => {
  console.log(`New User Connected to sell ${socket.id}`);
  socket.emit("MyEvent", "Hello sell");
});

// Regular Socket Connection
io.on("connection", function (socket) {
  console.log(`New User Connected ${socket.id}`);

  // setTimeout(() => {
  //   socket.send("Learn With Rabbil Hasan (Server --> Client)")
  // }, 5000);

  /*

  এখানে প্রতি ২ সেকেন্ড পর পর ক্লায়েন্টে টাইম স্ট্যাম্প পাঠানো হয়েছে

  setInterval(function () {
    let d = new Date();
    let t = d.getTime();

    socket.send(t);
  }, 2000);

  */

  /*
 // Custom Event
কাস্টম ইভেন্ট বানানোর জন্য .emit() ব্যবহার করা হয়েছে

  setInterval(function () {
    let d = new Date();
    let t = d.getTime();

    socket.emit("myEvent", t);
  }, 2000);
  */

  /*
  socket.on("message", function (msg) {
    console.log(msg);
  });

  // Note: 'message' একটা reserved event.
*/

  /* Using custom event name
  socket.on("myEvent", function (msg) {
    console.log(msg);
  });
*/

  // Broadcast example
  io.sockets.emit("MyBroadcast", "Hello Everyone");

  socket.on("disconnect", function () {
    console.log(`User Disconnected ${socket.id}`);
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, function () {
  console.log("Server Run @ 3000");
});
