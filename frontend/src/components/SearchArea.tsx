import { useCallback, useState } from 'react';
import Input from './Input';
import Suggestions from './Suggestions';
import SuggestionsNotFound from './SuggestionsNotFound';
import { useFetchSuggestions } from '../hooks/useFetchSuggestions';

const SearchArea = () => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [inputSelectedValue, setInputSelectedValue] = useState('');

  const { suggestions, setSuggestions, suggestionsNotFoundMessage } =
    useFetchSuggestions(inputSearchValue);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputSelectedValue('');
      setInputSearchValue(event.target.value);
    },
    [setInputSearchValue, setInputSelectedValue],
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setInputSelectedValue(suggestion);
      setSuggestions([]);
    },
    [setSuggestions, setInputSelectedValue],
  );

  return (
    <div className="search-area">
      <Input
        inputSearchValue={inputSearchValue}
        inputSelectedValue={inputSelectedValue}
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
