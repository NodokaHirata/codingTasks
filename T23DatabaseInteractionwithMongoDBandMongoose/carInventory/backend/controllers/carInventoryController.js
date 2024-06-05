const Car = require("../models/carInventory");

// Add a new car
exports.addCar = async (req, res) => {
  try {
    // Get a new car from frontend request and use the model
    const carModel = new Car(req.body);
    // Save the new car
    await carModel.save();
    // Success response to the frontend
    res.status(201).json(carModel);
  } catch (error) {
    // Error response
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    // Get data from the DB
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a single car by ID
exports.updateSingleCarById = async (req, res) => {
  try {
    // Find the car by ID and update it with the new data from req.body
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // new: true returns the updated document
      runValidators: true, // runValidators: true applies schema validations during the update
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update multiple cars
exports.updateMultipleCars = async (req, res) => {
  try {
    const updates = req.body;
    // Map updates to bulk operations
    const bulkOperations = updates.map((update) => ({
      updateOne: {
        filter: { _id: update._id },
        update: { $set: update },
      },
    }));
    // Execute bulk write operations
    await Car.bulkWrite(bulkOperations);
    const responseMessage = { message: "Cars updated successfully" };
    res.status(200).json(responseMessage);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete a car by ID
exports.deleteCarById = async (req, res) => {
  try {
    // Find and delete car by ID
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cars older than five years
exports.getCarsOlderThanXYears = async (req, res) => {
  try {
    // Parse years from request parameters
    const years = parseInt(req.params.years, 10);
    // Parse years from request parameters
    const cutoffDate = new Date();
    const cutoffYear = cutoffDate.getFullYear() - years;
    // Parse years from request parameters
    const cars = await Car.find({
      model: { $lt: cutoffYear },
    });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
