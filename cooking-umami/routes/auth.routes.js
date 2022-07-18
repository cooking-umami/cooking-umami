const router = require("express").Router();

// ℹ️ Handles passwordHash encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/register", isLoggedOut, (req, res) => {
  res.render("auth/register");
  console.log(1)
});

router.post("/register", isLoggedOut, (req, res) => {
  const { userName, passwordHash } = req.body;

  if (!userName) {
  console.log(2)
    return res.status(400).render("auth/register", {
      errorMessage: "Please provide your userName.",
    });
  }

  if (passwordHash.length < 8) {
  console.log(3)
    return res.status(400).render("auth/register", {
      errorMessage: "Your passwordHash needs to be at least 8 characters long.",
    });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(passwordHash)) {
  console.log(4)
    return res.status(400).render("register", {
      errorMessage:
        "PasswordHash needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */

  // Search the database for a user with the userName submitted in the form
  User.findOne({ userName }).then((found) => {
    // If the user is found, send the message userName is taken
    if (found) {
  console.log(5)
      return res
        .status(400)
        .render("auth.register", { errorMessage: "userName already taken." });
    }
    console.log(6)
    // if user is not found, create a new user - start with hashing the passwordHash
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(passwordHash, salt))
      .then((hashedPasswordHash) => {
        // Create a user and save it in the database
        return User.create({
          userName,
          passwordHash: hashedPasswordHash,
        });
      })
      .then((user) => {
  console.log(7)
        // Bind the user to the session object
        req.session.user = user;
        res.redirect("/");
      })
      .catch((error) => {
  console.log(8)
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("auth/register", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render("auth/register", {
            errorMessage:
              "userName need to be unique. The userName you chose is already in use.",
          });
        }
        return res
          .status(500)
          .render("auth/register", { errorMessage: error.message });
      });
  });
});

router.get("/login", isLoggedOut, (req, res) => {
  console.log(9)
  res.render("auth/login");
});

router.post("/login", isLoggedOut, (req, res, next) => {
  const { userName, passwordHash } = req.body;
  console.log(10)

  if (!userName) {
    return res.status(400).render("auth/login", {
      errorMessage: "Please provide your userName.",
    });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a passwordHash
  if (passwordHash.length < 8) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your passwordHash needs to be at least 8 characters long.",
    });
  }

  // Search the database for a user with the userName submitted in the form
  User.findOne({ userName })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).render("auth/login", {
          errorMessage: "Wrong credentials.",
        });
      }

      // If user is found based on the userName, check if the in putted passwordHash matches the one saved in the database
      bcrypt.compare(passwordHash, user.passwordHash).then((isSamePasswordHash) => {
        if (!isSamePasswordHash) {
          return res.status(400).render("auth/login", {
            errorMessage: "Wrong credentials.",
          });
        }
        req.session.user = user;
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        return res.redirect("/");
      });
    })

    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

router.get("/logout", isLoggedIn, (req, res) => {
  console.log(11)
  req.session.destroy((err) => {
  console.log(12)
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

module.exports = router;
