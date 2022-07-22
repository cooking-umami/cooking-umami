// module.exports = (req, res, next) => {
// checks if the user is logged in when trying to access a specific page

// id of user ---> req.session.user._id
// owner of a recipe
// -- what is the recipe --> req.params.xxxxxx
// -- ower of that recipe ---> Recipe.findById)=

//   if (req.session.user._id !== ) {
//     return res.render("recipes/recipe-overview", {
//       errorMessage:
//         "Can't edit or delete because you are not the owner of this recipe!",
//     });
//   }

//   next();
// };
