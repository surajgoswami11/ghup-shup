const express = require("express");
const {
  logout,
  signup,
  login,
  updateProfile,
  checkProfile,
} = require("../controllers/authController");
const { protectRoute } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/check", protectRoute, checkProfile);

router.put("/update-profile", protectRoute, updateProfile);

module.exports = router;
