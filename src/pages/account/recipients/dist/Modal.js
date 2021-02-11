"use strict";
exports.__esModule = true;
var react_1 = require("react");
var classnames_1 = require("classnames");
var CSSTransition_1 = require("react-transition-group/CSSTransition");
var keyCodes_1 = require("@transferwise-ui/common/keyCodes");
var icons_1 = require("@transferwise/icons");
var Dimmer_1 = require("components/Dimmer");
function Modal(_a) {
    var children = _a.children, open = _a.open, onClose = _a.onClose, title = _a.title, footer = _a.footer, name = _a.name;
    var refModal = react_1.useRef(null);
    var onEscape = function (event) {
        if (event && (event.keyCode === keyCodes_1["default"].ESCAPE || event.key === "Escape") && onClose) {
            onClose(event);
        }
    };
    var handleOnClick = function (event) {
        // Prevents the onclick to be fired by children.
        if (event.target === event.currentTarget) {
            onClose(event);
        }
    };
    return (react_1["default"].createElement(Dimmer_1["default"], { open: open },
        react_1["default"].createElement(CSSTransition_1["default"], { appear: true, "in": open, classNames: { enterDone: "in" }, timeout: 150, unmountOnExit: true },
            react_1["default"].createElement("div", { className: "modal-np fade", tabIndex: -1, role: "button", ref: refModal, onKeyDown: onEscape, onClick: handleOnClick },
                react_1["default"].createElement("div", { className: " modal-dialog modal-np-dialog-custom", role: "dialog" },
                    react_1["default"].createElement("div", { className: classnames_1["default"]("modal-np-content") },
                        react_1["default"].createElement("div", { className: classnames_1["default"]("modal-np-header") },
                            react_1["default"].createElement("h4", { className: "modal-np-title" }, title),
                            react_1["default"].createElement("button", { type: "button", onClick: onClose, className: "close" },
                                react_1["default"].createElement(icons_1.Cross, null))),
                        children,
                        footer && (react_1["default"].createElement("div", { className: classnames_1["default"]("modal-np-footer", {
                                "modal--withoutborder": true
                            }) }, footer))))))));
}
exports["default"] = Modal;
