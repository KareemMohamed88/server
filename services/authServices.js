const UserModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { createSecretToken } = require("../utils/SecretToken");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, username } = req.body;
  const existingUser = await UserModel.findOne({ email });

  existingUser && res.json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hashSync(password, 10);

  const user = await UserModel.create({
    email,
    password: hashedPassword,
    username,
  });

  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });
  res
    .status(201)
    .json({ message: "User signed in successfully", success: true, user, token });
  next();
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, user, token });
    next();
  } catch (error) {
    console.error(error);
  }
});

exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await UserModel.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};
