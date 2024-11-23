import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

const port = 4000;

app.use(cors());

const webTechnologies = ['React', 'React Native', 'CSS', 'Rust'];

app.get('/api/autocomplete', (req: Request, res: Response) => {
  const queryParams = req.query.search as string;

  const filteredTechnologies = webTechnologies.filter(technology =>
    technology.toLowerCase().startsWith(queryParams.toLowerCase()),
  );

  res.json(filteredTechnologies);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
