const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');




// Get all recipes
const getAllRecipes = async (req, res) => {
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Endpoint to get all recipes'
  try {
    const database = mongodb.getDatabase();
    const recipes = await database.db().collection('recipes').find({}).toArray();
    
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
};




// Get recipe by ID
const getRecipeById = async (req, res) => {
  try {
    
    
    const database = mongodb.getDatabase();
    const recipeId = new ObjectId(req.params.recipeId);
    
    
    const recipe = await database.db().collection('recipes').findOne({ _id: recipeId });
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    if (error.message.includes('ObjectId')) {
      return res.status(400).json({ message: 'Invalid recipe ID format' });
    }
    res.status(500).json({ message: 'Error fetching recipe', error: error.message });
  }
};






// Create a new recipe
const createRecipe = async (req, res) => {
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Endpoint to create a new recipe'
  try {
    // Validating only the required fields
    const requiredFields = ['title', 'ingredients', 'instructions'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }
    
    // Validate data types to be numbers
    if (req.body.prep_time && typeof req.body.prep_time !== 'number') {
      return res.status(400).json({ message: 'Prep time must be a number' });
    }
    
    if (req.body.cook_time && typeof req.body.cook_time !== 'number') {
      return res.status(400).json({ message: 'Cook time must be a number' });
    }
    
    if (req.body.servings && typeof req.body.servings !== 'number') {
      return res.status(400).json({ message: 'Servings must be a number' });
    }
    
    // Create recipe object with added timestamps
    const recipe = {
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const database = mongodb.getDatabase();
    const result = await database.db().collection('recipes').insertOne(recipe);
    
    if (result.acknowledged) {
      res.status(201).json({ 
        message: 'Recipe created successfully', 
        id: result.insertedId 
      });
    } else {
      res.status(500).json({ message: 'Failed to create recipe' });
    }
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: 'Error creating recipe', error: error.message });
  }
};






// Update recipe by id
const updateRecipe = async (req, res) => {
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Endpoint to update a recipe'
  try {
    
    
    // Validating data types to be numbers
    if (req.body.prep_time && typeof req.body.prep_time !== 'number') {
      return res.status(400).json({ message: 'Prep time must be a number' });
    }
    
    if (req.body.cook_time && typeof req.body.cook_time !== 'number') {
      return res.status(400).json({ message: 'Cook time must be a number' });
    }
    
    if (req.body.servings && typeof req.body.servings !== 'number') {
      return res.status(400).json({ message: 'Servings must be a number' });
    }
    
    const database = mongodb.getDatabase();
    const recipeId = new ObjectId(req.params.recipeId);
    


    // Adding updated timestamp
    const updatedRecipe = {
      ...req.body,
      updated_at: new Date()
    };
    
    const result = await database.db().collection('recipes').updateOne(
      { _id: recipeId },
      { $set: updatedRecipe }
    );
    
    if (!result.matchedCount) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Recipe updated successfully' });
    } else {
      res.status(200).json({ message: 'No changes made to the recipe' });
    }
  } catch (error) {
    console.error('Error updating recipe:', error);
    if (error.message.includes('ObjectId')) {
      return res.status(400).json({ message: 'Invalid recipe ID format' });
    }
    res.status(500).json({ message: 'Error updating recipe', error: error.message });
  }
};




// Deleting a recipe by id
const deleteRecipe = async (req, res) => {
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Endpoint to delete a recipe'
  try {
    
    
    const database = mongodb.getDatabase();
    const recipeId = new ObjectId(req.params.recipeId);
    
    const result = await database.db().collection('recipes').deleteOne({ _id: recipeId });
    
    if (!result.deletedCount) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    if (error.message.includes('ObjectId')) {
      return res.status(400).json({ message: 'Invalid recipe ID format' });
    }
    res.status(500).json({ message: 'Error deleting recipe', error: error.message });
  }
};







module.exports = {getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe};