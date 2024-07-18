import asyncHandler from "../middlewares/asyncHandler.js";
import product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, stock } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !stock:
        return res.json({ error: "Stock is required" });
    }

    const Product = new product({ ...req.fields });
    await Product.save();
    res.json(Product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, stock } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !stock:
        return res.json({ error: "Stock is required" });
    }
    const Product = await product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await Product.save();

    res.json(Product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const Product = await product.findByIdAndDelete(req.params.id);

    res.json(Product);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const pageSize = 8;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await product.countDocuments({ ...keyword });
    const products = await product.find({ ...keyword });

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json(error.message);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const Product = await product.findById(req.params.id);
    if (Product) {
      return res.json(Product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json("Product not found");
  }
});

const getAllProductsAdmin = asyncHandler(async (req, res) => {
  try {
    const products = await product
      .find()
      .populate("category")
      .sort({ createAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const Product = await product.findById(req.params.id);

    if (Product) {
      const alreadyReviewed = Product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("product already reviewed");
      }
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      Product.reviews.push(review);
      Product.numReviews = Product.reviews.length;

      Product.rating =
        Product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        Product.reviews.length;

      await Product.save();
      res.status(201).json("Revied added");
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTop = asyncHandler(async (req, res) => {
  try {
    const products = await product.find().sort({ rating: -1 }).limit(6);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNew = asyncHandler(async (req, res) => {
  try {
    const products = await product.find().sort({ _id: -1 }).limit(6);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  getAllProductsAdmin,
  addProductReview,
  fetchNew,
  fetchTop,
};
