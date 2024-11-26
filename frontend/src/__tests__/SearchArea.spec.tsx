import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchArea from '../components/SearchArea';

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('http://localhost:4000/api/autocomplete?search=A', () => {
    return HttpResponse.json({
      suggestions: ['Angular', 'ASP.NET', 'AWS'],
    });
  }),
);

describe('SearchArea component', () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockClear();
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(['React', 'Typescript']));
    server.resetHandlers();
  });
  afterAll(() => server.close());

  it('should render input on screen', () => {
    const { getByRole } = render(<SearchArea />);

    const input = getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('should show SearchHistory component when input is focused', () => {
    const { getByRole, getByText } = render(<SearchArea />);

    const input = getByRole('textbox');

    fireEvent.focus(input);

    expect(getByText('latest searched technologies:')).toBeInTheDocument();

    expect(getByText('React')).toBeInTheDocument();
    expect(getByText('Typescript')).toBeInTheDocument();
  });

  it('should show Suggestions component when user types', async () => {
    const { getByRole, getByTestId } = render(<SearchArea />);

    const input = getByRole('textbox');

    await userEvent.type(input, 'A');

    await waitFor(
      () => {
        expect(getByTestId('Angular')).toBeInTheDocument();
        expect(getByTestId('ASP.NET')).toBeInTheDocument();
        expect(getByTestId('AWS')).toBeInTheDocument();
      },
      { timeout: 300 },
    );
  });

  it('should show suggestionsNotFoundMessage', async () => {
    server.resetHandlers(
      http.get('http://localhost:4000/api/autocomplete?search=A', () => {
        return HttpResponse.json({
          suggestionsNotFoundMessage: 'No technologies were found with these search terms.',
        });
      }),
    );
    const { getByRole, getByText } = render(<SearchArea />);

    const input = getByRole('textbox');

    await userEvent.type(input, 'A');

    await waitFor(
      () => {
        expect(
          getByText('No technologies were found with these search terms.'),
        ).toBeInTheDocument();
      },
      { timeout: 300 },
    );
  });
});
