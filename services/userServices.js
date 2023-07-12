const asyncHandler = require("express-async-handler");
const { User } = require("../models/UserSchema");

module.exports.getAllUsers = asyncHandler(async (req, res) => {

  if (!req.user.isAdmin) {
    return res.status(403).json({message: "not allowrd, only admin"})
  }

  const users = await User.find();
  res.status(200).json(users);
});
