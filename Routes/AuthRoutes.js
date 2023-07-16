const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../services/authServices");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/homepage", getProfile)
module.exports = router;
