const mongoose = require("mongoose");

const cocktailSchema = new mongoose.Schema({
  theCock: { type: String, required: true },
  theIngredients: { type: String, required: true },
  theRecipe: { type: String, required: true },
  theJpeg: { type: String, required: true },
  theComment: { type: String, default: null },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cocktail", cocktailSchema);
