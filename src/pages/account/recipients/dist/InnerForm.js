"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
/*eslint-disable */
var React = require("react");
var formik_1 = require("formik");
var formik_persist_1 = require("formik-persist");
var classnames_1 = require("classnames");
var countries_1 = require("./countries");
var _transferwise_ui_1 = require("@transferwise-ui");
function InnerForm(_a) {
    var name = _a.name;
    var _b = formik_1.useFormikContext(), values = _b.values, touched = _b.touched, errors = _b.errors, handleBlur = _b.handleBlur, handleChange = _b.handleChange, setFieldTouched = _b.setFieldTouched, setFieldValue = _b.setFieldValue, handleSubmit = _b.handleSubmit;
    var _c = React.useState(""), searchValue = _c[0], setSearchValue = _c[1];
    countries_1.countries.find(function (o) {
        return o.name === values.country;
    });
    return (React.createElement("div", { className: "modal-np-body" },
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement(formik_persist_1.Persist, { name: name }),
            React.createElement("div", { className: classnames_1["default"]("form-group", {
                    "has-error": touched.firstName && errors.firstName
                }) },
                React.createElement("label", { className: "control-label" }, "First name"),
                React.createElement(formik_1.Field, { name: "firstName" }, function (_a) {
                    var field = __rest(_a, []);
                    return (React.createElement("input", __assign({ type: "text", className: "form-control", placeholder: "Enter first name", id: "firstName", name: "firstName", value: values.firstName, onChange: handleChange, onBlur: handleBlur }, field)));
                }),
                errors.firstName && (React.createElement("div", { role: "alert", className: "alert alert-detach alert-danger small p-x-2 p-y-1 arrow" },
                    React.createElement("div", null, errors.firstName)))),
            React.createElement("div", { className: classnames_1["default"]("form-group", {
                    "has-error": touched.middleName && errors.middleName
                }) },
                React.createElement("label", { className: "control-label" }, "Middle name"),
                React.createElement(formik_1.Field, { name: "middleName" }, function (_a) {
                    var field = __rest(_a, []);
                    return (React.createElement("input", __assign({ type: "text", className: "form-control", placeholder: "Enter middle name", id: "middleName", name: "middleName", value: values.middleName, onChange: handleChange, onBlur: handleBlur }, field)));
                }),
                errors.middleName && (React.createElement("div", { role: "alert", className: "alert alert-detach alert-danger small p-x-2 p-y-1 arrow" },
                    React.createElement("div", null, errors.middleName)))),
            React.createElement("div", { className: classnames_1["default"]("form-group", {
                    "has-error": touched.lastName && errors.lastName
                }) },
                React.createElement("label", { className: "control-label" }, "Last name"),
                React.createElement(formik_1.Field, { name: "lastName" }, function (_a) {
                    var field = __rest(_a, []);
                    return (React.createElement("input", __assign({ type: "text", className: "form-control", placeholder: "Enter last name", id: "lastName", name: "lastName", value: values.lastName, onChange: handleChange, onBlur: handleBlur }, field)));
                }),
                errors.lastName && (React.createElement("div", { role: "alert", className: "alert alert-detach alert-danger small p-x-2 p-y-1 arrow" },
                    React.createElement("div", null, errors.lastName)))),
            React.createElement("div", { className: classnames_1["default"]("form-group", {
                    "has-error": touched.city && errors.city
                }) },
                React.createElement("label", { className: "control-label" }, "City"),
                React.createElement(formik_1.Field, { name: "city" }, function (_a) {
                    var field = __rest(_a, []);
                    return (React.createElement("input", __assign({ id: "city", name: "city", type: "text", className: "form-control", placeholder: "Enter city", value: values.city, onChange: handleChange, onBlur: handleBlur }, field)));
                }),
                errors.city && (React.createElement("div", { role: "alert", className: "alert alert-detach alert-danger small p-x-2 p-y-1 arrow" },
                    React.createElement("div", null, errors.city)))),
            React.createElement("div", { className: classnames_1["default"]("form-group", {
                    "has-error": touched.country && errors.country
                }) },
                React.createElement("label", { className: "control-label" }, "Country"),
                React.createElement(formik_1.Field, { name: "country" }, function (_a) {
                    var field = __rest(_a, []);
                    return (React.createElement(_transferwise_ui_1.Select, __assign({ id: "country", placeholder: "South Sudan", required: true, label: "Country", name: "basic-select", selected: countries_1.countryOptions.find(function (o) { return o.label === values.country; }), onChange: function (option) {
                            var selectedCountry = countries_1.countryOptions.find(function (o) { return o.value === option.value; }).label;
                            var countryCode = countries_1.countries.find(function (o) { return o.name === selectedCountry; }).iso2;
                            setFieldValue("country", option.label);
                            if (countryCode == "ET") {
                                setFieldValue("bankOption", true);
                            }
                        }, onBlur: function () { return setFieldTouched("country", true); }, searchPlaceholder: "Type to search...", onSearchChange: function (v) { return setSearchValue(v); }, searchValue: searchValue, options: countries_1.countryOptions.filter(function (option) { return option.label && option.label.toLowerCase().indexOf(searchValue) !== -1; }) }, field)));
                })),
            React.createElement("div", { className: classnames_1["default"]("form-group", {
                    "has-error": touched.mobile && errors.mobile
                }) },
                React.createElement("label", { className: "control-label" }, "Mobile"),
                React.createElement(formik_1.Field, { name: "mobile" }, function (_a) {
                    var field = __rest(_a, []);
                    return (React.createElement(_transferwise_ui_1.PhoneNumberInput, __assign({ placeholder: "Please enter mobile", countryCode: values.countryCode, initialValue: values.mobile, onChange: function (value) {
                            setFieldValue("mobile", value);
                        }, onBlur: function () { return setFieldTouched("mobile", true); } }, field)));
                }),
                errors.mobile && (React.createElement("div", { role: "alert", className: "alert alert-detach alert-danger small p-x-2 p-y-1 arrow" },
                    React.createElement("div", null, errors.mobile)))),
            React.createElement("div", { className: classnames_1["default"]("form-group addSecretWord1", { "has-error": false }) },
                React.createElement(formik_1.Field, { name: "addSecretWord" }, function (_a) {
                    var field = __rest(_a, []);
                    return (React.createElement(_transferwise_ui_1.Checkbox
                    // @ts-ignore
                    , { 
                        // @ts-ignore
                        label: "Add secret word", onChange: function (value) {
                            if (!value) {
                                setFieldValue("secretWord", "");
                            }
                            setFieldValue("addSecretWord", value);
                        }, onBlur: function (value) { return setFieldTouched("addSecretWord", true); }, checked: values.addSecretWord, disabled: false }));
                })),
            React.createElement("div", { className: classnames_1["default"]("form-group", {
                    "has-error": touched.secretWord && errors.secretWord
                }) },
                React.createElement("label", { className: "control-label" }, "Secret word"),
                React.createElement(formik_1.Field, { name: "secretWord" }, function (_a) {
                    var field = __rest(_a, []);
                    return (React.createElement("input", __assign({ type: "text", className: "form-control", placeholder: "Enter secret word", id: "secretWord", name: "secretWord", value: values.secretWord, onChange: handleChange, onBlur: handleBlur, hidden: true, disabled: !values.addSecretWord }, field)));
                }),
                touched.firstName && errors.firstName && (React.createElement("div", { role: "alert", className: "alert alert-detach alert-danger small p-x-2 p-y-1 arrow" },
                    React.createElement("div", null, errors.firstName)))),
            React.createElement("div", { className: classnames_1["default"]("modal-np-footer") },
                React.createElement(_transferwise_ui_1.Button, { type: 'btn-primary', className: "d", loading: false, size: "md", htmlType: "submit", disabled: false, label: "Confirm", block: true }, "Confirm")))));
}
exports["default"] = InnerForm;
