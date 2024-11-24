interface HighlightTextProps {
  suggestion: string;
  inputSearchValue: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ suggestion, inputSearchValue }) => {
  if (!inputSearchValue) return <>{suggestion}</>;

  const rgx = new RegExp(`(${inputSearchValue.trim().replace(/\s+/g, '\\s*')})`, 'i');
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
