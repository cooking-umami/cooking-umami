module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.user) {
    console.log(222)
    return res.redirect("/auth/login");
  }
  console.log(111)
  req.user = req.session.user;
  next();
};
