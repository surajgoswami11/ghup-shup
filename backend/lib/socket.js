const Server = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");

// create a http server
const app = express();
const server = http.createServer(app);

const io = Server(server, {
  cors: {
    origin: ["http://localhost:5173/"],
  },
});

module.exports = { io, app, server };
