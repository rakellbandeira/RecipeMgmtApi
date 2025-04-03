const express = require('express');
const router = express.Router();
const passport = require('passport');

// Home route
router.get('/', (req, res) => {
  res.send('Welcome to the Recipe Management API');
});

// Login route
router.get('/login', passport.authenticate('github', { 
  scope: ['read:user'],
  session: true
}));


  
// Callback after GitHub authentication
router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/',
    session: true
  }), 
  (req, res) => {
    console.log('GitHub Auth Success - User:', req.user);
    req.session.user = req.user;
    console.log('Session after setting user:', req.session);
    // Redirect to API docs after successful login
    res.redirect('/api-docs');
  }
);

// Logout route
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// API routes
router.use('/recipes', require('./recipes'));
router.use('/users', require('./users'));

module.exports = router;