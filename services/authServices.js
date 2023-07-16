const UserModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const exist = await UserModel.find({ username,email,password });

  exist && res.json({ error: "username already existed" });
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (!username || username.length < 3) {
    return res.json({
      error: "username is required",
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
  res.json(req.body);
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

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  isPasswordMatch &&
    jwt.sign(
      { email: user.email, username: user.username },
      process.env.SECRET,
      {},
      (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie("token", token).json(user);
      }
    );
  if (!isPasswordMatch) {
    res.json({ error: "Passwords not match" });
  }
});

exports.getHomePage = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});
