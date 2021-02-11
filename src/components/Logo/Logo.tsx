import React from "react";
import { Link } from "react-router-dom";

interface Props {
  width?: number;
}
const Logo = ({ width = 142 }: Props) => {
  return (
    <Link to="/">
      <div
        className="PressableCore PressableCore--radius--all PressableCore--width PressableCore--width--auto Box-root Flex-inlineFlex"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px"
        }}
      >
        <div className="PressableCore-base Box-root">
          <div aria-label="Stripe" className="UnstyledLink">
            <div style={{padding: '0px'}} className="Box-root Margin-horizontal--8 Padding-horizontal--48 Padding-vertical--16">
              <div className="SVGInline SVGInline--cleaned SVG Logo Icon-color Icon-color--blue500 Box-root Flex-flex">
                <img
                  style={{ width  }}
                  src="/amx2.png"
                  alt="my image"
                  className="visible-mobile"
                />

                <img
                  style={{ width: "170px" }}
                  src="/amx2.png"
                  alt="my image"
                  className="hidden-mobile"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="PressableCore-overlay PressableCore-overlay--extendBy1 Box-root Box-background--white"></div>
      </div>
    </Link>
  );
};

export default Logo;
