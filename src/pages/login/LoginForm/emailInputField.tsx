import React from "react";

const EmailInputField: React.FC = () => {
  return (
    <div className="db-Login-field Box-root">
      <div
        className="Box-root Flex-flex Flex-direction--column Flex-justifyContent--flexStart Flex-wrap--nowrap"
        style={{ marginLeft: "-12px", marginTop: "-12px" }}
      >
        <div className="Box-root Box-hideIfEmpty Margin-top--12 Margin-left--12">
          <label>
            <span className="db-Login-fieldLabel db-Login-fieldLabel--clickable Text-color--default Text-fontSize--14 Text-fontWeight--medium Text-lineHeight--20 Text-numericSpacing--proportional Text-typeface--base Text-wrap--wrap Text-display--inline">
              <span>Email</span>
            </span>
          </label>
        </div>
        <div className="Box-root Box-hideIfEmpty Margin-top--12 Margin-left--12">
          <div
            className="PressableCore PressableCore--cursor--text PressableCore--height--jumbo PressableCore--radius--all PressableCore--width PressableCore--width--maximized PressableField TextInput Box-root Flex-inlineFlex"
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              boxShadow:
                "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"
            }}
          >
            <div className="PressableCore-base Box-root">
              <input
                id="email"
                name="email"
                placeholder=""
                type="email"
                className="Input Input--nowrap PressableContext Padding-horizontal--16 Padding-vertical--8 PressableContext--cursor--text PressableContext--display--inlineFlex PressableContext--fontLineHeight--28 PressableContext--fontSize--16 PressableContext--fontWeight--regular PressableContext--height PressableContext--height--jumbo PressableContext--radius--all PressableContext--width PressableContext--width--maximized TextInput-element TextInput-element--align--left PressableContext Padding-horizontal--16 Padding-vertical--8 PressableContext--cursor--text PressableContext--display--inlineFlex PressableContext--fontLineHeight--28 PressableContext--fontSize--16 PressableContext--fontWeight--regular PressableContext--height PressableContext--height--jumbo PressableContext--radius--all PressableContext--width PressableContext--width--maximized"
                value="support@amal.express"
                style={{ color: "rgb(60, 66, 87)" }}
              />
            </div>
            <div className="PressableCore-overlay PressableCore-overlay--extendBy1 Box-root Box-background--white"></div>
          </div>
        </div>
        <div className="Box-root Box-hideIfEmpty Margin-top--12 Margin-left--12"></div>
      </div>
    </div>
  );
};

export default EmailInputField;
