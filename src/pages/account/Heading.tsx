import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "contexts/Firebase";
import { useNavigate } from "react-router-dom";
import { Loader } from "@transferwise-ui";


interface Props {
  isMobile: boolean;
  isTablet: boolean;
  onClickBack: any;
  isDesktop: boolean;
}

function Heading({ onClickBack, isMobile, isTablet, isDesktop }: Props) {
  const { logout, authResult } = useAuth();
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  let navigate = useNavigate();

  const recipientsPage = pathname === "/account/recipients";
  return (
    <nav
      className={`titlebar navbar navbar-default m-b-0 simple-nav fixed-top__title-bar ${
        isDesktop ? "navbar-mobile--with-title" : ""
      }`}
      style={{ position: recipientsPage ? "relative" : "fixed", width: recipientsPage ? "unset" : "" }}
    >
      <div className="container navbar-container m-l-0 p-t-0">
        <div className="header-container">
          <div className="text-container">
            <h1 className="navbar-title">{recipientsPage ? 'Recipients' : 'Home'}</h1>
          </div>
        </div>
        
        
        
        <ul onClick={() => setOpen(!open)} className="nav navbar-nav profile-selector--mobile-web navbar-right">
        { !authResult ? <Loader small={false} size={Loader.Size.EXTRA_SMALL} /> : (<li className={`${open ? "open" : ""}`}>
            <a role="button" aria-expanded="true" className="profile-name">
              <span className="sr-only">
                <span>Profile button</span>
              </span>
              <div className="circle circle-inverse circle__user-avatar">
                <img
                  src={authResult.photoURL}
                  alt="abdi farah"
                  className="profile-name__avatar--img"
                />
              </div>
              <h5 className="hidden-xs hidden-sm hidden-md m-l-1">{authResult.displayName}</h5>
              <span
                className={`tw-icon tw-icon-chevron-up tw-chevron chevron-color ${open ? "top m-l-1" : "bottom m-l-1"}`}
                aria-hidden="true"
                role="presentation"
              >
                <svg width="16" height="16" fill="currentColor" focusable="false">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4l-6.6 6.653L2.537 11.8 8 6.293l5.463 5.507 1.137-1.147L8 4z"
                  ></path>
                </svg>
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-overlay dropdown-menu-md dropdown-menu-profile dropdown-menu-xs-left">
              <button
                onClick={() => {
                  onClickBack(null);
                }}
                type="button"
                className="btn-link anchor text-info text-no-decoration p-a-0 m-l-1 overlay-back-button"
              >
                <span className="tw-icon tw-icon-arrow-left " aria-hidden="true" role="presentation">
                  <svg width="24" height="24" fill="currentColor" focusable="false">
                    <path d="M5.814 13H22v-2H5.814l6.893-6.893L11.293 2.7 2 12l9.293 9.3 1.414-1.407L5.814 13z"></path>
                  </svg>
                </span>
              </button>
              <li className="dropdown-header">
                <div className="m-t-1 hidden-xs"></div>
                <div>
                  <h5 className="hidden-xs m-b-0 text-primary text-ellipsis">{authResult.displayName}</h5>
                  <h2 className="visible-xs-block text-primary m-b-0 text-ellipsis">{authResult.displayName}</h2>
                  <h6>
                    <span>Membership number P14627282</span>
                  </h6>
                </div>
              </li>
              <li className="divider m-y-1"></li>
              <li className="profile-dropdown__primary-item">
                <a className="menu-item">
                  <span className="tw-icon tw-icon-settings " aria-hidden="true" role="presentation"></span>
                  <h5>
                    <span>Help</span>
                  </h5>
                </a>
              </li>
              <li
                onClick={() => {
                  logout();
                  navigate('/login')
                }}
                className="profile-dropdown__primary-item"
              >
                <a className="menu-item">
                  <span className="tw-icon tw-icon-log-out " aria-hidden="true" role="presentation"></span>
                  <h5>
                    <span>Log out</span>
                  </h5>
                </a>
              </li>
              <li className="divider m-t-2 m-b-1"></li>
            </ul>
          </li>) }
        </ul>
      
      
      
      
      
      
      
      
      </div>
    </nav>
  );
}

export default Heading;
