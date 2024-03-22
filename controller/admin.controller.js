import db from "../models/index.js";
const user = db.user;
const product = db.products;

// Render all products
export const updateProductsRender = async (req, res) => {
  // Retrieving all existing products from the database
  const existingProducts = await product.find({});
  const title = "Products list";
  const breadCrumb = "Home > Admin";

  // Rendering admin/products page with title, breadcrumb, and existing products
  res.render("admin/products", {
    title,
    breadCrumb,
    products: existingProducts,
  });
};

// Update the selected product with new data
export const updateProductsData = async (req, res) => {
  const { label, price, description, id } = req.body;

  // Finding the existing product by its id
  const existingProduct = await product.findOne({ id });

  // Checking if the data to be updated is different from the existing data
  if (
    label !== existingProduct.label ||
    price !== existingProduct.price ||
    description !== existingProduct.description
  ) {
    // Updating the product with new data
    await product.updateOne({
      label,
      price,
      description,
    });
  }

  // Redirecting to the admin page after updating
  res.redirect("/admin");
};
