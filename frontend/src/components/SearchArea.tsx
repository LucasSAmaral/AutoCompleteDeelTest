import { useCallback, useEffect, useState } from 'react';
import Input from './Input';
import Suggestions from './Suggestions';
import SuggestionsNotFound from './SuggestionsNotFound';
import { useFetchSuggestions } from '../hooks/useFetchSuggestions';
import { getLocalStorageHistory, setLocalStorageHistory } from '../helpers/localStorageHelpers';
import SearchHistory from './SearchHistory';

const SearchArea = () => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [inputSelectedValue, setInputSelectedValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [searchHistory, setSearchHistory] = useState<string[]>(getLocalStorageHistory());

  const { suggestions, setSuggestions, suggestionsNotFoundMessage } =
    useFetchSuggestions(inputSearchValue);

  useEffect(() => {
    if (searchHistory.length === 5) {
      setLocalStorageHistory(searchHistory);
      // Send history to api
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
      setSearchHistory(prev => {
        if (!prev.includes(suggestion)) {
          return [...prev, suggestion];
        }

        return prev;
      });
      setSuggestions([]);
    },
    [setSuggestions, setInputSelectedValue],
  );

  const handleSearchHistoryClick = useCallback(
    (history: string) => {
      setInputSelectedValue(history);
    },
    [setInputSelectedValue],
  );

  return (
    <div className="search-area">
      <Input
        inputValue={inputSelectedValue === '' ? inputSearchValue : inputSelectedValue}
        handleInputChange={handleInputChange}
        setIsInputFocused={setIsInputFocused}
        inputClassName={
          isInputFocused &&
          (searchHistory.length > 0 || suggestions.length > 0 || suggestionsNotFoundMessage)
            ? 'no-border-bottom'
            : ''
        }
      />

      {suggestions.length > 0 && isInputFocused && (
        <Suggestions
          suggestions={suggestions}
          inputSearchValue={inputSearchValue}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}

      {suggestionsNotFoundMessage && isInputFocused && (
        <SuggestionsNotFound>{suggestionsNotFoundMessage}</SuggestionsNotFound>
      )}

      {suggestions.length === 0 && isInputFocused && !suggestionsNotFoundMessage && (
        <SearchHistory handleSearchHistoryClick={handleSearchHistoryClick} />
      )}
    </div>
  );
};

export default SearchArea;
