const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const dbConnection = require("./config/conn");
const ProductRoutes = require("./Routes/ProductRoutes");
const AuthRoutes = require("./Routes/AuthRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const CategoriesRoutes = require("./Routes/CategoryRoutes");
const cors = require("cors");
const app = express();
dotenv.config({ path: "./config.env" });

dbConnection();
app.use(express.json());
app.use(cors());
if (process.env.ENV_MODE == "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.ENV_MODE}`);
}
app.get("/", (req, res) => {
  res.send("app runed");
});

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/categories", CategoriesRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
