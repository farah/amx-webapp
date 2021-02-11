import * as React from "react";
import { Form, Field, useField } from "formik";

const InputField: React.FC<{
  name: string;
  type: string;
  placeholder: string;
  validate?: (arg0: string) => string | undefined;
}> = ({ name, type, placeholder, validate }) => {
  const [field, meta] = useField<string>({ name, validate });

  return (
    <input
      className={meta.touched && meta.error ? "invalid-missing " : ""}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
    />
  );
};

export const ContactForm: React.FC<any> = ({ firebase }) => {
  return (
    <div>
      <Form>
        <input type="hidden" name="csrf-token" value="1" />
        <fieldset>
          <input type="hidden" value="" name="analytics_event_id" />
          <div className="form-row select country">
            <label className="country">Country</label>
            <div className="select-wrapper">
              <select
                id="country"
                name="country"
                data-searchable-select-input-placeholder="Search..."
                data-searchable-select-no-results-message="No countries found."
                className="has-value"
              >
                <option>Australia</option>
              </select>
              <div className="searchable-select-container"></div>
            </div>
          </div>
          <div className="form-row text firstname">
            <label className="firstname">Your first name</label>
            <InputField name="firstName" type="text" placeholder="Yasin" />
          </div>
          <div className="form-row text lastname">
            <label className="lastname">Your last name</label>
            <InputField name="lastName" type="text" placeholder="Farah" />
          </div>
          <div className="form-row text email">
            <label className="email">Your mobile</label>
            <InputField name="mobile" type="text" placeholder="0402222222" />
          </div>
          <div className="form-row text email">
            <label className="email">Your email</label>
            <InputField name="email" type="text" placeholder="name@example.com" />
          </div>
          <div className="form-row textarea">
            <label className="volume contains-summary">message</label>

            <Field name="message">
              {({ field, form: { touched, errors }, meta }) => (
                <div>
                  <textarea
                    className={
                      errors.message && touched.message ? "invalid-missing " : ""
                    }
                    name="message"
                    required
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    placeholder="Please write us your message"
                    {...field}
                  ></textarea>
                </div>
              )}
            </Field>
          </div>
        </fieldset>
        <div className="submit-row">
          <div className="error">
            <span>
              Something went wrong on our end. Sorry about that. You can still contact us
              at <a className="common-Link">support@amal.express</a>.
            </span>
          </div>
          <figure className="spinner">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="spinner-svg"
            >
              <ellipse
                cx="12"
                cy="12"
                rx="10"
                ry="10"
                className="spinner-ellipse"
              ></ellipse>
            </svg>
          </figure>
          <input
            type="submit"
            className="submit-button common-Button common-Button--default"
            value="Send"
          />
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
