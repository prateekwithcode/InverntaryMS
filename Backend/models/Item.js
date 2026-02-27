const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    itemId: {
      type: String,
      required: true,
      unique: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0   // Bonus tip added
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);