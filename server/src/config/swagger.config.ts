import swaggerJSDoc from 'swagger-jsdoc';
import { CONFIG } from './index';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'SIWE API',
    version: '1.0.0',
    description:
      'This is a simple API application made with Express using SIWE library for auth',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Swagger',
      url: 'https://swagger.io',
    },
  },
  servers: [
    {
      url: `http://localhost:${CONFIG.NODE_PORT}`,
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
