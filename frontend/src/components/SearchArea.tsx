import { useCallback } from 'react';
import { useAutoComplete } from '../hooks/useAutoComplete';
import Input from './Input';
import Suggestions from './Suggestions';
import SuggestionsNotFound from './SuggestionsNotFound';

const SearchArea = () => {
  const {
    suggestions,
    inputSearchValue,
    inputSelectedValue,
    setInputSearchValue,
    setInputSelectedValue,
    shouldShowSuggestions,
    setShouldShowSuggestions,
    suggestionsNotFoundMessage,
  } = useAutoComplete();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputSelectedValue('');
      setInputSearchValue(event.target.value);
    },
    [setInputSearchValue, setInputSelectedValue],
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setShouldShowSuggestions(false);
      setInputSelectedValue(suggestion);
    },
    [setShouldShowSuggestions, setInputSelectedValue],
  );

  return (
    <div className="search-area">
      <Input
        inputSearchValue={inputSearchValue}
        inputSelectedValue={inputSelectedValue}
        handleInputChange={handleInputChange}
        shouldRemoveBorderBottom={shouldShowSuggestions || Boolean(suggestionsNotFoundMessage)}
      />
      {shouldShowSuggestions && (
        <Suggestions suggestions={suggestions} handleSuggestionClick={handleSuggestionClick} />
      )}
      {suggestionsNotFoundMessage && (
        <SuggestionsNotFound>{suggestionsNotFoundMessage}</SuggestionsNotFound>
      )}
    </div>
  );
};

export default SearchArea;
