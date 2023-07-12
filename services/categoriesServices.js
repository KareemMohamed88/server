const CategoryModel = require("../models/CategorySchema");
const asyncHandler = require("express-async-handler");

//                               CATEGORIES CRUD OPRATIONS

exports.createCategory = asyncHandler(async (req, res) => {
  const newCategory = new CategoryModel(req.body);
  await newCategory.save();
  res.status(201).json(req.body);
});

exports.readCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryModel.find();
  res.status(200).json(categories);
});
exports.readCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findByid(id);
  if (!category) {
    res.status(400).json({ message: `no category for this ${id}` });
  } else {
    res.status(200).json(category);
  }
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { name, slug } = req.body;
  const category = CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slugify: slug },
    { name: true },
    { slug: true }
  );
  if (!categocategoryries) {
    res.status(400).json({ message: `no category for this ${id}` });
  } else {
    res.status(200).json(category);
  }
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await CategoryModel.findOneAndDelete(id);

  if (!category) {
    res.status(400).json({ message: `no product for this ${id}` });
  } else {
    res.status(200).json({ data: category });
  }
});
