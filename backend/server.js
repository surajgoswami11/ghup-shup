const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({ debug: true });
const cors = require("cors");
const app = require("./lib/socket");

//
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./lib/db");

//
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//
connectDB();

//
const PORT = process.env.PORT;

//
app.listen(PORT, () => {
  console.log("server is running good PORT:3030");
});
