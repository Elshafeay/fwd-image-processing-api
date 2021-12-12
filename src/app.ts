import express, { Request, Response } from 'express';
import apiRouter from './routes/api';

const app = express();

app.get('/', (req: Request, res: Response): void => {
  res.send('Welcome to the home page!');
});

app.use('/api', apiRouter);

export default app;