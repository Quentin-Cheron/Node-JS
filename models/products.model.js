import mongoose from "mongoose";

// Create Products model

const Products = mongoose.model(
  "products",
  new mongoose.Schema({
    label: String,
    price: String,
    description: String,
  })
);

export default Products;
