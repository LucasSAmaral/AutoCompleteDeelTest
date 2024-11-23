import { createContext } from 'react';

type AutoCompleteContext = {
  inputValue: string;
  suggestions: string[];
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

export const AutoCompleteContext = createContext<AutoCompleteContext>({
  inputValue: '',
  suggestions: [],
  setInputValue: () => {},
});

AutoCompleteContext.displayName = 'AutoCompleteContext';
