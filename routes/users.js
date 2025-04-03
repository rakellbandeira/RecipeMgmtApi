const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');

// Get all users (protected)
router.get('/', isAuthenticated, usersController.getAllUsers);

// Get user by id (protected)
router.get('/:userId', isAuthenticated, usersController.getUserById);

// Create a new user (public)
router.post('/', usersController.createUser);

// Update a user (protected)
router.put('/:userId', isAuthenticated, usersController.updateUser);

// Delete a user (protected)
router.delete('/:userId', isAuthenticated, usersController.deleteUser);

module.exports = router;