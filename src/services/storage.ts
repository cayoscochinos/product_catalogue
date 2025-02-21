const TOKEN_KEY = 'auth_token';

export const storage = {
  getToken: (): string | null => {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    sessionStorage.removeItem(TOKEN_KEY);
  },

  clearAll: (): void => {
    sessionStorage.clear();
  }
};

export default storage; 