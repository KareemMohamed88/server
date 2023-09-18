const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    cardImage: {
      type: String,
    },
    secondImg: {
      type: String,
    },
    title: {
      type: String,
      minLength: [3, "product title to short"],
      maxLength: [32, "product title to long"],
    },
    price: {
      type: Number,
    },
    desc: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    tech: {
      type: String,
    },
    livePreviewLink: {
      type: String,
    },
    getSourceCode: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const ProductModal = mongoose.model("products", ProductSchema);

module.exports = ProductModal;
