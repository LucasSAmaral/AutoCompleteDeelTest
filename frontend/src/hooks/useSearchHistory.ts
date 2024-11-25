import { useCallback, useEffect, useState } from 'react';
import { getLocalStorageHistory, setLocalStorageHistory } from '../helpers/localStorageHelpers';

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>(getLocalStorageHistory());

  const postSearchHistory = useCallback(async (searchHistory: string[]) => {
    try {
      const response = await fetch('http://localhost:4000/api/autocomplete/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchHistory }),
      });

      if (!response.ok) {
        throw new Error('Error on posting searchHistory');
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (searchHistory.length % 5 === 0 && searchHistory.length > 0) {
      setLocalStorageHistory(searchHistory);
      postSearchHistory(searchHistory);
    } else {
      setLocalStorageHistory(searchHistory);
    }
  }, [searchHistory, postSearchHistory]);

  return { searchHistory, setSearchHistory };
};
