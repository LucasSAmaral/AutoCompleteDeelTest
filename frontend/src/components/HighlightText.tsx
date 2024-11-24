import React from 'react';

interface HighlightTextProps {
  suggestion: string;
  inputSearchValue: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ suggestion, inputSearchValue }) => {
  if (!inputSearchValue) return <>{suggestion}</>;

  const rgx = new RegExp(`\\b(${inputSearchValue.trim().replace(/\s+/g, '\\s*')})`, 'gi');
  const repartedSuggestion = suggestion.split(rgx);

  return (
    <>
      {repartedSuggestion.map((part, index) =>
        rgx.test(part) ? (
          <strong key={`highlighted-part-${index}`}>{part}</strong>
        ) : (
          <React.Fragment key={`highlighted-part-${index}`}>{part}</React.Fragment>
        ),
      )}
    </>
  );
};

export default HighlightText;
