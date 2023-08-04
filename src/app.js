import express from 'express';

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/test', (_req, res) => {
  res.send('hello world');
});

export default app;
