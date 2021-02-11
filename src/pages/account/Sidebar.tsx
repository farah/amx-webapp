import { NavLink, Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import Logo from "components/Logo";

type Props = {
  onSendMoney: any;
  isTablet: boolean;
  isMobile: boolean;
  isDesktop: boolean;
};

function Sidebar({ onSendMoney, isTablet, isMobile, isDesktop }: Props) {
  const { pathname } = useLocation();

  const recipientsPage = pathname === "/account/recipients";
  const style = {
    position: recipientsPage ? "relative" : "",
    width: recipientsPage ? "unset" : ""
  };
  return (
    <>
      <div className="sidebar-toggle-button toggle-button--sticky">
        <div className="sidebar-toggle sidebar-toggle-container">
          <button
            type="button"
            className="navbar-toggle visible-xs-block visible-sm-block visible-md-block"
            aria-expanded="false"
          >
            <span className="sr-only">
              <span>Toggle navigation</span>
            </span>
            <span className="pull-xs-left m-r-1">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </span>
          </button>
        </div>
      </div>
      <div className="sidebar-container column-layout-left bg-primary ">
        <div className="column-layout-top">
          <div className="sidebar-brand column-layout-brand">
            <a className="logo navbar-logo logo-inverse" style={{ marginBottom: "29px" }}>
              <Logo />
            </a>
          </div>
          <div className="sidebar-cta column-layout-cta p-l-4 p-r-4">
            <button onClick={onSendMoney} className="btn btn-sm btn-block btn-success">
              <span>Send money</span>
            </button>
          </div>
          <div className="sidebar">
            <ul id="menu-content" className="nav nav-stacked nav-inverse m-b-2">
              <li className={`sidebar-list-item ${pathname === "/account" ? "active" : ""}`}>
                <Link to="/account" className="main-nav-items">
                  <span className="main-nav-items__icon">
                    <span className="tw-icon tw-icon-home " aria-hidden="true" role="presentation">
                      <svg width="16" height="16" fill="currentColor" focusable="false">
                        <path d="M16 6.4L8 0 0 6.4l1 1.25 7-5.601 7 5.6 1-1.25zM3.8 9v5.2h8.4V9h1.6v6.8H2.2V9h1.6z"></path>
                      </svg>
                    </span>
                  </span>
                  <span>Home</span>
                </Link>
              </li>
              <li className="sidebar-list-item ">
                <Link
                  to="/account/recipients"
                  className={`main-nav-items ${pathname === "/account/recipients" ? "active" : ""}`}
                >
                  <span className="main-nav-items__icon">
                    <span className="tw-icon tw-icon-recipients " aria-hidden="true" role="presentation">
                      <svg width="16" height="16" fill="currentColor" focusable="false">
                        <path d="M9.5.2A3.3 3.3 0 006.56 2a4.483 4.483 0 011.687.352 1.7 1.7 0 112.402 2.402c.219.52.343 1.089.35 1.686A3.3 3.3 0 009.5.2zM13.077 10.719c-.9-.46-2.13-.906-3.518-.919a4.511 4.511 0 001.076-1.523c1.263.171 2.353.6 3.17 1.017 1.387.708 1.995 2.175 1.995 3.558V13h-1.6v-.148c0-.966-.417-1.773-1.123-2.133z"></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.2 6.5a3.3 3.3 0 116.6 0 3.3 3.3 0 01-6.6 0zm3.3-1.7a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4z"
                        ></path>
                        <path d="M10.805 12.294C9.752 11.756 8.245 11.2 6.5 11.2c-1.745 0-3.252.556-4.305 1.094C.808 13.002.2 14.469.2 15.852V16h1.6v-.148c0-.966.417-1.773 1.123-2.133.913-.467 2.166-.919 3.577-.919s2.664.452 3.577.919c.706.36 1.123 1.167 1.123 2.133V16h1.6v-.148c0-1.383-.608-2.85-1.995-3.558z"></path>
                      </svg>
                    </span>
                  </span>
                  <span>Recipients</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
