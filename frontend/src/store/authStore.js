import { create } from "zustand";

const TOKEN_KEY = "ministops_accessToken";
const USER_KEY = "ministops_user";

export const useAuthStore = create((set) => ({
  accessToken: localStorage.getItem(TOKEN_KEY),
  user: JSON.parse(localStorage.getItem(USER_KEY) || "null"),
  isLoggedIn: !!localStorage.getItem(TOKEN_KEY),

  login: ({ accessToken, user }) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    set({
      accessToken,
      user,
      isLoggedIn: true,
    });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    set({
      accessToken: null,
      user: null,
      isLoggedIn: false,
    });
  },
}));