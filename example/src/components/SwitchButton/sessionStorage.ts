const isBrowser = () => typeof window !== 'undefined';

export const getSessionStorage = (key: string) => {
  if (!key) return;
  if (!isBrowser()) return null;
  try {
    return JSON.parse(sessionStorage.getItem(key) || 'null');
  } catch (error) {
    console.error('getSessionStorage', error);
    return null;
  }
};

export const setSessionStorage = (key: string, value: unknown) => {
  if (!key || !isBrowser()) return;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('setSessionStorage', error);
  }
};

export const removeSessionStorage = (key: string) => {
  if (!key || !isBrowser()) return;
  sessionStorage.removeItem(key);
};
