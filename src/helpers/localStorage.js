export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing JSON from local storage: ${error}`);
    return null;
  }
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
