import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="Box-root Padding-vertical--32">
      <div
        className="Box-root Flex-flex Flex-direction--row Flex-justifyContent--center Flex-wrap--nowrap"
        style={{ marginLeft: "-8px", marginTop: "-8px" }}
      >
        <div className="Box-root Box-hideIfEmpty Margin-top--8 Margin-left--8">
          <a href="" className="UnstyledLink ButtonLink Flex-flex">
            <div
              className="Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row"
              style={{ position: "relative" }}
            >
              <div
                className="TextAligner Box-root"
                style={{ lineHeight: "20px", fontSize: "14px", flex: "0 0 auto" }}
              ></div>
              <div
                className="Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row Flex-justifyContent--flexStart"
                style={{ lineHeight: "0", flex: "1 1 auto" }}
              >
                <span
                  className="ButtonLink-label Text-color--gray Text-fontSize--14 Text-fontWeight--medium Text-lineHeight--20 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--block"
                  style={{ marginTop: "-1px" }}
                >
                  © Amal Express
                </span>
              </div>
            </div>
          </a>
        </div>
        <div className="Box-root Box-hideIfEmpty Margin-top--8 Margin-left--8">
          <span className="Text-color--gray300 Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--20 Text-numericSpacing--proportional Text-typeface--base Text-wrap--wrap Text-display--inline">
            ·
          </span>
        </div>
        <div className="Box-root Box-hideIfEmpty Margin-top--8 Margin-left--8">
          <a href="contact" className="UnstyledLink ButtonLink Flex-flex">
            <div
              className="Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row"
              style={{ position: "relative" }}
            >
              <div
                className="TextAligner Box-root"
                style={{ lineHeight: "20px", fontSize: "14px", flex: "0 0 auto" }}
              ></div>
              <div
                className="Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row Flex-justifyContent--flexStart"
                style={{ lineHeight: "0", flex: "1 1 auto" }}
              >
                <span
                  className="ButtonLink-label Text-color--gray Text-fontSize--14 Text-fontWeight--medium Text-lineHeight--20 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--block"
                  style={{ marginTop: "-1px" }}
                >
                  <span>Contact</span>
                </span>
              </div>
            </div>
          </a>
        </div>
        <div className="Box-root Box-hideIfEmpty Margin-top--8 Margin-left--8">
          <span className="Text-color--gray300 Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--20 Text-numericSpacing--proportional Text-typeface--base Text-wrap--wrap Text-display--inline">
            ·
          </span>
        </div>
        <div className="Box-root Box-hideIfEmpty Margin-top--8 Margin-left--8">
          <a href="" className="UnstyledLink ButtonLink Flex-flex">
            <div
              className="Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row"
              style={{ position: "relative" }}
            >
              <div
                className="TextAligner Box-root"
                style={{ lineHeight: "20px", fontSize: "14px", flex: "0 0 auto" }}
              ></div>
              <div
                className="Box-root Flex-flex Flex-alignItems--baseline Flex-direction--row Flex-justifyContent--flexStart"
                style={{ lineHeight: "0", flex: "1 1 auto" }}
              >
                <span
                  className="ButtonLink-label Text-color--gray Text-fontSize--14 Text-fontWeight--medium Text-lineHeight--20 Text-numericSpacing--proportional Text-typeface--base Text-wrap--noWrap Text-display--block"
                  style={{ marginTop: "-1px" }}
                ></span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
