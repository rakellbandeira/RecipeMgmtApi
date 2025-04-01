const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// Get all users
router.get('/', usersController.getAllUsers);

// Get user by id
router.get('/:id', usersController.getUserById);

// Create a new user
router.post('/', usersController.createUser);

// Update a user by id
router.put('/:id', usersController.updateUser);

// Delete a user by id
router.delete('/:id', usersController.deleteUser);

module.exports = router;