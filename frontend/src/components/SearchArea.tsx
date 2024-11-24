import { useCallback, useEffect, useState } from 'react';
import Input from './Input';
import Suggestions from './Suggestions';
import SuggestionsNotFound from './SuggestionsNotFound';
import { useFetchSuggestions } from '../hooks/useFetchSuggestions';

const LOCAL_STORAGE_HISTORY_KEY = 'localSearchHistory';

const getLocalStorageHistory = (): string[] => {
  const storageHistory = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);

  return storageHistory ? JSON.parse(storageHistory) : [];
};

const setLocalStorageHistory = (history: string[]) => {
  localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(history));
};

const SearchArea = () => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [inputSelectedValue, setInputSelectedValue] = useState('');

  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const { suggestions, setSuggestions, suggestionsNotFoundMessage } =
    useFetchSuggestions(inputSearchValue);

  useEffect(() => {
    if (searchHistory.length === 5) {
      // Lógica para enviar o histórico à API
      console.log('Hora de mandar histórico para a API:', searchHistory);
    } else if (searchHistory.length === 0) {
      const localStorageHistory = getLocalStorageHistory();

      if (localStorageHistory) {
        setSearchHistory(localStorageHistory);
      }
    } else {
      setLocalStorageHistory(searchHistory);
    }
  }, [searchHistory]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSelectedValue('');
    setInputSearchValue(event.target.value);
  }, []);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setInputSelectedValue(suggestion);
      setSuggestions([]);
      setSearchHistory(prev => {
        if (!prev.includes(suggestion)) {
          return [...prev, suggestion];
        }

        return prev;
      });
    },
    [setSuggestions, setInputSelectedValue],
  );

  return (
    <div className="search-area">
      <Input
        inputValue={inputSelectedValue === '' ? inputSearchValue : inputSelectedValue}
        handleInputChange={handleInputChange}
        inputClassName={
          suggestions.length > 0 || suggestionsNotFoundMessage ? 'no-border-bottom' : ''
        }
      />
      {suggestions.length > 0 && (
        <Suggestions
          suggestions={suggestions}
          inputSearchValue={inputSearchValue}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}
      {suggestionsNotFoundMessage && (
        <SuggestionsNotFound>{suggestionsNotFoundMessage}</SuggestionsNotFound>
      )}
    </div>
  );
};

export default SearchArea;
