import { useContext } from "react";
import * as firebase from "firebase/app";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "./AuthProvider";
import { useAuthInterface, setSessionInterface } from "./types";

export const useAuth: useAuthInterface = () => {
  const { state, dispatch } = useContext(FirebaseContext);
  let navigate = useNavigate();
  const login = () => {};

  const logout = async () => {
    dispatch({ type: "logout" });
    await firebase.auth().signOut();
  };

  const isAuthenticated = () => {
    return !!(state.expiresAt && new Date().getTime() < state.expiresAt);
  };

  const isAuthorized = () => {
    return true;
  };
  const signInWithMicrosoft = async () => {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'));
    } catch (e) {
      console.log("sign in error is:", e);
      throw e;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (e) {
      console.log("sign in error is:", e);
      throw e;
    }
  };

  const signInWithYahoo = async () => {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.OAuthProvider('yahoo.com'));
    } catch (e) {
      console.log("sign in error is:", e);
      throw e;
    }
  };


  return {
    isAuthenticating: state.isAuthenticating,
    isAuthenticated,
    isAuthorized,
    authUser: state.authUser || null,
    userId: state.authUser ? state.authUser.uid : null,
    authResult: state.authResult,
    login,
    logout,
    signInWithGoogle,
    signInWithMicrosoft,
    signInWithYahoo
  };
};
