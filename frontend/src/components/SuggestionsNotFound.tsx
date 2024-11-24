import { useAutoComplete } from '../hooks/useAutoComplete';

const SuggestionsNotFound = () => {
  const { suggestionsNotFoundMessage } = useAutoComplete();

  if (suggestionsNotFoundMessage) {
    return (
      <div className="suggestions-not-found">
        <p>{suggestionsNotFoundMessage}</p>
      </div>
    );
  }

  return null;
};

export default SuggestionsNotFound;
