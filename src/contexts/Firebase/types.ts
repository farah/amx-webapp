import * as firebase from "firebase/app";

import { ReactNode, Dispatch } from "react";

export type AuthState = {
  authUser: firebase.UserInfo;
  authResult?: firebase.User | null;
  expiresAt: number | null;
  isAuthenticating: boolean;
  errorType?: string;
  error?: any;
};

export type AuthAction =
  | {
      type: "login";
      authResult: firebase.User;
      authUser: firebase.UserInfo;
      idTokenResult: firebase.auth.IdTokenResult;
    }
  | { type: "logout" | "stopAuthenticating" | "startAuthenticating" }
  | {
      type: "error";
      errorType: string;
      error: Error;
    };

export interface useAuthInterface {
  (): {
    isAuthenticating: boolean;
    isAuthenticated: () => boolean;
    isAuthorized: (role: string | string[]) => boolean;
    authUser: firebase.UserInfo;
    userId: string | null | undefined;
    authResult: firebase.User | undefined | null;
    login: () => void;
    logout: () => void;
    signInWithGoogle: () => any;
    signInWithMicrosoft: () => any;
    signInWithYahoo: () => any;
  };
}

export type AuthDispatch = Dispatch<AuthAction>;

export type handleAuthResultInterface = ({
  err,
  dispatch,
  authResult
}: {
  err?: Error | null;
  dispatch: AuthDispatch;
  authResult: firebase.User | null;
}) => Promise<boolean>;

export type setSessionInterface = ({
  dispatch,
  authResult
}: {
  dispatch: AuthDispatch;
  authResult: firebase.User;
}) => Promise<any>;

export type AuthProviderInterface = ({
  children
}: {
  children: ReactNode;
}) => JSX.Element;

export type AuthContextState = {
  state: AuthState;
  dispatch: AuthDispatch;
};
