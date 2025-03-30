import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finance App API',
      version: '1.0.0',
      description: 'API documentation for the Finance App',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://finance-app-api.onrender.com',
        description: 'Production server',
      },
    ],
  },
  apis: ['./routes/*.ts'], // Updated path to match your project structure
};

export const swaggerSpec = swaggerJsdoc(options); 