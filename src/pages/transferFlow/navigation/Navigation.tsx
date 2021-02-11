/* eslint-disable*/
import React from "react";
import Types from "prop-types";
import classNames from "classnames";
import Stepper from "./Stepper";
import { useAuth } from "contexts/Firebase";
import Logo from "components/Logo";
import { Loader } from "@transferwise-ui";

const ProfileType = {
  BUSINESS: "BUSINESS",
  PERSONAL: "PERSONAL"
};

const Navigation: React.FC<any> = ({
  steps,
  activeStep,
  avatarUrl,
  done,
  profileType,
  onClose,
  onClickLabel,
  pathname,
  onClickClose,
  on
}) => {

  const { authUser, authResult } = useAuth();
  return (
    <nav className="amx-shared-css">
      <div className="tw-flow-navigation tw-flow-navigation__wrapper">
        <div className="container">
          <div className="row p-t-3 ">
            <div className="col-lg-2 col-xs-6">
              <div className="m-lg-t-1">
                <div className="logo logo-3 hidden-xs logo-primary"></div>
                <Logo width={125} />
                <button
                  type="button"
                  className="btn-unstyled visible-xs tw-flow-navigation__back-button tw-flow-navigation__back-button--hidden"
                >
                  <div className="tw-flow-navigation__back-arrow">
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="m-t-1"
                    >
                      <title>ICON: Back</title>
                      <path d="M0 8l8-8 1.5 1.5L4 7h16v2H4l5.5 5.5L8 16" fill="#00B9FF" fillRule="evenodd"></path>
                    </svg>
                  </div>
                  <span
                    className="tw-flow-navigation__back-text tw-flow-navigation__back-text-enter-done"
                    aria-hidden="false"
                  >
                    Review
                  </span>
                </button>
              </div>
            </div>
            <div className="col-lg-2 col-xs-6 col-lg-push-8 text-xs-right">
              <div className="tw-flow-navigation__right-content m-lg-t-1">
              { !authResult ? <Loader small={false} size={Loader.Size.EXTRA_SMALL} /> : (<div className="tw-avatar tw-avatar--md tw-avatar--thumbnail tw-avatar--light">
                  <div className="tw-avatar__content">
                    <img
                      src={authUser.photoURL}
                      alt="avatar"
                    />
                  </div>
                </div>)}
                <button
                  onClick={onClickClose}
                  type="button"
                  className="tw-close-button btn-link text-no-decoration m-l-3 close-button-with-avatar"
                  aria-label="Close"
                >
                  <span className="tw-icon tw-icon-cross " aria-hidden="true" role="presentation">
                    <svg width="24" height="24" fill="currentColor">
                      <path d="M12 13.414l7.293 7.293 1.414-1.414L13.414 12l7.293-7.293-1.414-1.414L12 10.586 4.707 3.293 3.293 4.707 10.586 12l-7.293 7.293 1.414 1.414L12 13.414z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="col-xs-12 col-lg-6 col-lg-pull-2 col-lg-offset-1 p-x-0">
              <div className="tw-flow-navigation__stepper m-lg-t-1">
                <Stepper pathname={pathname} steps={steps} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navigation.defaultProps = {
  activeStep: 0,
  avatarUrl: "",
  done: false,
  profileType: ProfileType.PERSONAL,
  onGoBack: null,
  onClose: null,
  onChangeFlow: null
};

Navigation.propTypes = {
  steps: Types.arrayOf(
    Types.shape({
      label: Types.string.isRequired,
      onClick: Types.func,
      hoverLabel: Types.node
    })
  ).isRequired,
  activeStep: Types.number,
  avatarUrl: Types.string,
  done: Types.bool,
  profileType: Types.oneOf(Object.keys(ProfileType)),
  onGoBack: Types.func,
  onClose: Types.func,
  onClickLabel: Types.func,
  onChangeFlow: Types.func
};

export default Navigation;
