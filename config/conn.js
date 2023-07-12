const mongoose = require("mongoose");

module.exports = dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log("Databse connected successfully");
    })
    .catch((err) => {
      console.error(`please solve ${err}`);
    });
};
