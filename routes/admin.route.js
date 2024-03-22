import express from "express";
const router = express.Router();

// Check if the useris connected and he is an admin

const checkUserConnection = (req, res, next) => {
  if (req.session.isLoggedIn && req.session.role === "admin") {
    next();
  } else {
    res.redirect("/sign-in");
  }
};

//post
import {
  updateProductsRender,
  updateProductsData,
} from "../controller/admin.controller.js";

// render the admin page

router.get("/admin", checkUserConnection, updateProductsRender);

// Update the products with forms

router.post("/admin", checkUserConnection, updateProductsData);

export default router;
