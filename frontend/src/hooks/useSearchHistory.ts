import { useEffect, useState } from 'react';
import { getLocalStorageHistory, setLocalStorageHistory } from '../helpers/localStorageHelpers';

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>(getLocalStorageHistory());

  useEffect(() => {
    if (searchHistory.length === 5) {
      setLocalStorageHistory(searchHistory);
      // Send history to api
    } else {
      setLocalStorageHistory(searchHistory);
    }
  }, [searchHistory]);

  return { searchHistory, setSearchHistory };
};
