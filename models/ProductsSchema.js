const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    cardImage: {
      type: String,
    },
    title: {
      type: String,
      minLength: [3, "product title to short"],
      maxLength: [32, "product title to long"],
    },
    price: {
      type: Number,
      min: [1, "product price to short"],
      max: [500, "product price to long"],
    },
    desc: {
      type: String,
    },
    views:{
      type: Number,
      default: 0
    },
    tags: {
      type: String,
    },
    livePreviewLink: {
      type: String,
    },
    getSourceCode: {
      type: String,
    },
    categoryBelongTo: {
      type: mongoose.Schema.ObjectId,
      ref: "Category"
    }
  },
  { timestamps: true }
);

const ProductModal = mongoose.model("products", ProductSchema);

module.exports = ProductModal;
