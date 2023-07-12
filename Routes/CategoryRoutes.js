const express = require("express");
const {
  createCategory,
  readCategories,
  readCategory,
  updateCategory,
  deleteProduct,
} = require("../services/categoriesServices");

const router = express.Router();

router.route("/").get(readCategories).post(createCategory);
router
  .route("/:id")
  .get(readCategory)
  .put(updateCategory)
  .delete(deleteProduct);

module.exports = router;
