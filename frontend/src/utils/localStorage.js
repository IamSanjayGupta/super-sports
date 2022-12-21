export const getLocalStorageItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorageItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorageItem = (key) => {
  return localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};
