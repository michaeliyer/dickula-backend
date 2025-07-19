// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express(); // 👈 must come first
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.options("*", cors()); // 👈 move it here
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const Cocktail = require("./models/Cocktail");

// // GET all cocktails
// app.get("/api/cocktails", async (req, res) => {
//   const cocktails = await Cocktail.find();
//   res.json(cocktails);
// });

// // POST a new cocktail
// app.post("/api/cocktails", async (req, res) => {
//   console.log("POST request received:", req.body); // optional: debug
//   try {
//     const newCocktail = new Cocktail(req.body);
//     await newCocktail.save();
//     res.status(201).json(newCocktail);
//   } catch (err) {
//     console.error("POST error:", err);
//     res.status(400).json({ error: err.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.options("*", cors());
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
  console.log("POST request received:", req.body);
  try {
    const newCocktail = new Cocktail(req.body);
    await newCocktail.save();
    res.status(201).json(newCocktail);
  } catch (err) {
    console.error("POST error:", err);
    res.status(400).json({ error: err.message });
  }
});

// PUT (update) a cocktail by ID
app.put("/api/cocktails/:id", async (req, res) => {
  try {
    const updatedCocktail = await Cocktail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCocktail) {
      return res.status(404).json({ error: "Cocktail not found" });
    }
    res.json(updatedCocktail);
  } catch (err) {
    console.error("PUT error:", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE a cocktail by ID
app.delete("/api/cocktails/:id", async (req, res) => {
  try {
    const deletedCocktail = await Cocktail.findByIdAndDelete(req.params.id);
    if (!deletedCocktail) {
      return res.status(404).json({ error: "Cocktail not found" });
    }
    res.json({ message: "Cocktail deleted successfully" });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});