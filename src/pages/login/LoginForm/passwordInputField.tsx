import React from "react";

const PasswordInputField: React.FC = () => {
  return (
    <div className="passwordInputField1">
      <div className="db-Login-field Box-root">
        <div
          className="Box-root Flex-flex Flex-direction--column Flex-justifyContent--flexStart Flex-wrap--nowrap"
          style={{ marginLeft: "-12px", marginTop: "-12px" }}
        >
          <div className="Box-root Box-hideIfEmpty Margin-top--12 Margin-left--12">
            <label>
              <span className="db-Login-fieldLabel db-Login-fieldLabel--clickable Text-color--default Text-fontSize--14 Text-fontWeight--medium Text-lineHeight--20 Text-numericSpacing--proportional Text-typeface--base Text-wrap--wrap Text-display--inline">
                <div className="Box-root">
                  <div
                    className="Box-root Flex-flex Flex-direction--row Flex-justifyContent--spaceBetween Flex-wrap--nowrap"
                    style={{ marginLeft: "-4px", marginTop: "-4px" }}
                  >
                    <div className="Box-root Box-hideIfEmpty Margin-top--4 Margin-left--4">
                      <span>Password</span>
                    </div>
                    <div className="Box-root Box-hideIfEmpty Margin-top--4 Margin-left--4">
                      <a
                        href="/reset?prefill_email=support%40amal.express"
                        className="UnstyledLink ButtonLink Flex-flex"
                      >
                        <div
                          className="Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row"
                          style={{ position: "relative" }}
                        >
                          <div
                            className="TextAligner Box-root"
                            style={{
                              lineHeight: "20px",
                              fontSize: "14px",
                              flex: "0 0 auto"
                            }}
                          ></div>
                          <div
                            className="Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row Flex-justifyContent--flexStart"
                            style={{ lineHeight: "0", flex: "1 1 auto" }}
                          >
                            <span
                              className="ButtonLink-label Text-color--blue Text-fontSize--14 Text-fontWeight--medium Text-lineHeight--20 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--block"
                              style={{ marginTop: "-1px" }}
                            >
                              <span>Forgot your password?</span>
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
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
                  aria-invalid="false"
                  id="old-password"
                  name="password"
                  placeholder=""
                  type="password"
                  aria-label="password input"
                  aria-required="false"
                  className="Input Input--nowrap PressableContext Padding-horizontal--16 Padding-vertical--8 PressableContext--cursor--text PressableContext--display--inlineFlex PressableContext--fontLineHeight--28 PressableContext--fontSize--16 PressableContext--fontWeight--regular PressableContext--height PressableContext--height--jumbo PressableContext--radius--all PressableContext--width PressableContext--width--maximized TextInput-element TextInput-element--align--left PressableContext Padding-horizontal--16 Padding-vertical--8 PressableContext--cursor--text PressableContext--display--inlineFlex PressableContext--fontLineHeight--28 PressableContext--fontSize--16 PressableContext--fontWeight--regular PressableContext--height PressableContext--height--jumbo PressableContext--radius--all PressableContext--width PressableContext--width--maximized"
                  style={{ color: "rgb(60, 66, 87)" }}
                />
              </div>
              <div className="PressableCore-overlay PressableCore-overlay--extendBy1 Box-root Box-background--white"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="Box-root Padding-top--32"></div>
    </div>
  );
};

export default PasswordInputField;
