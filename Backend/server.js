const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

//  Middlewares
app.use(cors());
app.use(express.json());

//  Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("Login Attempt:", username, password); // debug

  if (username?.trim() === "admin" && password?.trim() === "pass123") {
    return res.status(200).json({
      success: true,
      message: "Login successful"
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password"
    });
  }
});

//  Item Routes
app.use("/api/items", itemRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Inventory-Management")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

//  Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});