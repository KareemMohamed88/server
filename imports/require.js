const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const ProductRoutes = require("../Routes/ProductRoutes");
const AuthRoutes = require("../Routes/AuthRoutes");
const CategoriesRoutes = require("../Routes/CategoryRoutes");
const UserVerification = require("../Routes/UserVerificationRoutes");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer")
const cors = require("cors")

module.exports = {
  express,
  morgan,
  dotenv,
  ProductRoutes,
  AuthRoutes,
  UserVerification,
  CategoriesRoutes,
  cookieParser,
  nodemailer,
  cors,
};
