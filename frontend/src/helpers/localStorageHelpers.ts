const LOCAL_STORAGE_HISTORY_KEY = 'localSearchHistory';

export const getLocalStorageHistory = (): string[] => {
  const storageHistory = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);

  return storageHistory ? JSON.parse(storageHistory) : [];
};

export const setLocalStorageHistory = (history: string[]) => {
  localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(history));
};
