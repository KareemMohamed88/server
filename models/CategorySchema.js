const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;
