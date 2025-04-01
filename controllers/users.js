const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');




// Get all users
const getAllUsers = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to get all users'
  
  try {
    const database = mongodb.getDatabase();
    const users = await database.db().collection('users').find({}).toArray();
    
    // Taking password field off before sending response
    const sanitizedUsers = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.status(200).json(sanitizedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};




// Get user by ID
const getUserById = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to get a specific user by ID'
  
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const database = mongodb.getDatabase();
    const userId = new ObjectId(req.params.id);
    
    const user = await database.db().collection('users').findOne({ _id: userId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Taking password field off before sending response
    const { password, ...userWithoutPassword } = user;
    
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    if (error.message.includes('ObjectId')) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to create a new user'
  try {

    // Validating the required fields
    const requiredFields = ['name', 'email', 'password'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }
    
    // Validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    
    // If email already exists
    const database = mongodb.getDatabase();
    const existingUser = await database.db().collection('users').findOne({ email: req.body.email });
    
        if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
        }
    

        
    // Creating user object with additional fields
    const user = {
      ...req.body,
      created_recipes: [],
      saved_recipes: [],
      joined_date: new Date()
    };

    
    const result = await database.db().collection('users').insertOne(user);
    

    if (result.acknowledged) {

      // Taking password off
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({ 
        message: 'User created successfully', 
        id: result.insertedId,
        user: userWithoutPassword
      });
    } else {
      res.status(500).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Updating a user by id
const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to update a user'
  
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Validating email format
    if (req.body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      
      // Check if email already exists for another user
      const database = mongodb.getDatabase();
      const userId = new ObjectId(req.params.id);
      const existingUser = await database.db().collection('users').findOne({ 
        email: req.body.email,
        _id: { $ne: userId }
      });
      
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }
    }
    
   if (req.body.password) {
      delete req.body.password;
    }


    
    const database = mongodb.getDatabase();
    const userId = new ObjectId(req.params.id);
    
    const result = await database.db().collection('users').updateOne(
      { _id: userId },
      { $set: req.body }
    );
    
    if (!result.matchedCount) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(200).json({ message: 'No changes made to the user' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.message.includes('ObjectId')) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Deleting a user
const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.description = 'Endpoint to delete a user'
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const database = mongodb.getDatabase();
    const userId = new ObjectId(req.params.id);
    
    const result = await database.db().collection('users').deleteOne({ _id: userId });
    
    if (!result.deletedCount) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error.message.includes('ObjectId')) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};




module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser};