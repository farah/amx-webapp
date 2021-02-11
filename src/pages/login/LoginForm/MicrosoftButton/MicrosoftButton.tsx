import { useAuth } from "contexts/Firebase";
import { useNavigate } from "react-router-dom";

export const MicrosoftButton = () => {
  let navigate = useNavigate();

  const { authResult, authUser, signInWithMicrosoft, logout } = useAuth();
  const onSignOut = e => {
    e.preventDefault();
    logout();
  };
  const onSignIn = async e => {
    e.preventDefault();
    await signInWithMicrosoft();
    navigate("/transfer");
  };

  const renderAuth = () => {
    return (
      <>
        {!authUser ? (
          <button
          onClick={e => onSignIn(e)}
            className="w-button w-button--secondary lh-signin-button gc-analytics-event"
            style={{ backgroundColor: "#2F2F2F" }}
          >
            <span className="firebaseui-idp-icon-wrapper">
              <img
                className="firebaseui-idp-icon"
                alt=""
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/microsoft.svg"
              />
            </span>
            <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Microsoft</span>
            <span className="firebaseui-idp-text firebaseui-idp-text-short">Microsoft</span>
          </button>
        ) : (
          <button
          onClick={e => { 
               
            onSignOut(e)
           }}
            className="w-button w-button--secondary lh-signin-button gc-analytics-event"
            style={{ backgroundColor: "#2F2F2F" }}
          >
            <span className="firebaseui-idp-icon-wrapper">
              <img
                className="firebaseui-idp-icon"
                alt=""
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/microsoft.svg"
              />
            </span>
            <span className="firebaseui-idp-text firebaseui-idp-text-long">{authResult && authResult.providerData[0].providerId === "microsoft.com" ? "Sign out" : "Sign in with Microsoft"} </span>
            <span className="firebaseui-idp-text firebaseui-idp-text-short">Microsoft</span>
          </button>
        )}
      </>
    );
  };
  return <div>{renderAuth()}</div>;
};

export default MicrosoftButton;
