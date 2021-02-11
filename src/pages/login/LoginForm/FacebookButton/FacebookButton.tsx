import React from "react";

const FacebookButton: React.FC = () => {
  return (
    <button
      className="w-button w-button--secondary lh-signin-button gc-analytics-event"
      style={{ backgroundColor: "#3b5998" }}
    >
      <span className="firebaseui-idp-icon-wrapper">
        <img
          className="firebaseui-idp-icon"
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
        />
      </span>
      <span className="firebaseui-idp-text firebaseui-idp-text-long">
        Sign in with Facebook
      </span>
      <span className="firebaseui-idp-text firebaseui-idp-text-short">Facebook</span>
    </button>
  );
};

export default FacebookButton;
