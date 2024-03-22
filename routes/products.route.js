import express from "express";
const router = express.Router();

//post
import {
  showProducts,
  deleteProduct,
} from "../controller/products.controller.js";

// render all products

router.get("/", showProducts);

// delete the products

router.post("/delete", deleteProduct);

export default router;
