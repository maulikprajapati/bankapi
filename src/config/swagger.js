const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

/**
 * Sets up the swagger-jsdoc configuration.
 *
 * For more info on swaggerDefinition configs, refer to:
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md
 *
 * For example on swagger-jsdoc options, refer to:
 * https://github.com/Surnet/swagger-jsdoc/blob/HEAD/docs/GETTING-STARTED.md
 * https://github.com/Surnet/swagger-jsdoc/blob/master/example/app.js
 *
 * @returns {*} The swagger config object.
 */
function setupSwaggerJsdoc() {
  const swaggerDefinition = {
    info: {
      title: 'Test App',
      version: '1.0.0',
    },
  };

  const options = {
    swaggerDefinition,
    apis: ['src/routes/**/*.js'], // Path to the API docs
  };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  return swaggerJSDoc(options);
}

function getSwaggerJson(swaggerSpec) {
  return (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  };
}

/**
 * Sets up the swagger page.
 *
 * @param {Express} app The Express app.
 */
function setupSwagger(app) {
  const swaggerSpec = setupSwaggerJsdoc();

  // Serve the Swagger docs in JSON format.
  app.get('/api-docs.json', getSwaggerJson(swaggerSpec));

  // Serve the Swagger docs UI.
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = {
  setupSwagger
};
