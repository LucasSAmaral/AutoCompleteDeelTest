import { createContext } from 'react';

type AutoCompleteContext = {
  inputSearchValue: string;
  inputSelectedValue: string;
  suggestions: string[];
  shouldShowSuggestions: boolean;
  suggestionsNotFoundMessage: string;
  setInputSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setInputSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  setShouldShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AutoCompleteContext = createContext<AutoCompleteContext>({
  inputSearchValue: '',
  inputSelectedValue: '',
  suggestions: [],
  suggestionsNotFoundMessage: '',
  shouldShowSuggestions: false,
  setInputSearchValue: () => {},
  setInputSelectedValue: () => {},
  setShouldShowSuggestions: () => {},
});

AutoCompleteContext.displayName = 'AutoCompleteContext';
