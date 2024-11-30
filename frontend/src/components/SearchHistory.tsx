import { memo } from 'react';
import { getLocalStorageHistory } from '../helpers/localStorageHelpers';

interface SearchHistory {
  handleSearchHistoryClick: (suggestion: string) => void;
}

// I implemented a search history feature to allow the user to access recent search terms directly,
// avoiding unnecessary API calls to fetch recent items.
const SearchHistory: React.FC<SearchHistory> = ({ handleSearchHistoryClick }) => {
  const localStorageHistory = getLocalStorageHistory();

  if (localStorageHistory.length === 0) return null;

  // Reversed the list to display the most recently searched items at the top.
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

export default memo(SearchHistory);
