const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

// create a http server
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// just simple helper function
const getReciverSocketId = (userId) => {
  return userScoket[userId];
};

// online user store
const userScoket = {};
// connection on
io.on("connection", (socket) => {
  console.log("A user is conected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) userScoket[userId] = socket.id;

  // with the help of this we send event all connected users/clients
  io.emit("getOnlineUsers", Object.keys(userScoket));

  socket.on("disconnect", () => {
    console.log("A user is disconneted", socket.id);
    delete userScoket[userId];

    io.emit("getOnlineUsers", Object.keys(userScoket));
  });
});

module.exports = { app, io, server,getReciverSocketId };
