import { useState, useCallback, useEffect } from 'react';

// This hook centralizes the fetching logic.
// I decided to create it to separete this responsibility from SearchArea Component and to make it more readable.

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

  // I created a debounce effect to fetch the api after 300ms to avoid fetching everytime a person types a letter on search input

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

  return { suggestions, setSuggestions, suggestionsNotFoundMessage };
};
