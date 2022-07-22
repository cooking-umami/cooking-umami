// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/expressF
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

// custom helpers
hbs.registerHelper("setChecked", function (value, currentValue) {
  if (value == currentValue) {
    return "checked";
  } else {
    return "";
  }
});

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "cooking-umami";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

app.use((req, res, next) => {
  res.locals.session = req.session; // allow access to session data from layout.hbs

  next();
});

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

app.use("/", require("./routes/auth.routes"));
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/recipe.routes"));
app.use("/", require("./routes/about.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
