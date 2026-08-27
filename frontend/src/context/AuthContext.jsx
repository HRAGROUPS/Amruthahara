import { createContext, useContext } from "react";
import { removeToken } from "../services/auth";

const AuthContext = createContext(null);

function readUser() {
  try {
    return JSON.parse(localStorage.getItem("amruthahara_user")) || null;
  } catch {
    return null;
  }
}

function createAuthValue() {
  return {
    user: readUser(),
    isAuthenticated: localStorage.getItem("amruthahara_logged_in") === "true",
    login(nextUser) {
      localStorage.setItem("amruthahara_logged_in", "true");
      localStorage.setItem("amruthahara_user", JSON.stringify(nextUser));
    },
    logout() {
      localStorage.removeItem("amruthahara_logged_in");
      localStorage.removeItem("amruthahara_user");
      removeToken();
      window.location.href = "/login";
    },
    updateUser(nextUser) {
      localStorage.setItem("amruthahara_user", JSON.stringify({ ...readUser(), ...nextUser }));
    },
  };
}

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={createAuthValue()}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext) || createAuthValue();
}
