const {
  User,
  vaildateUserRegisterUser,
  vaildateUserLoginUser,
  generateAuthToken
} = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  const { error } = vaildateUserRegisterUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).json({ message: "user already exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();
  res.status(201).json({ message: "user created succesfully" });
});

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = vaildateUserLoginUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({ message: "user is not in correct" });
  }

  const isPasswordMath = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordMath) {
    res.status(400).json({ message: "username or password wrong" });
  }

  const token = user.generateAuthToken();
  res.status(200).json({
    _id: user.id,
    isAdmin: user.isAdmin,
    prodilePhoto: user.prodilePhoto,
    token,
  });
});
