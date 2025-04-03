const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipe Management API',
    description: 'API for managing cooking recipes and user accounts',
    version: '1.0.0'
  },
  host: "localhost:8002",
  schemes: ['http'],
  securityDefinitions: {
    githubAuth: {
      type: 'oauth2',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      flow: 'implicit',
      scopes: {
        'read:user': 'Read user profile'
      }
    }
  },
  tags: [
    {
      name: 'Recipes',
      description: 'Endpoints for managing recipes'
    },
    {
      name: 'Users',
      description: 'Endpoints for managing users'
    },
    {
      name: 'Authentication',
      description: 'Endpoints for authentication'
    }
  ],
  // Explicitly define the paths to avoid auto-generation issues
  paths: {
    '/recipes': {
      get: {
        tags: ['Recipes'],
        description: 'Get all recipes',
        responses: {
          '200': { description: 'Success' }
        }
      },
      post: {
        tags: ['Recipes'],
        description: 'Create a recipe',
        security: [{ githubAuth: [] }],
        parameters: [
          {
            in: 'body',
            name: 'recipe',
            schema: { $ref: '#/definitions/Recipe' }
          }
        ],
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' }
        }
      }
    },
    '/recipes/{recipeId}': {
      get: {
        tags: ['Recipes'],
        security: [{ githubAuth: [] }],
        description: 'Get a recipe by ID',
        parameters: [
          {
            in: 'path',
            name: 'recipeId',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': { description: 'Success' }
        }
      },
      put: {
        tags: ['Recipes'],
        description: 'Update a recipe',
        security: [{ githubAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'recipeId',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'recipe',
            schema: { $ref: '#/definitions/Recipe' }
          }
        ],
        responses: {
          '200': { description: 'Success' },
          '401': { description: 'Unauthorized' }
        }
      },
      delete: {
        tags: ['Recipes'],
        description: 'Delete a recipe',
        security: [{ githubAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'recipeId',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': { description: 'Success' },
          '401': { description: 'Unauthorized' }
        }
      }
    },
    '/users': {
      get: {
        tags: ['Users'],
        security: [{ githubAuth: [] }],
        description: 'Get all users',
        responses: {
          '200': { description: 'Success' },
          '401': { description: 'Unauthorized' }
        }
      },
      post: {
        tags: ['Users'],
        description: 'Create a user',
        parameters: [
          {
            in: 'body',
            name: 'user',
            schema: { $ref: '#/definitions/User' }
          }
        ],
        responses: {
          '201': { description: 'Created' }
        }
      }
    },
    '/users/{userId}': {
      get: {
        tags: ['Users'],
        security: [{ githubAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': { description: 'Success' },
          '401': { description: 'Unauthorized' }
        }
      },
      put: {
        tags: ['Users'],
        security: [{ githubAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'user',
            schema: { $ref: '#/definitions/User' }
          }
        ],
        responses: {
          '200': { description: 'Success' },
          '401': { description: 'Unauthorized' }
        }
      },
      delete: {
        tags: ['Users'],
        security: [{ githubAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          '200': { description: 'Success' },
          '401': { description: 'Unauthorized' }
        }
      }
    },
    '/login': {
      get: {
        tags: ['Authentication'],
        description: 'Login with GitHub',
        responses: {
          '200': { description: 'Success' }
        }
      }
    },
    '/logout': {
      get: {
        tags: ['Authentication'],
        description: 'Logout',
        responses: {
          '200': { description: 'Success' }
        }
      }
    },
    '/github/callback': {
      get: {
        tags: ['Authentication'],
        description: 'GitHub OAuth callback',
        responses: {
          '200': { description: 'Success' }
        }
      }
    }
  },
  definitions: {
    Recipe: {
      type: "object",
      properties: {
        title: { type: "string", example: "Chocolate Chip Cookies" },
        description: { type: "string", example: "Classic homemade chocolate chip cookies" },
        ingredients: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string", example: "flour" },
              amount: { type: "string", example: "2" },
              unit: { type: "string", example: "cups" },
              notes: { type: "string", example: "all-purpose" }
            }
          }
        },
        instructions: {
          type: "array",
          items: { type: "string" },
          example: ["Preheat oven to 375°F", "Mix dry ingredients in a bowl"]
        },
        prep_time: { type: "number", example: 15 },
        cook_time: { type: "number", example: 10 },
        servings: { type: "number", example: 24 },
        cuisine_type: { type: "string", example: "American" },
        dietary_tags: {
          type: "array",
          items: { type: "string" },
          example: ["vegetarian"]
        }
      }
    },
    User: {
      type: "object",
      properties: {
        name: { type: "string", example: "Rakell Bandeira" },
        email: { type: "string", example: "rakellbandeira@gmail.com" },
        password: { type: "string", example: "hashedpass123" },
        dietary_preferences: {
          type: "array",
          items: { type: "string" },
          example: ["vegetarian"]
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';


const routes = ['./routes/*.js'];

swaggerAutogen(outputFile, routes, doc);