const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const swaggerTools = require('swagger-tools');
const swaggerUIExpress = require('swagger-ui-express');
const cors = require('cors')
const app = express();

app.use(express.static(path.join(__dirname, '../../../')));

app.use(cors())
app.use(helmet());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.json());

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname, '../api/swagger/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.load(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

    const serve = swaggerUIExpress.serve;
    const setup = swaggerUIExpress.setup(swaggerDoc, true);
    app.use('/docs', serve, setup); //show explorer

    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter({ controllers: path.join(__dirname, '../api/controllers'), useStubs: false }));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
});

module.exports = app;