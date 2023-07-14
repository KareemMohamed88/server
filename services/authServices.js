const UserModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const exist = await UserModel.findOne({ username });

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
  const user = await UserModel.findOne({ email });
  !user && res.json({ error: "user is not in correct" });

  const isPasswordMatch = bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.json({ error: "email or password wrong" });
  }
  isPasswordMatch &&
    jwt.sign(
      { email: user.email, username: user.username },
      process.env.SECRET,
      {},
      (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie("token").json(user);
      }
    );
});
