const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const ProductRoutes = require("../Routes/ProductRoutes");
const AuthRoutes = require("../Routes/AuthRoutes");
const UserRoutes = require("../Routes/UserRoutes");
const CategoriesRoutes = require("../Routes/CategoryRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors")

module.exports = {
  express,
  morgan,
  dotenv,
  ProductRoutes,
  AuthRoutes,
  UserRoutes,
  CategoriesRoutes,
  cookieParser,
  cors,
};
