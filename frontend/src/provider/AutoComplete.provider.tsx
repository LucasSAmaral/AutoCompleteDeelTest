import { useCallback, useEffect, useState } from 'react';
import { AutoCompleteContext } from '../context/AutoComplete.context';

export const AutoCompleteProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [inputSelectedValue, setInputSelectedValue] = useState('');
  const [suggestionsNotFoundMessage, setSuggestionsNotFoundMessage] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [shouldShowSuggestions, setShouldShowSuggestions] = useState(false);

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

  useEffect(() => {
    if (inputSearchValue !== '') {
      fetchSuggestions();
    } else {
      setShouldShowSuggestions(false);
      setSuggestionsNotFoundMessage('');
    }
  }, [inputSearchValue, fetchSuggestions]);

  useEffect(() => {
    if (suggestions.length === 0) {
      setShouldShowSuggestions(false);
    } else {
      setShouldShowSuggestions(true);
    }
  }, [suggestions]);

  return (
    <AutoCompleteContext.Provider
      value={{
        inputSearchValue,
        inputSelectedValue,
        setInputSearchValue,
        setInputSelectedValue,
        suggestions,
        shouldShowSuggestions,
        setShouldShowSuggestions,
        suggestionsNotFoundMessage,
      }}
    >
      {children}
    </AutoCompleteContext.Provider>
  );
};
