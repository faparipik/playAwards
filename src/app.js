import express from 'express';
import morgan from './config/morgan.js';
import env from './config/config.js';
const app = express();

if (env.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/test', (_req, res) => {
  res.send('hello world');
});

export default app;
