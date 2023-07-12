const express = require("express");
const { registerUserCtrl, loginUserCtrl } = require("../services/authServices");

const router = express.Router();

router.route("/register").post(registerUserCtrl);
router.route("/login").post(loginUserCtrl);
module.exports = router;
