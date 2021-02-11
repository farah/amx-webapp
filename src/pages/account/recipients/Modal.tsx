import React, { useRef } from "react";
import classNames from "classnames";
import CSSTransition from "react-transition-group/CSSTransition";
import KEY_CODES from "@transferwise-ui/common/keyCodes";

import { Cross as Close  } from '@transferwise/icons';
import Dimmer from "components/Dimmer";

type Props = {
  children?: any;
  open: any;
  onClose: any;
  title: any;
  footer?: any;
  name?: any;
};

function Modal({ children, open, onClose, title, footer, name }: Props) {
  const refModal = useRef(null);

  const onEscape = event => {
    if (event && (event.keyCode === KEY_CODES.ESCAPE || event.key === "Escape") && onClose) {
      onClose(event);
    }
  };

  const handleOnClick = event => {
    // Prevents the onclick to be fired by children.
    if (event.target === event.currentTarget) {
      onClose(event);
    }
  };

  return (
    <Dimmer open={open}>
      <CSSTransition appear in={open} classNames={{ enterDone: "in" }} timeout={150} unmountOnExit>
        <div
          className={`modal-np fade`}
          tabIndex={-1}
          role="button"
          ref={refModal}
          onKeyDown={onEscape}
          onClick={handleOnClick}
        >
          <div className={" modal-dialog modal-np-dialog-custom"} role="dialog">
            <div className={classNames("modal-np-content")}>
              <div className={classNames("modal-np-header")}>
                <h4 className="modal-np-title">{title}</h4>
                <button type="button" onClick={onClose} className="close">
                  <Close />
                </button>
              </div>

              {children}
              {footer && (
                <div
                  className={classNames("modal-np-footer", {
                    "modal--withoutborder": true
                  })}
                >
                  {footer}
                </div>
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </Dimmer>
  );
}

export default Modal;
