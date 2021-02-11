import React, { useEffect } from "react";
import Types from "prop-types";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { createPortal } from "react-dom";
import "./Dimmer.css";

const MODAL_OPEN_BODY_CLASS = "modal-open";

export function addModalOpenBodyClass() {
  document.body.classList.add(MODAL_OPEN_BODY_CLASS);
}

export function removeModalOpenBodyClass() {
  document.body.classList.remove(MODAL_OPEN_BODY_CLASS);
}

export const EXIT_ANIMATION = 350;

type Props = {
  open?: any;
  children?: any;
  onClose?: any;
  fadeContentOnExit?: any;
  fadeContentOnEnter?: any;
};

const Dimmer: React.FC<Props> = ({
  open,
  children,
  onClose,
  fadeContentOnExit,
  fadeContentOnEnter
}) => {
  useEffect(() => {
    return () => cleanup();
  }, []);

  const handleOnEnter = () => {
    addModalOpenBodyClass();
  };

  const handleOnClick = event => {
    // Prevents the onclick to be fired by children.
    if (event.target === event.currentTarget) {
      handleOnClose(event);
    }
  };

  const handleOnClose = event => {
    cleanup();
    if (onClose) {
      onClose(event);
    }
  };

  const cleanup = () => {
    removeModalOpenBodyClass();
  };

  return (
    <CSSTransition
      in={open}
      appear
      // Wait for animation to finish before unmount.
      timeout={{ enter: 0, exit: EXIT_ANIMATION }}
      onEnter={handleOnEnter}
      // @ts-ignore
      onExited={e => {
        handleOnClose(e);
      }}
      classNames={{
        enter: classNames({ "dimmer--enter-fade": fadeContentOnEnter }),
        enterDone: classNames("dimmer--enter-done", {
          "dimmer--enter-fade": fadeContentOnEnter
        }),
        exit: classNames("dimmer--exit", { "dimmer--exit-fade": fadeContentOnExit })
      }}
      unmountOnExit
    >
      <div role="presentation" className="dimmer" onClick={handleOnClick}>
        {children}
      </div>
    </CSSTransition>
  );
};

Dimmer.defaultProps = {
  open: false,
  children: null,
  onClose: null,
  fadeContentOnExit: false,
  fadeContentOnEnter: false
};

export default Dimmer;
