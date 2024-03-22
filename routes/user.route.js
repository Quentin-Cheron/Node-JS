import express from "express";
const router = express.Router();

//post
import {
  signInRender,
  signInData,
  signUpRender,
  signUpData,
  logout,
  cartData,
  cartRender,
} from "../controller/user.controller.js";

// Check if the user is connected

const checkUserConnection = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect("/sign-in");
  }
};

// Sign up
router.get("/sign-up", signUpRender);
router.post("/sign-up", signUpData);

// Sign in
router.get("/sign-in", signInRender);
router.post("/sign-in", signInData);

//logout

router.get("/logout", logout);

// Cart

router.post("/cart", checkUserConnection, cartData);
router.get("/cart", checkUserConnection, cartRender);

export default router;
