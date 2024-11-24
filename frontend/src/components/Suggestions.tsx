interface SuggestionsProps {
  suggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ suggestions, handleSuggestionClick }) => {
  return (
    <div className="suggestions-wrapper">
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={`${suggestion}-${index}`} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
