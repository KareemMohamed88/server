const UserModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const exist = await UserModel.findOne({ username });

  exist && res.json({ error: "username already existed" });
  const hashedPassword = bcrypt.hashSync(password, 10);

  !username ||
    (username.length < 3 &&
      res.json({
        error: "username is required and should be at least 6 characters long",
      }));

  UserModel.create({ username, email, password: hashedPassword });
  res.json(req.body);
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({email})
  !user && res.json({error: "user is not in correct"})

  const isPasswordMatch = bcrypt.compare(password, UserModel.password)
  isPasswordMatch && res.send("passord match")
})