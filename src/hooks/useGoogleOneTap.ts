/* eslint-disable */
import { useEffect, ReactElement, memo } from "react";
import useScript from "hooks/useScript";
import {} from "react";
declare global {
  interface Window {
    google: any;
    [key: string]: any;
  }
}

export interface IGoogleOneTapLogin extends IUseGoogleOneTapLogin {
  children: ReactElement;
}

export interface IUseGoogleOneTapLogin {
  disabled?: boolean;
  onError?: (error?: Error | string) => void;
  googleAccountConfigs: IGoogleOneTapLoginProps;
  onSuccess?: (response: IGoogleEndPointResponse) => void;
}

export interface IGoogleOneTapLoginProps {
  nonce?: string;
  context?: string;
  client_id: string;
  auto_select?: boolean;
  prompt_parent_id?: string;
  state_cookie_domain?: string;
  cancel_on_tap_outside?: boolean;
  callback?: (...args: any) => any;
  native_callback?: (...args: any) => any;
}

export interface IGoogleCallbackResponse {
  credential?: string;
}

export interface IGoogleEndPointResponse {
  iss: string;
  sub: string;
  azp: string;
  aud: string;
  iat: string;
  exp: string;
  name: string;
  email: string;
  local: string;
  picture: string;
  given_name: string;
  family_name: string;
  email_verified: string;
}

const scriptFlag: string = "__googleOneTapScript__";
const googleClientScriptURL: string = "https://accounts.google.com/gsi/client";
const oauthEndpointURL: string = "https://oauth2.googleapis.com/tokeninfo?id_token=";

function callback({
  data,
  onError,
  onSuccess
}: {
  data: IGoogleCallbackResponse;
  onError?: IUseGoogleOneTapLogin["onError"];
  onSuccess?: IUseGoogleOneTapLogin["onSuccess"];
}) {
  if (data?.credential) {
    fetch(`${oauthEndpointURL}${data.credential}`)
      .then(resp => {
        if (resp?.status === 200 && resp?.json) {
          return resp.json();
        } else {
          onError ? onError() : null;
          throw new Error("Something went wrong");
        }
      })
      .then((resp: IGoogleEndPointResponse) => {
        onSuccess ? onSuccess(resp) : null;
      })
      .catch(error => {
        onError ? onError(error) : null;
        throw error;
      });
  }
}

export function useGoogleOneTapLogin({ onError, disabled, onSuccess, googleAccountConfigs }: IUseGoogleOneTapLogin) {
  const script = useScript(googleClientScriptURL);
  console.log('enter useGoogleOneTapLogin')
  useEffect(() => {
      console.log('start useEffect')
      console.log('window', window)
      console.log('window?.[scriptFlag] 1', window?.[scriptFlag])
      console.log('script 1', script)
    if (!window?.[scriptFlag] && script === "ready") {
        console.log('window?.[scriptFlag] 2', window?.[scriptFlag])
        console.log('window.google.accounts.id.prompt. 1', window.google.accounts.id.prompt)

      window.google.accounts.id.initialize({
        ...googleAccountConfigs,
        callback: (data: IGoogleCallbackResponse) => callback({ data, onError, onSuccess })
      });
      window[scriptFlag] = true;
      console.log('window[scriptFlag]', window[scriptFlag])
    }
    if (window?.[scriptFlag] && script === "ready" && !disabled) {
        console.log('run window.google.accounts.id.prompt;', window.google.accounts.id.prompt)
      window.google.accounts.id.prompt();
    }
  }, [script, window?.[scriptFlag], disabled]);

  return null;
}

function GoogleOneTapLogin({ children, ...props }: IGoogleOneTapLogin) {
  useGoogleOneTapLogin(props);
  return children;
}

export default memo(GoogleOneTapLogin);
