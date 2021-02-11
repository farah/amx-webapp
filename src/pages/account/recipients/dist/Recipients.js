"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var Firebase_1 = require("contexts/Firebase");
var receiverSlice_1 = require("store/receiver/receiverSlice");
var AddReceiverModal_1 = require("./AddReceiverModal");
var ReceiverList_1 = require("./ReceiverList");
var PreloadAccountIndicator_1 = require("./PreloadAccountIndicator");
function Recipients(_a) {
    var _this = this;
    var receivers = _a.receivers;
    var dispatch = react_redux_1.useDispatch();
    var userId = Firebase_1.useAuth().userId;
    var _b = react_1["default"].useState(false), open = _b[0], setOpen = _b[1];
    var _c = react_1["default"].useState(null), selectedReceiverId = _c[0], setSelectedReceiver = _c[1];
    var user = react_redux_1.useSelector(function (state) { return state.user; });
    var fetchingReceivers = react_redux_1.useSelector(function (state) { return state.receivers; }).fetchingReceivers;
    var _d = react_redux_1.useSelector(function (state) { return state.order; }), fetchingOrders = _d.fetchingOrders, orders = _d.orders;
    var handleAdd = function (event) {
        if (event.target === event.currentTarget) {
            setOpen(true);
        }
    };
    var handleClose = function () {
        setOpen(false);
    };
    var handleSelectReceiver = function (id) {
        var ordersId = id !== selectedReceiverId ? id : null;
        setSelectedReceiver(ordersId);
    };
    var handleDeleteReceiver = function (receiverId) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    
                    return [4 /*yield*/, dispatch(receiverSlice_1.deleteReceiver({ userId: userId, receiverId: receiverId }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(AddReceiverModal_1["default"], { name: "createReceiver", title: "Add receiver", open: open, onClose: handleClose }),
        react_1["default"].createElement("div", { className: "nav-toolbar" },
            react_1["default"].createElement("div", { className: "container m-l-0" },
                react_1["default"].createElement("div", { className: "row" },
                    react_1["default"].createElement("div", { className: "action-buttons m-b-2 col-xs-12 col-sm-8 col-md-9" },
                        "\u00A0",
                        react_1["default"].createElement("button", { onClick: function (e) { return handleAdd(e); }, type: "button", className: "btn btn-sm np-btn np-btn-sm btn-default" }, "Add a recipient")),
                    receivers.filter(function (receiver) { return receiver.visible; }).length > 4 && (react_1["default"].createElement("div", { className: "m-b-2 col-xs-12 col-sm-4 col-md-3" },
                        react_1["default"].createElement("div", { className: "input-group input-group-sm" },
                            react_1["default"].createElement("input", { type: "text", className: "search-input form-control", placeholder: "Search...", value: "" }),
                            react_1["default"].createElement("span", { className: "input-group-addon" },
                                react_1["default"].createElement("span", { className: "tw-icon tw-icon-search ", "aria-hidden": "true", role: "presentation" },
                                    react_1["default"].createElement("svg", { width: "16", height: "16", fill: "currentColor" },
                                        react_1["default"].createElement("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.35 12.484a7 7 0 111.133-1.133l3.517 3.508L14.86 16l-3.51-3.515zM12.4 7A5.4 5.4 0 111.6 7a5.4 5.4 0 0110.8 0z" })))))))))),
        user.loading === "pending" ||
            fetchingReceivers === "pending" ||
            fetchingOrders === "pending" ||
            !receivers ||
            !orders ? (react_1["default"].createElement(PreloadAccountIndicator_1["default"], null)) : (react_1["default"].createElement("div", { className: "container" },
            react_1["default"].createElement("div", { className: "panel panel-default" },
                react_1["default"].createElement("div", { className: "panel-heading" },
                    react_1["default"].createElement("h3", { className: "panel-title h6" }, "Your recipients")),
                react_1["default"].createElement(ReceiverList_1["default"], { receivers: receivers, selectedReceiverId: selectedReceiverId, onSelectReceiver: handleSelectReceiver, onDeleteReceiver: handleDeleteReceiver }))))));
}
exports["default"] = Recipients;
