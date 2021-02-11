import React, { createContext, useReducer, useEffect, useState } from "react";
import * as firebase from "firebase/app";
import { authReducer } from "./authReducer";
import { AuthProviderInterface, AuthState, AuthAction, AuthContextState } from "./types";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/functions";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);

if (process.env.NODE_ENV === "production") {
  firebase.analytics();
}

if (process.env.NODE_ENV === "development") {
  firebase.firestore().settings({ host: "localhost:8080", ssl: false });
 firebase.functions().useFunctionsEmulator("http://localhost:5001");
}

function getDefaultState(): AuthState {
  const DEFAULT_STATE = {
    authUser: null,
    expiresAt: null,
    isAuthenticating: false
  };

  let stored_state = {};

  if (typeof localStorage !== "undefined") {
    const expiresAt = new Date(JSON.parse(localStorage.getItem("useAuth:expires_at") || "0"));

    if (expiresAt > new Date()) {
      stored_state = {
        authUser: JSON.parse(localStorage.getItem("useAuth:user") || "{}"),
        expiresAt: expiresAt
      };
    }
  }

  return {
    ...DEFAULT_STATE,
    ...stored_state
  };
}

export const FirebaseContext = createContext<AuthContextState>({
  state: getDefaultState(),
  dispatch: () => {}
});

export const AuthProvider: AuthProviderInterface = ({ children }) => {
  // Holds authentication state
  const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(authReducer, getDefaultState());

  const [contextValue, setContextValue] = useState<AuthContextState>({
    state,
    dispatch
  });

  // Update context value and trigger re-render
  // This patterns avoids unnecessary deep renders
  // https://reactjs.org/docs/context.html#caveats
  useEffect(() => {
    setContextValue((contextValue: AuthContextState) => ({
      ...contextValue,
      state
    }));
  }, [state]);

  // Verify user is logged-in on AuthProvider mount
  // Avoids storing sensitive data in local storage
  useEffect(() => {
    dispatch({
      type: "startAuthenticating"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged(authResult => {
      dispatch({
        type: "stopAuthenticating"
      });

      if (authResult) {
        authResult.getIdTokenResult().then(idTokenResult => {
          dispatch({
            type: "login",
            authResult,
            authUser: firebase.auth().currentUser,
            idTokenResult
          });
        });
      } else {
        
        dispatch({
          type: "error",
          errorType: "checkSession",
          error: new Error("error")
        });
      }
      return () => unsubscribe();
    }, err => {
    });
  }, []);

  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};

export default AuthProvider;
