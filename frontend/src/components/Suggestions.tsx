import { useAutoComplete } from '../hooks/useAutoComplete';

const Suggestions = () => {
  const { suggestions, setInputSelectedValue, shouldShowSuggestions, setShouldShowSuggestions } =
    useAutoComplete();

  if (!shouldShowSuggestions) {
    return null;
  }


  return (
    <div className="suggestions-wrapper">
      <ul>
        {suggestions.map((suggestion, index) => (
          <li
            key={`${suggestion}-${index}`}
            onClick={() => {
              setShouldShowSuggestions(false);
              setInputSelectedValue(suggestion);
            }}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
