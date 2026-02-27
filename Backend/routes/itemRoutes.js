const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

//  GET ALL ITEMS + SEARCH
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    const items = await Item.find({
      name: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//  ADD NEW ITEM
router.post("/", async (req, res) => {
  try {
    const { name, itemId, quantity, price } = req.body;

    if (!name || !itemId || quantity == null || price == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent duplicate itemId
    const existing = await Item.findOne({ itemId });
    if (existing) {
      return res.status(400).json({ message: "Item ID already exists" });
    }

    const newItem = new Item({
      name,
      itemId,
      quantity,
      price,
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE ITEM
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE ITEM
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
