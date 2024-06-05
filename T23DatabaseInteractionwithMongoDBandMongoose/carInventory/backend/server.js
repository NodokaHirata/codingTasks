// Load dotenv to handle environment variables from the .env file
require("dotenv").config();

// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const carRoutes = require("./routes/carInventoryRoutes");

// Initialise express application
const app = express();

// Set up port for server to listen on
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON requests
app.use(express.json());
// Enable CORS
app.use(cors());

// Use the carInventoryRoutes for handling routes starting with /carInventoryApi
app.use("/carInventoryApi", carRoutes);

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      // Start the server and listen on the specified port
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });
