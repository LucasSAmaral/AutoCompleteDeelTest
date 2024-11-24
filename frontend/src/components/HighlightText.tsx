interface HighlightTextProps {
  suggestion: string;
  inputSearchValue: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ suggestion, inputSearchValue }) => {
  if (!inputSearchValue) return <>{suggestion}</>;

  const rgx = new RegExp(`\\b(${inputSearchValue.trim().replace(/\s+/g, '\\s*')})`, 'gi');
  const splittedSuggestion = suggestion.split(rgx);

  return (
    <>
      {splittedSuggestion.map((split, index) =>
        rgx.test(split) ? <strong key={index}>{split}</strong> : <>{split}</>,
      )}
    </>
  );
};

export default HighlightText;
