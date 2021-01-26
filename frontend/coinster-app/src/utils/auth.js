const storage = localStorage;
const TOKEN_KEY = 'auth_token';
const CURRENT_USER = 'current_user';

const setJsonValue = (key, value) => {
  storage.setItem(
      key,
      JSON.stringify(value)
  );
};

const getJsonValue = (key) => {
  const encodedStoredToken = storage.getItem(key);
  let result = null;
  if (encodedStoredToken) {
    try {
      result = JSON.parse(encodedStoredToken);
    } catch (e) {}
  }
  return result;
};

export const setToken = (token) => {
  storage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return storage.getItem(TOKEN_KEY);
};

export function deleteToken() {
  storage.removeItem(TOKEN_KEY);
}

export const setCurrentUser = (user) => {
  setJsonValue(CURRENT_USER, user);
};

export const getCurrentUser = () => {
  return getJsonValue(CURRENT_USER);
};

export function deleteCurrentUser() {
  storage.removeItem(CURRENT_USER);
}
