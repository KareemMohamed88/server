const express = require("express");
const {
  createProduct,
  readProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  searchByTitle,
} = require("../services/ProductServices");
const router = express.Router();

router.route("/").get(readProducts).post(createProduct);
router
  .route("/:id")
  .get(findProductById)
  .put(updateProduct)
  .delete(deleteProduct)


module.exports = router;
