import React from "react";
import GoogleButton from "./GoogleButton";
import YahooButton from "./YahooButton";
import AppleButton from "./AppleButton";
import MicrosoftButton from "./MicrosoftButton";

const LoginForm: React.FC = () => {
  return (
    <div className="db-Login-fields Box-root Padding-bottom--12">
      <div className="Box-root Flex-flex Flex-direction--column Flex-justifyContent--flexStart Flex-wrap--nowrap">
        <div className="Box-root Box-hideIfEmpty">
          <GoogleButton />
        </div>
        <div className="Box-root Box-hideIfEmpty">
        <MicrosoftButton />
        </div>
        <div className="Box-root Box-hideIfEmpty">
          
          <YahooButton />
        </div>
        <div className="Box-root Box-hideIfEmpty">
          <div className="Box-root Padding-top--8 Padding-bottom--20"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
