import { useContext } from 'react';
import { AutoCompleteContext } from '../context/AutoComplete.context';

export const useAutoComplete = () => {
  const { inputValue, setInputValue, suggestions } = useContext(AutoCompleteContext);

  return { inputValue, setInputValue, suggestions };
};
