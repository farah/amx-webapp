import React from "react";

const ContinueButton: React.FC = () => {
  return (
    <div className="continueButtonStyle1">
      <div className="db-Login-field Box-root">
        <div
          className="Box-root Flex-flex Flex-direction--column Flex-justifyContent--flexStart Flex-wrap--nowrap"
          style={{ marginLeft: "-12px", marginTop: "-12px" }}
        >
          <div className="Box-root Box-hideIfEmpty Margin-top--12 Margin-left--12">
            <div
              className="PressableCore PressableCore--cursor--pointer PressableCore--height--jumbo PressableCore--radius--all PressableCore--width PressableCore--width--maximized PressableButton Button Button--color--blue Box-root Flex-inlineFlex"
              style={{
                backgroundColor: "rgb(84, 105, 212)",
                boxShadow:
                  "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgb(84, 105, 212) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.12) 0px 2px 5px 0px"
              }}
            >
              <div className="PressableCore-base Box-root">
                <button
                  className="UnstyledLink Button-element PressableContext Padding-horizontal--16 Padding-vertical--8 PressableContext--cursor--pointer PressableContext--display--inlineFlex PressableContext--fontLineHeight--28 PressableContext--fontSize--16 PressableContext--fontWeight--medium PressableContext--height PressableContext--height--jumbo PressableContext--radius--all PressableContext--width PressableContext--width--maximized"
                  type="submit"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  <div
                    className="Button-align Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row"
                    style={{ position: "relative" }}
                  >
                    <div
                      className="TextAligner Box-root"
                      style={{ lineHeight: "28px", fontSize: "16px", flex: "0 0 auto" }}
                    ></div>
                    <div
                      className="Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row Flex-justifyContent--center"
                      style={{ width: "100%", lineHeight: "0", flex: "1 1 auto" }}
                    >
                      <span
                        className="Button-label Text-color--white Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--28 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--block"
                        style={{ marginTop: "-1px" }}
                      >
                        <span>Continue</span>
                      </span>
                    </div>
                  </div>
                </button>
              </div>
              <div className="PressableCore-overlay PressableCore-overlay--extendBy1 Box-root Box-background--white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueButton;
