import { useAutoComplete } from '../hooks/useAutoComplete';

const Suggestions = () => {
  const { suggestions, setInputValue } = useAutoComplete();
  return (
    <div className="suggestions-wrapper">
      <ul>
        {suggestions.map(suggestion => (
          <li onClick={() => setInputValue(suggestion)}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
