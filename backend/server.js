const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { app, server } = require("./lib/socket");

//
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./lib/db");

//
dotenv.config({ debug: true });
connectDB();

//
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://ghup-shup.onrender.com",
    credentials: true,
  })
);

//
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//
const PORT = process.env.PORT;

//
server.listen(PORT, () => {
  console.log("server is running good PORT:3030");
});
