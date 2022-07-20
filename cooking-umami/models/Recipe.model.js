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
  difficulty: {
    type: String,
    enum: ["kids", "papa", "mama"],
    default: "kids"
  },
  ingredients: String,
  description: String,
  instructions: String, 
  dishType: {
    type: String,
    enum: [
      "breakfast",
      "lunch",
      "dinner",
      "dessert",
      "snack",
      "drink",
    ],
    default:"dinner"
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg", //
  },
  duration: {
    type: Number,
  },
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  rating: { 
    type: [Number],
    enum: [1, 2, 3, 4, 5],
    default: 5
  },
  review: [String],
  // reviews: [reviewSchema]
},
{
    timestamps: true,
  });


module.exports = model("Recipe", recipeSchema);