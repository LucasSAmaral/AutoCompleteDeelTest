import { useAutoComplete } from '../hooks/useAutoComplete';

const Input = () => {
  const { inputValue, setInputValue, suggestions } = useAutoComplete();

  return (
    <input
      className={`search-input ${suggestions.length > 0 ? 'no-border-bottom' : ''}`}
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      type="search"
    />
  );
};

export default Input;
