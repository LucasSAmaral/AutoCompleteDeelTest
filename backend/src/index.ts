import express, { Request, Response } from 'express';
import cors from 'cors';

type RequestWithSearchParams<SearchParams> = Request<{}, {}, {}, SearchParams>;

const app = express();

const port = 4000;

app.use(cors());

const webTechnologies = [
  'React',
  'React Native',
  'CSS',
  'Rust',
  'Styled Components',
  'React Testing Library',
  'Cypress',
  'SCSS',
  'SASS',
];

let searchHistory: string[] = [];

app.get(
  '/api/autocomplete',
  (req: RequestWithSearchParams<{ search: string }>, res: Response<AutoCompleteResponse>) => {
    const queryParams = req.query.search;

    const suggestions = webTechnologies.filter(technology =>
      technology.toLowerCase().startsWith(queryParams.toLowerCase()),
    );

    if (suggestions.length === 0) {
      res.json({
        suggestionsNotFoundMessage: 'No technologies were found with this search terms.',
      });
      return;
    }

    res.json({ suggestions });
    return;
  },
);

app.get('/api/autocomplete/history', (req: Request, res: Response) => {
  res.json(searchHistory);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
