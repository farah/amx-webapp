import { useAuth } from "contexts/Firebase";
import { useNavigate } from "react-router-dom";

export const YahooButton = () => {
  let navigate = useNavigate();

  const { authResult, authUser, signInWithYahoo, logout } = useAuth();
  const onSignOut = e => {
    e.preventDefault();
    logout();
  };
  const onSignIn = async e => {
    e.preventDefault();
    await signInWithYahoo();
    navigate("/transfer");
  };

  const renderAuth = () => {
    return (
      <>
        {!authUser ? (
          <button
          onClick={e => onSignIn(e)}
            className="w-button w-button--secondary lh-signin-button gc-analytics-event"
            style={{backgroundColor:"#720E9E"}}
          >
            <span className="firebaseui-idp-icon-wrapper">
              <img
                className="firebaseui-idp-icon"
                alt=""
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/yahoo.svg"
              />
            </span>
            <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Yahoo</span>
            <span className="firebaseui-idp-text firebaseui-idp-text-short">Yahoo</span>
          </button>
        ) : (
          <button
          onClick={e => { 
               
            onSignOut(e)
           }}
            className="w-button w-button--secondary lh-signin-button gc-analytics-event"
            style={{backgroundColor:"#720E9E"}}
          >
            <span className="firebaseui-idp-icon-wrapper">
              <img
                className="firebaseui-idp-icon"
                alt=""
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/yahoo.svg"
              />
            </span>
            <span className="firebaseui-idp-text firebaseui-idp-text-long">{authResult && authResult.providerData[0].providerId === "yahoo.com" ? "Sign out" : "Sign in with Yahoo"} </span>
            <span className="firebaseui-idp-text firebaseui-idp-text-short">Yahoo</span>
          </button>
        )}
      </>
    );
  };
  return <div>{renderAuth()}</div>;
};

export default YahooButton;
