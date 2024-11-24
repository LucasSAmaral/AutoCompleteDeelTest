const SuggestionsNotFound: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="suggestions-not-found">
      <p>{children}</p>
    </div>
  );
};

export default SuggestionsNotFound;
