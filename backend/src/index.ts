import express, { Request, Response } from 'express';
import cors from 'cors';

type AutoCompleteRequest<ResBody = any, ReqBody = any, SearchParams = any> = Request<
  {},
  ResBody,
  ReqBody,
  SearchParams
>;

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

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
  'HTML',
];

let searchHistory: string[] = [];

app.get(
  '/api/autocomplete',
  (req: AutoCompleteRequest<{}, {}, { search: string }>, res: Response) => {
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

app.get('/api/autocomplete/history', (_: Request, res: Response<string[]>) => {
  res.json(searchHistory);
});

app.post(
  '/api/autocomplete/history',
  (req: AutoCompleteRequest<{}, { searchHistory: string[] }>, _: Response) => {
    searchHistory = req.body.searchHistory;
  },
);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
