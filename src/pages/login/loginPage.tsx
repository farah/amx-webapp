import React from "react";
import LoginForm from "./LoginForm";
import Logo from "components/Logo";
import Footer from "./footer";

const flexGrowStyle = {
  flexGrow: 1
};

const style1 = {
  minHeight: "100vh",
  flexGrow: 1
};

const style2 = {
  backgroundImage: "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
  flexGrow: 1
};

const LoginPage: React.FC = () => {
  return (
    <div id="login-page" className="db-Login-root">
      <div
        data-test="content"
        className="Box-root Flex-flex Flex-direction--column"
        style={style1}
      >
        <div className="db-LoginBackground Box-root Box-background--white Padding-top--64">
          <div className="db-LoginBackground-gridContainer">
            <div
              className="Box-root Flex-flex"
              style={{ gridArea: "top / start / 8 / end" }}
            >
              <div className="Box-root" style={style2}></div>
            </div>
            <div className="Box-root Flex-flex" style={{ gridArea: "4 / 2 / auto / 5" }}>
              <div
                className="Box-root Box-divider--light-all-2"
                style={flexGrowStyle}
              ></div>
            </div>
            <div
              className="Box-root Flex-flex"
              style={{ gridArea: "6 / start / auto / 2" }}
            >
              <div
                className="Box-root Box-background--blue800"
                style={flexGrowStyle}
              ></div>
            </div>
            <div
              className="Box-root Flex-flex"
              style={{ gridArea: "7 / start / auto / 4" }}
            >
              <div className="Box-root Box-background--blue" style={flexGrowStyle}></div>
            </div>
            <div className="Box-root Flex-flex" style={{ gridArea: "8 / 4 / auto / 6" }}>
              <div
                className="Box-root Box-background--gray100"
                style={flexGrowStyle}
              ></div>
            </div>
            <div
              className="Box-root Flex-flex"
              style={{ gridArea: "2 / 15 / auto / end" }}
            >
              <div
                className="Box-root Box-background--cyan200"
                style={flexGrowStyle}
              ></div>
            </div>
            <div
              className="Box-root Flex-flex"
              style={{ gridArea: "3 / 14 / auto / end" }}
            >
              <div className="Box-root Box-background--blue" style={flexGrowStyle}></div>
            </div>
            <div
              className="Box-root Flex-flex"
              style={{ gridArea: "4 / 17 / auto / 20" }}
            >
              <div
                className="Box-root Box-background--gray100"
                style={flexGrowStyle}
              ></div>
            </div>
            <div
              className="Box-root Flex-flex"
              style={{ gridArea: "5 / 14 / auto / 17" }}
            >
              <div
                className="Box-root Box-divider--light-all-2"
                style={flexGrowStyle}
              ></div>
            </div>
          </div>
        </div>

        <div
          className="Box-root Padding-top--24 Flex-flex Flex-direction--column"
          style={flexGrowStyle}
        >
          <div className="Box-root Padding-top--48 Padding-bottom--24 Flex-flex Flex-justifyContent--center">
            <Logo />
          </div>
          <div style={{ margin: "0px auto", width: "100%", maxWidth: "448px" }}>
            <div className="styles1">
              <div
                style={{
                  background: "white",
                  borderRadius: "4px",
                  boxShadow:
                    "rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px",
                  transform:
                    "translate3d(var(--auto-translate-x), var(--auto-translate-y), 0)",
                  transformOrigin: "0% 0%",
                  width: "calc(100% * var(--auto-scale-x))",
                  height: "calc(100% * var(--auto-scale-y))",
                  willChange: "transform, width, height",
                  boxSizing: "border-box",
                  position: "absolute",
                  left: "0px",
                  top: "0px"
                }}
              ></div>
              <div className="styles2">
                <div className="styles3">
                  <div className="Box-root Padding-top--48 Padding-bottom--32 Padding-horizontal--48">
                    <div role="main">
                      <div className="Box-root">
                        <div className="Box-root">
                          <div
                            className="Box-root Flex-flex Flex-direction--column Flex-justifyContent--flexStart Flex-wrap--nowrap"
                            style={{ marginLeft: "-20px", marginTop: "-20px" }}
                          >
                            <div className="Box-root Box-hideIfEmpty Margin-top--20 Margin-left--20">
                              <span className="Text-color--dark Text-fontSize--20 Text-fontWeight--regular Text-lineHeight--28 Text-numericSpacing--proportional Text-typeface--base Text-wrap--wrap Text-display--inline">
                                <span>Sign in to your Amal Express account</span>
                              </span>
                            </div>
                            <div className="Box-root Box-hideIfEmpty Margin-top--20 Margin-left--20">
                              <form>
                                <div className="styles4">
                                  <LoginForm />
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Box-root">
            <div className="recaptcha-container"></div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
