import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "components/Logo";
import { useAuth } from "contexts/Firebase";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
  color: ${props => props.color};
`;

interface Props {
  color?: any;
}
const Header: React.FC<Props> = ({ color }) => {
  const [open, setOpen] = React.useState(false);

  const toggleMobile = () => {
    setOpen(!open);
  };

  const closeMobile = () => {
    setOpen(false);
  };

  const { authUser } = useAuth();

  return (
    <header className="globalNav initialized noDropdownTransition">
      <div className="container-lg">
        <nav>
          <ul onBlur={toggleMobile} className="navRoot">
            <li className="navSection logo">
              <Logo />
            </li>

            <li className="navSection secondary">
              {authUser ? (
                <>
                 <StyledLink className="rootLink item-support" color={color} to="/contact">
                  <span>Support</span>
                </StyledLink>
                <StyledLink className="rootLink item-support" color={color} to="/transfer">
                  <span>Dashboard</span>
                </StyledLink>

                </>
              ) : (
                <>
                <StyledLink className="rootLink item-support" color={color} to="/contact">
                  <span>Support</span>
                </StyledLink>
                <StyledLink className="rootLink item-support" color={color} to="/login">
                  <span>Login</span>
                </StyledLink>
                </>
              )}
            </li>
            <li
              onBlur={closeMobile}
              className={`navSection mobile ${open ? "globalPopupActive" : ""}`}
            >
              <a
                className={`rootLink item-mobileMenu colorize`}
                onBlur={toggleMobile}
                onClick={toggleMobile}
              >
                <h2>Menu</h2>
              </a>
              <div className="popup">
                <div className="popupContainer">
                  <a onClick={toggleMobile} className="popupCloseButton">
                    Close
                  </a>
                  <div className="mobileProducts">
                    <h4>Pages</h4>
                  </div>
                  <div className="mobileSecondaryNav">
                    <ul>
                      <li>
                        <Link className="linkContainer item-enterprise" to="/locations">
                          Locations
                        </Link>
                      </li>
                      <li>
                        {authUser ? (
                          <Link className="item-workswith" to="/transfer">
                            Dashboard
                          </Link>
                        ) : (
                          <Link className="item-workswith" to="/contact">
                            Support
                          </Link>
                        )}
                      </li>
                    </ul>
                  </div>

                  <Link className="mobileSignIn" to="/login">
                  Sign in
                          </Link>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
