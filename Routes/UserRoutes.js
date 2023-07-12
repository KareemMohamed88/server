const express = require("express");
const { getAllUsers } = require("../services/userServices");
const { veryfiyToken } = require("../middlewares/veryfiyToken");

const router = express.Router();

router.route("/profile").get(veryfiyToken, getAllUsers);
module.exports = router;
