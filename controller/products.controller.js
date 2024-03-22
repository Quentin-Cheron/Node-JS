// Importing database models
import db from "../models/index.js";
const products = db.products;
const user = db.user;

// Get all Products
export const showProducts = async (req, res) => {
  // Retrieving all products from the database
  const allProducts = await products.find({});

  // Setting title and breadcrumb for rendering
  const title = "Shop Standard";
  const breadCrumb = "Shop Standard";

  // Rendering index page with products, title, and breadcrumb
  res.render("index", {
    products: allProducts,
    title,
    breadCrumb,
  });
};

// Deleting a product
export const deleteProduct = async (req, res) => {
  const productId = req.body.id;

  try {
    // Finding users who have this product in their cart
    const usersWithProduct = await user.find({
      "cart._id": req.body.id,
      _id: req.session.user_id,
    });

    // Storing found products in a list
    const products = [];
    usersWithProduct.forEach(async (user) => {
      const productIndex = user.cart.findIndex((item) => item.id === productId);
      if (productIndex !== -1) {
        // Checking the number of products in the cart
        if (user.cart[productIndex].number > 1) {
          // If the number is greater than 1, decrement it
          user.cart[productIndex].number--;
        } else {
          // If the number is equal to 1, remove the product from the cart
          user.cart.splice(productIndex, 1);
        }
        // Saving user's update to the database
        await user.save();
        // Adding the deleted or decremented product to the products list
        products.push(user.cart[productIndex]);
      }
    });

    // Redirecting to the cart page with the found products
    res.redirect("/cart");
  } catch (error) {
    // Handling errors if any
    res
      .status(500)
      .json({ message: "Error while searching for the product", error });
  }
};
