import { useCallback } from 'react';
import Input from './Input';
import Suggestions from './Suggestions';
import SuggestionsNotFound from './SuggestionsNotFound';
import { useFetchSuggestions } from '../hooks/useFetchSuggestions';
import SearchHistory from './SearchHistory';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { useInputReducer } from '../hooks/useInputReducer';

// I chose to pass these states through props since the component hierarchy is shallow (just one layer).
// Initially, I considered using context, but it would cause unnecessary re-renders on every component update.
const SearchArea = () => {
  const { state, dispatch } = useInputReducer();

  const { suggestions, setSuggestions, suggestionsNotFoundMessage } = useFetchSuggestions(
    state.inputSearchValue,
  );

  const { searchHistory, setSearchHistory } = useSearchHistory();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'setSearchValue', payload: event.target.value });
    },
    [dispatch],
  );

  const handleInputClear = useCallback(() => {
    dispatch({ type: 'clearValues' });
  }, [dispatch]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      dispatch({ type: 'setSelectedValue', payload: suggestion });
      setSearchHistory(prev => {
        if (!prev.includes(suggestion)) {
          return [...prev, suggestion];
        }

        return prev;
      });
      setSuggestions([]);
    },
    [dispatch, setSuggestions, setSearchHistory],
  );

  const handleSearchHistoryClick = useCallback(
    (history: string) => {
      dispatch({ type: 'setSelectedValue', payload: history });
    },
    [dispatch],
  );

  const setIsInputFocused = useCallback(
    (isInputFocused: boolean) => dispatch({ type: 'setFocus', payload: isInputFocused }),
    [dispatch],
  );

  return (
    <div className="search-area">
      <Input
        inputValue={
          state.inputSelectedValue === '' ? state.inputSearchValue : state.inputSelectedValue
        }
        handleInputClear={handleInputClear}
        handleInputChange={handleInputChange}
        setIsInputFocused={setIsInputFocused}
        inputClassName={
          state.isInputFocused &&
          (searchHistory.length > 0 || suggestions.length > 0 || suggestionsNotFoundMessage)
            ? 'no-border-bottom'
            : ''
        }
      />

      {suggestions.length > 0 && state.isInputFocused && (
        <Suggestions
          suggestions={suggestions}
          inputSearchValue={state.inputSearchValue}
          handleSuggestionClick={handleSuggestionClick}
        />
      )}

      {suggestionsNotFoundMessage && state.isInputFocused && (
        <SuggestionsNotFound>{suggestionsNotFoundMessage}</SuggestionsNotFound>
      )}

      {suggestions.length === 0 && state.isInputFocused && !suggestionsNotFoundMessage && (
        <SearchHistory handleSearchHistoryClick={handleSearchHistoryClick} />
      )}
    </div>
  );
};

export default SearchArea;
