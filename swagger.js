const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipe Management API',
    description: 'API for managing cooking recipes and user accounts',
    version: '1.0.0'
  },
  host: 'render.com/docs/web-services#port-binding',
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
const routes = ['./routes/index.js', './routes/recipes.js', './routes/users.js'];


swaggerAutogen(outputFile, routes, doc);