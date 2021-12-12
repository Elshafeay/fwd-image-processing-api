import express from 'express';
import apiRouter from './routes/api';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

app.use('/api', apiRouter);

export default app;