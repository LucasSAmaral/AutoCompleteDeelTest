import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

const port = 4000;

app.use(cors());

const webTechnologies = ['React', 'React Native', 'CSS', 'Rust', 'Styled Components'];

app.get('/api/autocomplete', (req: Request, res: Response<AutoCompleteResponse>) => {
  const queryParams = req.query.search as string;

  const suggestions = webTechnologies.filter(technology =>
    technology.toLowerCase().startsWith(queryParams.toLowerCase()),
  );

  if (suggestions.length === 0) {
    res.json({
      suggestionsNotFoundMessage: 'No technologies were found with this search terms.',
    });
  }

  res.json({ suggestions });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
