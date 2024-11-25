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
  'Angular',
  'Vue',
  'NextJs',
  'NestJs',
  'Flutter',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express',
  'Webpack',
  'Vite',
  'GraphQL',
  'Redux',
  'RxJS',
  'jQuery',
  'Tailwind CSS',
  'Bootstrap',
  'Material-UI',
  'Svelte',
  'Gatsby',
  'WordPress',
  'PHP',
  'Django',
  'ASP.NET',
  'Elixir',
  'SQL',
  'PostgreSQL',
  'MongoDB',
  'Firebase',
  'Prisma',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Google Cloud',
  'Vercel',
  'Netlify',
  'Heroku',
  'Babel',
  'ESLint',
  'Prettier',
  'Mocha',
  'Jest',
  'Storybook',
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
        suggestionsNotFoundMessage: 'No technologies were found with these search terms.',
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
  (req: AutoCompleteRequest<{}, { searchHistory: string[] }>, res: Response<string[]>) => {
    searchHistory = req.body.searchHistory;

    if (searchHistory.length === 11) {
      searchHistory.shift();
    }

    res.status(204).send();
  },
);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
