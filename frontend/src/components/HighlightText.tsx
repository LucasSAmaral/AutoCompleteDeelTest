import React, { memo } from 'react';

interface HighlightTextProps {
  suggestion: string;
  inputSearchValue: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ suggestion, inputSearchValue }) => {
  if (!inputSearchValue) return <>{suggestion}</>;

  // This Regex is going to match the inputSearchValue within the suggestion text.
  // It captures the typed value, allowing flexible spacing and case-insensitive matches.
  const rgx = new RegExp(`\\b(${inputSearchValue.trim().replace(/\s+/g, '\\s*')})`, 'gi');

  // Then the suggestion text is splitted into parts based on the regex.
  const repartedSuggestion = suggestion.split(rgx);

  return (
    <>
      {repartedSuggestion.map((part, index) =>
        // If the typed value matches part of the suggestion text, it will highlight the matching portion.
        rgx.test(part) ? (
          <strong key={`highlighted-part-${index}`}>{part}</strong>
        ) : (
          // I'm using React.Fragment instead of <></> to pass the key prop.
          <React.Fragment key={`highlighted-part-${index}`}>{part}</React.Fragment>
        ),
      )}
    </>
  );
};

export default memo(HighlightText);
