import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

const port = 4000;

app.use(cors());

app.get('/api/autocomplete', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
