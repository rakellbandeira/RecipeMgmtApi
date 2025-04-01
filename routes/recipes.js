const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipes');

// Get all 
router.get('/', recipesController.getAllRecipes);

// GET by id 
router.get('/:id', recipesController.getRecipeById);

// Create a new recipe
router.post('/', recipesController.createRecipe);

// Update a recipe by id
router.put('/:id', recipesController.updateRecipe);

// Delete a recipe by id
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;