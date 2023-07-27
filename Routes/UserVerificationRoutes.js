const express = require("express");
const router = express.Router();
const { userVerification } = require("../services/authServices");

router.post('/',userVerification)
module.exports = router;
