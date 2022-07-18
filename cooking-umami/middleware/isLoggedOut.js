module.exports = (req, res, next) => {
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  if (req.session.user) {
    return res.redirect('/');
    console.log(123)
  }
  console.log(99)

  next();
};
