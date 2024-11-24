import { useContext } from 'react';
import { AutoCompleteContext } from '../context/AutoComplete.context';

export const useAutoComplete = () => {
  const {
    inputSearchValue,
    inputSelectedValue,
    setInputSearchValue,
    setInputSelectedValue,
    suggestions,
    shouldShowSuggestions,
    setShouldShowSuggestions,
    noSuggestionsFoundMessage,
  } = useContext(AutoCompleteContext);

  return {
    inputSearchValue,
    inputSelectedValue,
    setInputSearchValue,
    setInputSelectedValue,
    suggestions,
    shouldShowSuggestions,
    setShouldShowSuggestions,
    noSuggestionsFoundMessage,
  };
};
