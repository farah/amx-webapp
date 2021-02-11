"use strict";
exports.__esModule = true;
var ReceiverItem_1 = require("./ReceiverItem");
function ReceiverList(_a) {
    var receivers = _a.receivers, selectedReceiverId = _a.selectedReceiverId, onSelectReceiver = _a.onSelectReceiver, onDeleteReceiver = _a.onDeleteReceiver;
    var activeClass = "TrackingItem-module_active__383Xc TrackingItem-module_success__35RX1";
    return (React.createElement(React.Fragment, null,
        React.createElement("ul", { className: "list-group list-group-inactive" }, receivers.filter(function (receiver) { return receiver.visible; }).map(function (receiver) { return (React.createElement(ReceiverItem_1["default"], { receiver: receiver, selectedReceiverId: selectedReceiverId, onSelectReceiver: function () { return onSelectReceiver(receiver.id); }, onDeleteReceiver: function () { return onDeleteReceiver(receiver.id); } })); }))));
}
exports["default"] = ReceiverList;
