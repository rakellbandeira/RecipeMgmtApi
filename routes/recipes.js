const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');
const { isAuthenticated } = require('../middleware/authenticate');

// Get all recipes (public)
router.get('/', recipesController.getAllRecipes);

// Get recipe by id (public)
router.get('/:recipeId', recipesController.getRecipeById);

// Create a new recipe (protected)
router.post('/', isAuthenticated, recipesController.createRecipe);

// Update a recipe (protected)
router.put('/:recipeId', isAuthenticated, recipesController.updateRecipe);

// Delete a recipe (protected)
router.delete('/:recipeId', isAuthenticated, recipesController.deleteRecipe);

module.exports = router;