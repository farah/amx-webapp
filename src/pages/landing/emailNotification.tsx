import React from "react";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./emailNotification.scss";

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

const EmailNotification: React.FC<any> = () => {
  const [submitted, setSubmit] = React.useState(false);

  const initialValues = {
    email: ""
  };

  const handleSubmit = async values => {
    const { email } = values;
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getDate() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getFullYear();

    try {
      await firebase
        .firestore()
        .collection("emailList")
        .add({ email, createdAt: firebase.firestore.Timestamp.fromDate(new Date()) });
      setSubmit(true);
    } catch (e) {
      console.error("Error adding email document: ", e);
    }
  };

  return (
    <Formik
      validationSchema={EmailSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={props => (
        <>
          <section className="collect-email">
            <div className="mask-container container-lg">
              <div
                className={`collect-email-partial ${submitted ? "form-submitted" : ""}`}
              >
                <div className="intro-copy column">
                  <div className="collect-header">
                    <p className="common-UppercaseText">
                      Interested in updates about new services?
                    </p>
                    <p className="common-BodyText">
                      Get updates about new Amal Express services and locations.
                    </p>
                  </div>

                  <Form className="collect-form">
                    <Field name="email">
                      {({ field, form: { touched, errors }, meta }) => {
                        return (
                          <div
                            className={`collect-input email ${
                              touched.email ? "active" : ""
                            }`}
                          >
                            <input
                              className={`email-field ${
                                errors.email && touched.email ? "invalid-value" : ""
                              }`}
                              type="email"
                              name="email"
                              required
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              value={field.value}
                              placeholder="Enter your email"
                            />
                            <button
                              type="submit"
                              className={`common-Button common-Button--default  ${
                                props.errors.email ? "common-Button--disabled" : ""
                              }`}
                            >
                              Get updates
                            </button>
                          </div>
                        );
                      }}
                    </Field>

                    <p className="collect-error email">
                      Please enter a valid email address.
                    </p>
                    <p className="collect-error connection">
                      You might have had an internet hiccup. Try again?
                    </p>
                  </Form>
                </div>

                <div className="collect-success column">
                  <img className="icon" src="/img/success.svg" alt="Green checkmark" />
                  <h3 className="common-BodyTitle">Thank you!</h3>
                  <p className="common-BodyText">
                    We sent an email to&nbsp;
                    <span className="collected-email">{props.values.email}</span>
                  </p>
                  <p className="common-BodyText"></p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    />
  );
};

export default EmailNotification;
