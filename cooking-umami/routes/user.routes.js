const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const router = require("express").Router();

// READ: List all users
router.get("/users", (req, res, next) => {
  let recipes; // we create a variable in the parent scope

  User.find()
  .then(() => {
    res.render("users/users-overview");
  })

//   Recipe.find()
//     .then((recipesFromDB) => {
//       recipes = recipesFromDB; // update our variable in the parent scope
//       return User.find();
//     })
//     .then((usersFromDB) => {
//       const usersArr = usersFromDB.map((userDetails) => {
//         const { _id, userName, nationality } = userDetails;
//         const recipesFromCurrentuser = recipes.filter((Recipe) => {
//           return Recipe.userName.toString() === _id.toString(); // compare ids as string - Recipe.userName is an ID!!! look at the model reference
//         });
//         const numberOfrecipes = recipesFromCurrentuser.length;

//         return { userName, nationality, numberOfrecipes };
//       });

//       res.render("users/users-overview", { users: usersArr });
//     })
    .catch((error) => {
      console.log("Error getting users from DB", error);
      next(error);
    });
});

// CREATE: Render form
router.get("/users/create", (req, res, next) => {
  User.find()
    .then((usersArr) => {
      res.render("users/user-create", { usersArr });
    })
    .catch((error) => {
      console.log("Error getting users from DB", error);
      next(error);
    });
});

// CREATE: Process form
router.post("/users/create", (req, res, next) => {
  const userDetails = {
    title: req.body.title,
    userName: req.body.userName,
    description: req.body.description,
    rating: req.body.rating,
  };

  User.create(userDetails)
    .then(() => {
      res.redirect("/users");
    })
    .catch((error) => {
      console.log("Error creating user in the DB", error);
      next(error);
    });
});

// READ: user details
router.get("/users/:userId", (req, res, next) => {
  const userId = req.params.userId;

  User.findById(UserId)
    .then((userDetails) => {
      res.render("users/user-details", userDetails);
    })
    .catch((error) => {
      console.log("Error getting user details from DB", error);
      next(error);
    });
});

// UPDATE: Render form
router.get("/users/:userId/edit", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((userDetails) => {
      res.render("users/user-edit", userDetails);
    })
    .catch((error) => {
      console.log("Error getting user details from DB", error);
      next(error);
    });
});

// UPDATE: Process form
router.post("/users/:userId/edit", (req, res, next) => {
  const userId = req.params.userId;

  const newDetails = {
    title: req.body.title,
    user: req.body.user,
    description: req.body.description,
    rating: req.body.rating,
  };

  User.findByIdAndUpdate(userId, newDetails)
    .then(() => {
      // res.redirect(`/users/${userId}`); // redirect to user details page
      res.redirect("/users");
    })
    .catch((error) => {
      console.log("Error updating user in DB", error);
      next(error);
    });
});


// DELETE: delete user
router.post("/users/:userId/delete", (req, res, next) => {
  const { userId } = req.params;

  User.findByIdAndRemove(userId)
    .then(() => {
      res.redirect("/users");
    })
    .catch((error) => {
      console.log("Error deleting user from DB", error);
      next(error);
    });
});

module.exports = router;
