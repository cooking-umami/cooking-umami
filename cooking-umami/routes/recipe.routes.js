const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const router = require("express").Router();

const isLoggedIn = require("../middleware/isLoggedIn");

// READ: List all recipes
router.get("/recipes", (req, res, next) => {
  Recipe.find()
    .populate("creator")
    .then((recipesFromDB) => {
      const data = {
        recipesArr: recipesFromDB,
      };
      res.render("recipes/recipe-overview", data);
    })
    .catch((error) => {
      console.log("Error getting data from DB", error);
      next(error);
    });
});

// CREATE: Render form
router.get("/create", isLoggedIn, (req, res, next) => {
  User.find()
    .then((usersArr) => {
      res.render("recipes/recipe-create", { usersArr });
    })
    .catch((error) => {
      console.log("Error getting users from DB", error);
      next(error);
    });
});

// CREATE: Process form
router.post("/create", isLoggedIn, (req, res, next) => {
  const recipeDetails = {
    title: req.body.title,
    user: req.body.user,
    description: req.body.description,
    rating: req.body.rating,
  };

  Recipe.create(recipeDetails)
    .then(() => {
      res.redirect("/recipes");
    })
    .catch((error) => {
      console.log("Error creating recipe in the DB", error);
      next(error);
    });
});

// READ: recipe details
router.get("/recipes/:recipeId", (req, res, next) => {
  const recipeId = req.params.recipeId;

  Recipe.findById(recipeId)
    .populate("creator")
    .then((recipeDetails) => {
      res.render("recipes/recipe-details", recipeDetails);
    })
    .catch((error) => {
      console.log("Error getting recipe details from DB", error);
      next(error);
    });
});

// UPDATE: Render form
router.get("/recipes/:recipeId/edit", (req, res, next) => {
  const { recipeId } = req.params;

  Recipe.findById(recipeId)
    .then((recipeDetails) => {
      res.render("recipes/recipe-edit", recipeDetails);
    })
    .catch((error) => {
      console.log("Error getting recipe details from DB", error);
      next(error);
    });
});

// UPDATE: Process form
router.post("/recipes/:recipeId/edit", (req, res, next) => {
  const recipeId = req.params.recipeId;

  const newDetails = {
    title: req.body.title,
    userName: req.body.userName,
    description: req.body.description,
    rating: req.body.rating,
  };

  Recipe.findByIdAndUpdate(recipeId, newDetails)
    .then(() => {
      // res.redirect(`/recipes/${recipeId}`); // redirect to recipe details page
      res.redirect("/recipes");
    })
    .catch((error) => {
      console.log("Error updating recipe in DB", error);
      next(error);
    });
});

// DELETE: delete recipe
router.post("/recipes/:recipeId/delete", isLoggedIn, (req, res, next) => {
  const { recipeId } = req.params;

  Recipe.findByIdAndRemove(recipeId)
    .then(() => {
      res.redirect("/recipes");
    })
    .catch((error) => {
      console.log("Error deleting recipe from DB", error);
      next(error);
    });
});

module.exports = router;
