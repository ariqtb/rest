const mongoose = require("mongoose");
const Product = require("../models/Product.js")(mongoose);

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      from: "get one product",
    });
  }
};

exports.saveProducts = async (req, res) => {
  const product = new Product(req.body);
  try {
    const ProductSaved = await product.save();
    res.status(201).json(ProductSaved);
    // res.status(201).json(req.body);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      from: "save products",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const checkId = await Product.findById(req.params.id);
  if (!checkId) return res.status(404).json({ message: "Data not found!" });

  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      from: "update products",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const checkId = await Product.findById(req.params.id);
  if (!checkId) return res.status(404).json({ message: "Data not found!" });

  try {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(400).json({ mesasage: err.message }, { from: "delete product" });
  }
};
