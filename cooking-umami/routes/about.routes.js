const router = require("express").Router();

/* GET home page */
router.get("/about", (req, res, next) => {
  res.render("about");
});

module.exports = router;
