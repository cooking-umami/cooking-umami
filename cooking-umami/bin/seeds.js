const mongoose = require("mongoose");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/cooking-umami";

const users = [
  {
    userName: "darren",
    passwordHash: "123",
    nationality: "Dutch",
    aboutMe: "Oranje for life!",
    gender: "male",
  },
  {
    userName: "jack",
    passwordHash: "123",
    nationality: "Vietnamese",
    aboutMe: "Cooking on Mama-level.",
    gender: "male",
  },
  {
    userName: "cookingmama",
    passwordHash: "123",
    nationality: "Japanese",
    aboutMe: "I made this.",
    gender: "female",
  },
];

const recipes = [
  {
    title: "Garlic Shrimp",
    ingredients: "Shrimp, Red Chili, Salt",
    difficulty: "mama",
    description:
      "A classic local Hawaiian dish consisting of shrimp pan-fried with plenty of garlic and butter, it's a very popular item amongst Hawaiian food trucks.",
    instructions:
      "1. Clean the shrimp!. 2. Dress the ingredients!  3. Coat it!",
    dishType: "lunch",
    image: "/images/garlic-shrimp.webp",
    duration: 15,
    creator: "",
    rating: 5,
    review: "The best way to make shrimp in my opinion.",
  },
  {
    title: "Lasagna",
    ingredients: "Pork, Garlic, Onion",
    difficulty: "papa",
    description:
      "A pasta dish known for its layers of meat, cheese, and sauce. Lasagna is also used to refer to the wide, flat pasta used in the dish.",
    instructions: "1. Cut the Ingredients! 2. Stir Fry it! 3. Stir it!",
    dishType: "dinner",
    image: "/images/lasagna.webp",
    duration: 80,
    creator: "",
    rating: 3,
    review: "Easy recipe, but Italians would not approve.",
  },
  {
    title: "Popcorn",
    ingredients: "Popcorn kernels, salt",
    description: "A light and addictive snack, if not easy to burn.",
    instructions: "1. make some popcorn! 2. Add some seasoning!",
    dishType: "snack",
    image: "/images/popcorn.webp",
    difficulty: "kids",
    duration: 15,
    creator: "",
    rating: 4,
    review: "Be careful not to burn the kernels!",
  },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    Recipe.collection.drop(); // Warning, drops recipe collection :)
    User.collection.drop(); // Warning, drops user collection :)

    return User.create(users);
  })
  .then((result) => {
    const usersCreated = result;
    console.log(`Number of users created... ${usersCreated.length} `);

    for (let i = 0; i < recipes.length; i++) {
      if (i < 1) {
        recipes[i].creator = usersCreated[0]._id;
      } else if (i < 2) {
        recipes[i].creator = usersCreated[1]._id;
      } else {
        recipes[i].creator = usersCreated[2]._id;
      }
    }
    return Recipe.create(recipes);
  })
  .then((result) => {
    const recipesCreated = result;
    console.log(`Number of recipes created... ${recipesCreated.length} `);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(`An error occurred while creating recipes from the DB: ${err}`);
  });
