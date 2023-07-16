const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getHomePage } = require("../services/authServices");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/homepage", getHomePage)
module.exports = router;
