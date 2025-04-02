const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipe Management API',
    description: 'API for managing cooking recipes and user accounts',
    version: '1.0.0'
  },
  host: 'recipemgmtapi.onrender.com',
  schemes: ['https'],
  tags: [
    {
      name: 'Recipes',
      description: 'Endpoints for managing recipes'
    },
    {
      name: 'Users',
      description: 'Endpoints for managing users'
    }
  ],
  paths: {
    '/recipes': {
      get: {
        tags: ['Recipes'],
        description: 'Get all recipes',
        responses: {
          '200': {
            description: 'Successfully retrieved recipes'
          },
          '500': {
            description: 'Server error'
          }
        }
      },
      post: {
        tags: ['Recipes'],
        description: 'Create a new recipe',
        parameters: [
          {
            in: 'body',
            name: 'recipe',
            description: 'Recipe object to be added',
            required: true,
            schema: {
              $ref: '#/definitions/Recipe'
            }
          }
        ],
        responses: {
          '201': {
            description: 'Recipe created successfully'
          },
          '400': {
            description: 'Invalid input'
          },
          '500': {
            description: 'Server error'
          }
        }
      }
    },
    '/recipes/{id}': {
      get: {
        tags: ['Recipes'],
        description: 'Get a recipe by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Recipe ID',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved recipe'
          },
          '404': {
            description: 'Recipe not found'
          },
          '500': {
            description: 'Server error'
          }
        }
      },
      put: {
        tags: ['Recipes'],
        description: 'Update a recipe',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Recipe ID',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'recipe',
            description: 'Updated recipe object',
            required: true,
            schema: {
              $ref: '#/definitions/Recipe'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Recipe updated successfully'
          },
          '400': {
            description: 'Invalid input'
          },
          '404': {
            description: 'Recipe not found'
          },
          '500': {
            description: 'Server error'
          }
        }
      },
      delete: {
        tags: ['Recipes'],
        description: 'Delete a recipe',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Recipe ID',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'Recipe deleted successfully'
          },
          '404': {
            description: 'Recipe not found'
          },
          '500': {
            description: 'Server error'
          }
        }
      }
    },
    '/users': {
      get: {
        tags: ['Users'],
        description: 'Get all users',
        responses: {
          '200': {
            description: 'Successfully retrieved users'
          },
          '500': {
            description: 'Server error'
          }
        }
      },
      post: {
        tags: ['Users'],
        description: 'Create a new user',
        parameters: [
          {
            in: 'body',
            name: 'user',
            description: 'User object to be added',
            required: true,
            schema: {
              $ref: '#/definitions/User'
            }
          }
        ],
        responses: {
          '201': {
            description: 'User created successfully'
          },
          '400': {
            description: 'Invalid input'
          },
          '409': {
            description: 'Email already in use'
          },
          '500': {
            description: 'Server error'
          }
        }
      }
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        description: 'Get a user by ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'User ID',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved user'
          },
          '404': {
            description: 'User not found'
          },
          '500': {
            description: 'Server error'
          }
        }
      },
      put: {
        tags: ['Users'],
        description: 'Update a user',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'User ID',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            description: 'Updated user object',
            required: true,
            schema: {
              $ref: '#/definitions/User'
            }
          }
        ],
        responses: {
          '200': {
            description: 'User updated successfully'
          },
          '400': {
            description: 'Invalid input'
          },
          '404': {
            description: 'User not found'
          },
          '409': {
            description: 'Email already in use'
          },
          '500': {
            description: 'Server error'
          }
        }
      },
      delete: {
        tags: ['Users'],
        description: 'Delete a user',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'User ID',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': {
            description: 'User deleted successfully'
          },
          '404': {
            description: 'User not found'
          },
          '500': {
            description: 'Server error'
          }
        }
      }
    }
  },
  definitions: {
    Recipe: {
      title: "Chocolate Chip Cookies",
      description: "Classic homemade chocolate chip cookies",
      ingredients: [
        {
          name: "flour",
          amount: "2",
          unit: "cups",
          notes: "all-purpose"
        }
      ],
      instructions: [
        "Preheat oven to 375°F",
        "Mix dry ingredients in a bowl"
      ],
      prep_time: 15,
      cook_time: 10,
      servings: 24,
      cuisine_type: "American",
      dietary_tags: ["vegetarian"],
      author_id: "65e0b8477541152a6e123123",
      image_url: "https://example.com/cookies.jpg"
    },
    User: {
      name: "Rakell Bandeira",
      email: "rakellbandeira@gmail.com",
      password: "hashedpass123",
      dietary_preferences: ["vegetarian"]
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./routes/recipes.js', './routes/users.js'];


swaggerAutogen(outputFile, routes, doc);