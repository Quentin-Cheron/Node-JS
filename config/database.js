// Import the mongoose module
import mongoose from "mongoose";
import dotenv from "dotenv";

// Get the default connection
const db = mongoose.connection;
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

//Bind connection to error event (to get notification of connection errors)
// eslint-disable-next-line no-console
db.on("error", console.error.bind(console, "MongoDB connection error:"));
