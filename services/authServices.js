const UserModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const exist = await UserModel.findOne({ email });

  exist && res.json({ error: "email already existed" });
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (!username) {
    return res.json({
      error: "username is required",
    });
  }
  if (username.length < 3) {
    return res.json({
      error: "username must letter than 6 words",
    });
  }

  if (!email) {
    return res.json({
      error: "email is required",
    });
  }

  if (!password) {
    return res.json({
      error: "password is required",
    });
  }

  UserModel.create({ username, email, password: hashedPassword });
  res.json({ message: req.body });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.json({
      error: "email is required",
    });
  }

  if (!password) {
    return res.json({
      error: "password is required",
    });
  }
  const user = await UserModel.findOne({ email });
  !user && res.json({ error: "user is not in correct" });

  const isPasswordMatch = bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    res.json({ error: "Passwords not match" });
  }
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "20s",
  });
  res.cookie(String(user.id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 10),
    httpOnly: true,
    sameSite: "lax",
  });
  return res.json({ message: "user loggned in successfully", user, token });
});
