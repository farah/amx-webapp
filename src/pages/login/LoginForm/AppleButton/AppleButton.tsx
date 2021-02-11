import React from "react";

const AppleButton: React.FC = () => {
  return (
    <button
      className="w-button w-button--secondary lh-signin-button gc-analytics-event"
      style={{ backgroundColor: "#000000" }}
    >
      <span className="firebaseui-idp-icon-wrapper">
        <img
          className="firebaseui-idp-icon"
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/apple.png"
        />
      </span>
      <span className="firebaseui-idp-text firebaseui-idp-text-long">
        Sign in with Apple
      </span>
      <span className="firebaseui-idp-text firebaseui-idp-text-short">Apple</span>
    </button>
  );
};

export default AppleButton;
