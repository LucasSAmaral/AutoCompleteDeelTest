import { useCallback, useState } from 'react';
import Input from './Input';
import Suggestions from './Suggestions';
import SuggestionsNotFound from './SuggestionsNotFound';
import { useFetchSuggestions } from '../hooks/useFetchSuggestions';
import SearchHistory from './SearchHistory';
import { useSearchHistory } from '../hooks/useSearchHistory';


// I chose to pass these states through props since the component hierarchy is shallow (just one layer).
// Initially, I considered using context, but it would cause unnecessary re-renders on every component update.
const SearchArea = () => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [inputSelectedValue, setInputSelectedValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { suggestions, setSuggestions, suggestionsNotFoundMessage } =
    useFetchSuggestions(inputSearchValue);

  const { searchHistory, setSearchHistory } = useSearchHistory();

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSelectedValue('');
    setInputSearchValue(event.target.value);
  }, []);

  const handleInputClear = useCallback(() => {
    setInputSearchValue('');
    setInputSelectedValue('');
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
    [setSuggestions, setSearchHistory],
  );

  const handleSearchHistoryClick = useCallback((history: string) => {
    setInputSelectedValue(history);
  }, []);

  return (
    <div className="search-area">
      <Input
        inputValue={inputSelectedValue === '' ? inputSearchValue : inputSelectedValue}
        handleInputClear={handleInputClear}
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
