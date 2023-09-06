const asyncHandler = require("express-async-handler");
const ProductModal = require("../models/ProductsSchema");

//                               PRODUCT CRUD OPRATIONS

//CREATE PRODUCT
exports.createProduct = asyncHandler(async (req, res) => {
  const newProduct = new ProductModal(req.body);
  await newProduct.save();
  res.status(201).json(req.body);
});
//READ

//GET ALL PRODUCTS
exports.readProducts = asyncHandler(async (req, res) => {
  const product = await ProductModal.find().sort({$natural:-1});
  res.status(200).json(product);
});

//GET ONE PRODUCT BY ID
exports.findProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await ProductModal.findById(id);
  if (!product) {
    res.status(404).json({message: `no prouct for this ${id}`})
  }
  res.status(200).json(product);
});

//UPDATE PRODUCT BY ID
exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    price,
    cardImage,
    summary,
    tags,
    livePreviewLink,
    getSourceCode,
  } = req.body;

  const product = await ProductModal.findOneAndUpdate(
    { _id: id },
    { title, price, cardImage, summary, tags, livePreviewLink, getSourceCode },
    { title: true },
    { price: true },
    { cardImage: true },
    { summary: true },
    { tags: true },
    { livePreviewLink: true },
    { getSourceCode: true }
  );

  if (!product) {
    res.status(400).json({ message: "no product for this id" });
  } else {
    res.status(200).json({ data: product });
  }
});
//DELETE PRODUCT
exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await ProductModal.findOneAndDelete(id);

  if (!product) {
    res.status(400).json({ message: "no product for this id" });
  } else {
    res.status(200).json({ data: product });
  }
});

//SEARCH SERVUCES
exports.searchByTitle = asyncHandler(async (req, res) => {
  let result = await ProductModal.find({
    $or: [{ title: { $regex: req.params.key } }],
  });
  res.send(result);
});
