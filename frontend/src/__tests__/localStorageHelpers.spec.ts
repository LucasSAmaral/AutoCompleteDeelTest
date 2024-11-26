import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getLocalStorageHistory,
  LOCAL_STORAGE_HISTORY_KEY,
  setLocalStorageHistory,
} from '../helpers/localStorageHelpers';

describe('localStorageHelpers', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockClear();
    vi.spyOn(Storage.prototype, 'setItem').mockClear();
  });

  it('should return an empty array if localStorage is empty', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const localStorageHistory = getLocalStorageHistory();

    expect(localStorageHistory).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_HISTORY_KEY);
  });

  it('should return parsed history if localStorage contains history', () => {
    const historyArray = ['React', 'Typescript'];

    const mockHistory = JSON.stringify(historyArray);

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockHistory);

    const history = getLocalStorageHistory();

    expect(history).toEqual(historyArray);
  });

  it('should save data to localStorage', () => {
    const mockHistory = ['React', 'Typescript'];

    setLocalStorageHistory(mockHistory);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_HISTORY_KEY,
      JSON.stringify(mockHistory),
    );
  });
});
