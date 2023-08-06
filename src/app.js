import express from 'express';
import xss from 'xss-clean';
import helmet from 'helmet';
import httpStatus from 'http-status';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import morgan from './config/morgan.js';
import env from './config/config.js';
import ApiError from './utils/ApiErrors.js';
import errorMiddleware from './middlewares/error.js';
import routes from './routes/v1/index.js';
import pagesRoutes from './routes/pages/index.js';
import { jwtStrategy } from './config/passport.js';

const app = express();

if (env.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(xss());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.get('/test', (_req, res) => {
  res.send('hello world');
});

app.use('/v1', routes);

app.set('view engine', 'hbs');

app.use('/', pagesRoutes);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorMiddleware.errorConverter);

// handle error
app.use(errorMiddleware.errorHandler);

export default app;
