import { useAutoComplete } from '../hooks/useAutoComplete';

const Input = () => {
  const {
    inputSearchValue,
    inputSelectedValue,
    setInputSearchValue,
    setInputSelectedValue,
    shouldShowSuggestions,
  } = useAutoComplete();

  return (
    <input
      className={`search-input ${shouldShowSuggestions ? 'no-border-bottom' : ''}`}
      value={inputSelectedValue === '' ? inputSearchValue : inputSelectedValue}
      onChange={e => {
        setInputSelectedValue('');
        setInputSearchValue(e.target.value);
      }}
      type="search"
    />
  );
};

export default Input;
