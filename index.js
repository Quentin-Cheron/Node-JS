import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// database connection
import "./config/database.js";

// use session

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 * 60 },
  })
);

// Configure

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

const PORT = process.env.PORT || 7000;

// Route for user

import userRoute from "./routes/user.route.js";
app.use("/", userRoute);

// Route for products

import productRoute from "./routes/products.route.js";
app.use("/", productRoute);

// Route for admin

import adminRoute from "./routes/admin.route.js";
app.use("/", adminRoute);

app.get("/protected", (req, res) => {
  res.json({ session: req.session });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
