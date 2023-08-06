import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = [
  './src/routes/pages/auth.pages.route.js',
  // './src/routes/v1/auth.route.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
