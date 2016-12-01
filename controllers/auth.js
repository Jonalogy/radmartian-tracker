var express = require("express");
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();
var db = require("../models");


router.post('/login', passport.authenticate('local', {
  successRedirect: '/main',
  failureRedirect: '/',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/logout', function(req, res) {
  req.logout();
  console.log('logged out');
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

router.post('/signup', function(req, res) {
  // find or create a user, providing the name and password as default values
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      // if created, success and redirect home
      console.log('User created!');
      res.redirect('/');
    } else {
      // if not created, the email already exists
      console.log('Email already exists');
      res.redirect('/');
    }
  }).catch(function(error) {
    // if an error occurs, let's see what the error is
    console.log('An error occurred: ', error.message);
    res.redirect('/auth/signup');
  });
});

module.exports = router;
