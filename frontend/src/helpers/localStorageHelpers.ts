// I created these helper functions to make it easier to get and set data in localStorage.

export const LOCAL_STORAGE_HISTORY_KEY = 'localSearchHistory';

export const getLocalStorageHistory = (): string[] => {
  const storageHistory = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);

  // This function is used to set the initial state of searchHistory.
  // It retrieves data from localStorage to persist it across page reloads.
  // If localStorage is empty, it returns an empty array.
  return storageHistory ? JSON.parse(storageHistory) : [];
};

export const setLocalStorageHistory = (history: string[]) => {
  localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(history));
};
