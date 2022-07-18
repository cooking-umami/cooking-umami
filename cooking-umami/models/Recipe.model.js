const { Schema, model } = require("mongoose");


// const reviewSchema = new Schema({
//   text: String,
//   rating: { 
//     type: Number,
//     enum: [1, 2, 3, 4, 5],
//   },
//   author: {type: Schema.Types.ObjectId, ref: 'User'},
// });


const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Kids", "Papa", "Mama"],
  },
  ingredients: [String],  //
  description: String,
  instructions: [String],  //
  cuisine: {
    type: String,
    enum: ["Italian", "French", "English", "Chinese", "German", "Russian", "American", "Other"],
    required: true,
  },
  dishType: {
    type: String,
    enum: [
      "breakfast",
      "main-course",
      "soup",
      "snack",
      "drink",
      "dessert",
      "other",
    ],
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg", //
  },
  duration: {
    type: String,
    enum: ["Quick (10 min - 30 min)", "Medium (30 min - 1 hour)", "Long (1 hour+)"]
  },
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  rating: { 
    type: [Number],
    enum: [1, 2, 3, 4, 5],
  },
  review: [String],

  // reviews: [reviewSchema]

},
{
    timestamps: true,
  });


module.exports = model("Recipe", recipeSchema);