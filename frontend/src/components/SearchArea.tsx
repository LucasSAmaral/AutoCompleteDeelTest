import { useCallback, useEffect, useState } from 'react';
import Input from './Input';
import Suggestions from './Suggestions';
import SuggestionsNotFound from './SuggestionsNotFound';

const SearchArea = () => {
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
