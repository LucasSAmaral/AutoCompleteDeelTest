import { memo } from 'react';
import HighlightText from './HighlightText';

interface SuggestionsProps {
  inputSearchValue: string;
  suggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  inputSearchValue,
  handleSuggestionClick,
}) => {
  return (
    <div className="suggestions-wrapper">
      <ul>
        {suggestions.map((suggestion, index) => (
          <li
            data-testid={suggestion}
            key={`${suggestion}-${index}`}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <HighlightText suggestion={suggestion} inputSearchValue={inputSearchValue} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Suggestions);
