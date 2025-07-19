const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // 👈 must come first
const PORT = process.env.PORT || 5000;

app.use(cors());
app.options("*", cors()); // 👈 move it here
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

const Cocktail = require("./models/Cocktail");

// GET all cocktails
app.get("/api/cocktails", async (req, res) => {
  const cocktails = await Cocktail.find();
  res.json(cocktails);
});

// POST a new cocktail
app.post("/api/cocktails", async (req, res) => {
  console.log("POST request received:", req.body); // optional: debug
  try {
    const newCocktail = new Cocktail(req.body);
    await newCocktail.save();
    res.status(201).json(newCocktail);
  } catch (err) {
    console.error("POST error:", err);
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
