const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema)


module.exports = UserModel
