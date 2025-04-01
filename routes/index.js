const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Welcome to the Recipe Management API');
});


router.use('/recipes', require('./recipes'));
router.use('/users', require('./users'));

module.exports = router;