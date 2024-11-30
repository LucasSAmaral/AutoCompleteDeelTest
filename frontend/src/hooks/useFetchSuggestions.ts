import { useState, useCallback, useEffect, useMemo } from 'react';

// This hook centralizes the fetching logic, separating it from the SearchArea component to improve readability and maintainability.
export const useFetchSuggestions = (inputSearchValue: string) => {
  const [suggestionsNotFoundMessage, setSuggestionsNotFoundMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = useCallback(async () => {
    try {
      setSuggestionsNotFoundMessage('');

      const response = await fetch(
        `http://localhost:4000/api/autocomplete?search=${inputSearchValue}`,
      );

      if (!response.ok) {
        throw new Error('Error on getting suggestions');
      }

      const suggestionsResponse: AutoCompleteResponse = await response.json();

      if ('suggestionsNotFoundMessage' in suggestionsResponse) {
        setSuggestions([]);
        setSuggestionsNotFoundMessage(suggestionsResponse.suggestionsNotFoundMessage);
      } else {
        setSuggestions(suggestionsResponse.suggestions);
      }
    } catch (error) {
      console.error(error);
    }
  }, [inputSearchValue]);

  // Implemented debounce to delay API fetch by 300ms, reducing unnecessary requests as the user types.
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputSearchValue !== '') {
        fetchSuggestions();
      } else {
        setSuggestions([]);
        setSuggestionsNotFoundMessage('');
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputSearchValue, fetchSuggestions]);

  const memoizedSuggestions = useMemo(() => suggestions, [suggestions]);

  return { suggestions: memoizedSuggestions, setSuggestions, suggestionsNotFoundMessage };
};
