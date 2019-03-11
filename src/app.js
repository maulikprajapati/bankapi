import express from 'express';
import compression from 'compression'; // compresses requests
import { json, urlencoded } from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import { corsOptionsDelegate } from './config/cors';
import helmet from 'helmet';
import privateRoutes from './routes/private';
import publicRoutes from './routes/public';
import * as error from './modules/shared/middlewares/error';
import bodyParser from 'body-parser';
import { validateToken } from './auth/passport';

const swagger = require('./config/swagger');

const oauth2 = require('./auth/oauth2');
import './auth/passport';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());

app.use(json());
app.use(urlencoded({ extended: true }));

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
// Hide X-Powered-By
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors(corsOptionsDelegate));

// ==================================================
// setup swagger middleware.
// it will generate api documentation
// to see the api documentation go to <host>:<port>/api-docs/
// example: localhost:3003/api-docs/
// ==================================================
swagger.setupSwagger(app);
// routes for all available endpoints
app.use(
    '/api',
    validateToken, // valid token through passport bearer stretegy
    privateRoutes
); // allow access to private APIs
app.use('/auth', publicRoutes);
app.use('/oauth/token', oauth2.token);
// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;
