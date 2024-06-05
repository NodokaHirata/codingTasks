const express = require("express");
// Use built-in Express router
const router = express.Router();
const carController = require("../controllers/carInventoryController");

// Add a new car
router.post("/add", carController.addCar);

// Get all cars
router.get("/", carController.getAllCars);

// Update a car by ID
router.put("/update/:id", carController.updateSingleCarById);

// Update multiple cars
router.put("/multiple", carController.updateMultipleCars);

// Delete a car by ID
router.delete("/delete/:id", carController.deleteCarById);

// Get cars older than x years
router.get("/findCarByYear/:years", carController.getCarsOlderThanXYears);

module.exports = router;
