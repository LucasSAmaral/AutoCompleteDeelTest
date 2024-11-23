import { useCallback, useEffect, useState } from 'react';
import { AutoCompleteContext } from '../context/AutoComplete.context';

export const AutoCompleteProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/autocomplete?search=${inputValue}`);

      if (!response.ok) {
        throw new Error('Error on getting suggestions');
      }

      const suggestionsArray = await response.json();

      setSuggestions(suggestionsArray);
    } catch (error) {
      console.error(error);
    }
  }, [inputValue]);

  useEffect(() => {
    if (inputValue !== '') {
      fetchSuggestions();
    }
  }, [inputValue, fetchSuggestions]);

  return (
    <AutoCompleteContext.Provider value={{ inputValue, setInputValue, suggestions }}>
      {children}
    </AutoCompleteContext.Provider>
  );
};
