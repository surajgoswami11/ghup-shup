const express = require("express");
const {
  getUsers,
  getMessages,
  sendingMessage,
} = require("../controllers/messageController");
const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/users", protectRoute, getUsers);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendingMessage);

module.exports = router;
