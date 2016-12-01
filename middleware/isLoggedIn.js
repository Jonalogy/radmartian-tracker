module.exports = function(req, res, next) {
  console.log(">>>Console.log: Runninng isLoggedIn()");
  // console.log(">>>req.user = ", req.user)
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page');
    res.redirect('/');
  } else {
    next();
  }
};
