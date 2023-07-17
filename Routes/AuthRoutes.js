const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getHomePage, verifyToken, getUser } = require("../services/authServices");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/homepage", getHomePage)
router.get("/user", verifyToken, getUser)
module.exports = router;
