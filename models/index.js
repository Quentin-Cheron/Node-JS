import mongoose from "mongoose";
import Products from "./products.model.js";
import User from "./user.model.js";
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// User models

// Store everything in the db object to retrieve them in the controllers

db.user = User;

db.products = Products;

export default db;
