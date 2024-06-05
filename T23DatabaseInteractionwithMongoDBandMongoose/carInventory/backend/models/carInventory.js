const mongoose = require("mongoose");

// Initialise the schema
const carInventorySchema = mongoose.Schema({
  // Sets the data types
  model: {
    type: Number,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
});

// module.exports makes the model available outside of your module

/* The first argument for the mongoose.model should be the name of the
  document in your MongoDB collection (remember that spelling is
  important, and that this includes casing) */
module.exports = mongoose.model("CarInventory", carInventorySchema);
