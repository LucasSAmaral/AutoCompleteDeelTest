import { getLocalStorageHistory } from '../helpers/localStorageHelpers';

interface SearchHistory {
  handleSearchHistoryClick: (suggestion: string) => void;
}

const SearchHistory: React.FC<SearchHistory> = ({ handleSearchHistoryClick }) => {
  const localStorageHistory = getLocalStorageHistory();

  if (localStorageHistory.length === 0) return null;

  const reversedLocalStorageHistory = localStorageHistory.reverse();

  return (
    <div className="search-history-wrapper">
      <p>latest searched technologies:</p>
      <ul>
        {reversedLocalStorageHistory.map((history, index) => (
          <li key={`${history}-${index}`} onClick={() => handleSearchHistoryClick(history)}>
            {history}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
