import { AuthState, AuthAction } from "./types";
import * as firebase from "firebase/app";

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "login":
      const { authResult, authUser, idTokenResult } = action;
    
      const expiresAt =
        Date.parse(idTokenResult.expirationTime) * 1000 + new Date().getTime();

      if (typeof localStorage !== "undefined") {
        localStorage.setItem("useAuth:expires_at", JSON.stringify(expiresAt));
        localStorage.setItem("useAuth:user", JSON.stringify(authUser));
      }

      return {
        ...state,
        authUser,
        expiresAt,
        authResult
      };
    case "logout":
      
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem("useAuth:expires_at");
        localStorage.removeItem("useAuth:user");
      }

      return {
        ...state,
        authUser: null,
        expiresAt: null,
        authResult: null
      };
    case "stopAuthenticating":
      
      return {
        ...state,
        isAuthenticating: false
      };
    case "startAuthenticating":
      
      return {
        ...state,
        isAuthenticating: true
      };
    case "error":
      const { errorType, error } = action;
      return {
        ...state,
        authUser: null,
        expiresAt: null,
        authResult: null,
        errorType,
        error
      };
    default:
      return state;
  }
};
