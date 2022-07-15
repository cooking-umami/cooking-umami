const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ["Kids", "Papa", "Mama"],
  },
  ingredients: [String],
  description: String,
  instructions: [String],
  cuisine: {
    type: String,
    enum: ["Italian", "French", "English", "Chinese", "German", "Russian", "American", "Other"],
    required: true,
  },
  dishType: {
    type: String,
    enum: [
      "breakfast",
      "main_course",
      "soup",
      "snack",
      "drink",
      "dessert",
      "other",
    ],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: String,
    enum: ["Quick (10 min - 30 min)", "Medium (30 min - 1 hour)", "Long (1 hour+)"]
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now(),
  },
  rating: Number,
  review: String,
});


module.exports = model("Recipe", recipeSchema);