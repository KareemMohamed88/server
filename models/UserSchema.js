const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "name input is required please fill this"],
      unique: [true, "name must be unique"],
      minLength: [3, "username to short"],
      maxLength: [32, "username to long"],
    },
    email: {
      type: String,
      require: true,
      unique: [true, "email must be unique"],
      minLength: [5, "email title to short"],
      maxLength: [100, "email title to long"],
    },
    password: {
      type: String,
      required: true,
      unique: [true, "password must be unique"],
      minLength: [8, "user password to short"],
    },
    userProfileImage: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        publicId: null,
      },
    },
    bio: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerfied: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.SECERT);
};

const User = mongoose.model("users", UserSchema);

function vaildateUserRegisterUser(obj) {
  const schema = joi.object({
    username: joi.string().trim().min(3).max(32).required(),
    email: joi.string().trim().min(3).max(100).required().email(),
    password: joi.string().trim().min(3).required(),
  });
  return schema.validate(obj);
}

function vaildateUserLoginUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(3).max(100).required().email(),
    password: joi.string().trim().min(3).required(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  vaildateUserRegisterUser,
  vaildateUserLoginUser,
};
