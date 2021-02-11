/*eslint-disable */
import * as React from "react";
import { useFormikContext, Field } from "formik";
import { Persist } from "formik-persist";
import classNames from "classnames";
import { ReceiverFormFields } from "./AddReceiverModal";
import { countries, countryOptions } from "./countries";
import { Button, Select, Checkbox, PhoneNumberInput } from "@transferwise-ui";

function InnerForm({ name }) {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldTouched,
    setFieldValue,
    handleSubmit
  } = useFormikContext<ReceiverFormFields>();

  const [searchValue, setSearchValue] = React.useState("");
  countries.find(o => {
    return o.name === values.country;
  });

  return (
    <div className="modal-np-body">
      <form onSubmit={handleSubmit}>
        <Persist name={name} />

        <div
          className={classNames("form-group", {
            "has-error": touched.firstName && errors.firstName
          })}
        >
          <label className="control-label">First name</label>

          <Field name="firstName">
            {({ ...field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                {...field}
              />
            )}
          </Field>

          {errors.firstName && (
            <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
              <div>{errors.firstName}</div>
            </div>
          )}
        </div>

        <div
          className={classNames("form-group", {
            "has-error": touched.middleName && errors.middleName
          })}
        >
          <label className="control-label">Middle name</label>
          <Field name="middleName">
            {({ ...field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter middle name"
                id="middleName"
                name="middleName"
                value={values.middleName}
                onChange={handleChange}
                onBlur={handleBlur}
                {...field}
              />
            )}
          </Field>

          {errors.middleName && (
            <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
              <div>{errors.middleName}</div>
            </div>
          )}
        </div>

        <div
          className={classNames("form-group", {
            "has-error": touched.lastName && errors.lastName
          })}
        >
          <label className="control-label">Last name</label>
          <Field name="lastName">
            {({ ...field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                {...field}
              />
            )}
          </Field>

          {errors.lastName && (
            <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
              <div>{errors.lastName}</div>
            </div>
          )}
        </div>

        <div
          className={classNames("form-group", {
            "has-error": touched.city && errors.city
          })}
        >
          <label className="control-label">City</label>
          <Field name="city">
            {({ ...field }) => (
              <input
                id="city"
                name="city"
                type="text"
                className="form-control"
                placeholder="Enter city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                {...field}
              />
            )}
          </Field>

          {errors.city && (
            <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
              <div>{errors.city}</div>
            </div>
          )}
        </div>

        <div
          className={classNames("form-group", {
            "has-error": touched.country && errors.country
          })}
        >
          <label className="control-label">Country</label>
          <Field name="country">
            {({ ...field }) => (
              <Select
                id="country"
                placeholder={"South Sudan"}
                required={true}
                label={"Country"}
                name={"basic-select"}
                selected={countryOptions.find(o => o.label === values.country)}
                onChange={option => {
                  const selectedCountry = countryOptions.find(o => o.value === option.value).label;
                  const countryCode = countries.find(o => o.name === selectedCountry).iso2;

                  setFieldValue("country", option.label);
                  if (countryCode == "ET") {
                    setFieldValue("bankOption", true);
                  }
                }}
                onBlur={() => setFieldTouched("country", true)}
                searchPlaceholder="Type to search..."
                onSearchChange={v => setSearchValue(v)}
                searchValue={searchValue}
                options={countryOptions.filter(
                  option => option.label && option.label.toLowerCase().indexOf(searchValue) !== -1
                )}
                {...field}
              />
            )}
          </Field>
        </div>

        <div
          className={classNames("form-group", {
            "has-error": touched.mobile && errors.mobile
          })}
        >
          <label className="control-label">Mobile</label>

          <Field name="mobile">
            {({ ...field }) => (
              <PhoneNumberInput
                placeholder="Please enter mobile"
                countryCode={values.countryCode}
                initialValue={values.mobile}
                onChange={value => {
                  setFieldValue("mobile", value);
                }}
                onBlur={() => setFieldTouched("mobile", true)}
                {...field}
              />
            )}
          </Field>

          {errors.mobile && (
            <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
              <div>{errors.mobile}</div>
            </div>
          )}
        </div>

        <div className={classNames("form-group addSecretWord1", { "has-error": false })}>
          <Field name="addSecretWord">
            {({ ...field }) => (
              <Checkbox
                // @ts-ignore
                label="Add secret word"
                onChange={value => {
                  if (!value) {
                    setFieldValue("secretWord", "");
                  }
                  setFieldValue("addSecretWord", value);
                }}
                onBlur={value => setFieldTouched("addSecretWord", true)}
                checked={values.addSecretWord}
                disabled={false}
              />
            )}
          </Field>
        </div>

        <div
          className={classNames("form-group", {
            "has-error": touched.secretWord && errors.secretWord
          })}
        >
          <label className="control-label">Secret word</label>

          <Field name="secretWord">
            {({ ...field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter secret word"
                id="secretWord"
                name="secretWord"
                value={values.secretWord}
                onChange={handleChange}
                onBlur={handleBlur}
                hidden={true}
                disabled={!values.addSecretWord}
                {...field}
              />
            )}
          </Field>

          {touched.firstName && errors.firstName && (
            <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
              <div>{errors.firstName}</div>
            </div>
          )}
        </div>

        <div className={classNames("modal-np-footer")}>
          <Button type='btn-primary' className="d" loading={false} size="md" htmlType="submit" disabled={false} label="Confirm" block>
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

export default InnerForm;
