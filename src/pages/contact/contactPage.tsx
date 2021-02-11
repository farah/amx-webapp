import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import Header from "components/Header";
import ContactForm from "./contactForm";

const ContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  mobile: Yup.string()
    .min(2, "Too Short!")
    .required("Required"),
  message: Yup.string()
    .min(2, "Too Short!")
    .required("Required")
});

export const ContactUs = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: ""
  };

  const saveForm = async fields => {
    try {
      await firebase
        .firestore()
        .collection("contactMessages")
        .add({ ...fields, createdAt: firebase.firestore.Timestamp.fromDate(new Date()) });
    } catch (e) {
      console.error("Error adding messages document: ", e);
    }
  };

  const [submitted, setSubmit] = React.useState(false);
  return (
    <Formik
      validationSchema={ContactSchema}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        saveForm(values);
        setSubmit(true);
      }}
      render={props => (
        <>
          <Header />
          <div id="contact-page" className="globalContent">
            <main className={submitted ? "form-submitted" : ""}>
              <div className="gradient-background"></div>
              <section className="contact-sales-header">
                <div className="stripes-container initial">
                  <div className="stripe s2"></div>
                  <div className="stripe s3"></div>
                  <div className="stripe s4"></div>
                  <div className="stripe s5"></div>
                  <div className="stripe s7"></div>
                  <div className="stripe gradient"></div>
                  <div className="stripe s1"></div>
                  <div className="stripe s6"></div>
                  <div className="left-dots-container"></div>
                  <div className="light-dots-container"></div>
                  <div className="dark-dots-container"></div>
                  <div className="medium-dots-container"></div>
                </div>
                <div className="headline">
                  <div className="container-lg">
                    <h1 className="headline-text">Contact us</h1>
                    <h2 className="common-IntroText">
                      Our team is happy to answer your questions. Fill out the form and
                      we’ll be in touch as soon as possible.
                    </h2>
                  </div>
                </div>
              </section>
              <section className="form-section">
                <div className="container-lg">
                  <div className="form-column">
                    <div className="form-container">
                      <ContactForm firebase={firebase} />
                    </div>
                  </div>
                </div>
              </section>
              <section className="ctas">
                <div className="container-lg">
                  <div className="cta general-queries">
                    <div className="icon-column">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                      >
                        <g fill="none" fillRule="evenodd" transform="translate(0 2)">
                          <path
                            fill="#5357AA"
                            d="M23.3687586,30.1425368 C20.9219925,32.1886371 17.7706231,33.4201682 14.3316134,33.4201682 C11.6954209,33.4201682 9.22824798,32.6965111 7.11790903,31.4370107 L0.720671335,33.5694159 C0.184840538,33.7480255 -0.0887912638,33.4605854 0.0863663199,32.9351109 L2.21876868,26.5378816 C0.959266296,24.4275489 0.235608095,21.9603837 0.235608095,19.3241995 C0.235608095,11.8043462 6.12405444,5.6598097 13.5415258,5.25 C11.8174159,7.83464563 10.8124059,10.939934 10.8124059,14.279955 C10.8124059,21.9925795 16.1713145,28.4535638 23.3687608,30.1425372 Z"
                          ></path>
                          <path
                            fill="#FFF"
                            d="M39.33385,21.3096508 C40.5933524,19.1993181 41.3170106,16.7321529 41.3170106,14.0959687 C41.3170106,6.31098016 35.0060141,1.77635684e-14 27.2210053,1.77635684e-14 C19.4359965,1.77635684e-14 13.125,6.31098016 13.125,14.0959687 C13.125,21.8809573 19.4359965,28.1919374 27.2210053,28.1919374 C29.8571978,28.1919374 32.3243707,27.4682803 34.4347097,26.2087798 L40.8319474,28.341185 C41.3677782,28.5197947 41.64141,28.2323546 41.4662524,27.70688 L39.33385,21.3096508 Z"
                          ></path>
                          <ellipse
                            cx="22.313"
                            cy="16.188"
                            fill="#5357AA"
                            rx="1.313"
                            ry="1.313"
                          ></ellipse>
                          <ellipse
                            cx="27.125"
                            cy="16.188"
                            fill="#5357AA"
                            rx="1.313"
                            ry="1.313"
                          ></ellipse>
                          <ellipse
                            cx="31.938"
                            cy="16.188"
                            fill="#5357AA"
                            rx="1.313"
                            ry="1.313"
                          ></ellipse>
                        </g>
                      </svg>
                    </div>
                    <div className="copy-column">
                      <h4 className="cta-headline">General communication</h4>
                      <p className="cta-copy">
                        <span className="non-link">
                          For general queries, including partnership opportunities, please
                          email
                        </span>{" "}
                        <a className="common-Link">support@amal.express</a>
                        <span className="non-link">.</span>
                      </p>
                    </div>
                  </div>
                  <div className="cta support">
                    <div className="icon-column">
                      <svg width="42" height="42" viewBox="0 0 42 42">
                        <defs>
                          <path
                            id="support-small-a"
                            d="M17.2727273,34.5454545 C7.73326341,34.5454545 0,26.8121911 0,17.2727273 C0,7.73326341 7.73326341,0 17.2727273,0 C26.8121911,0 34.5454545,7.73326341 34.5454545,17.2727273 C34.5454545,26.8121911 26.8121911,34.5454545 17.2727273,34.5454545 Z M17.2727273,26.7727273 C22.5194324,26.7727273 26.7727273,22.5194324 26.7727273,17.2727273 C26.7727273,12.0260221 22.5194324,7.77272727 17.2727273,7.77272727 C12.0260221,7.77272727 7.77272727,12.0260221 7.77272727,17.2727273 C7.77272727,22.5194324 12.0260221,26.7727273 17.2727273,26.7727273 Z"
                          ></path>
                        </defs>
                        <g fill="none" fillRule="evenodd" transform="translate(2 2)">
                          <path fill="#ECFAFF" d=""></path>
                          <g transform="translate(1.727 1.727)">
                            <mask id="support-small-b" fill="#fff">
                              <use></use>
                            </mask>
                            <use fill="#FFF"></use>
                            <path
                              fill="#5357AA"
                              d="M7.40734266,-2.09265734 L23.3181818,-2.59090909 C23.3181818,-2.59090909 27.1419879,-1.75052884 27.1381119,-1.72727273 C27.1342359,-1.70401661 21.1590909,10.3636364 21.1590909,10.3636364 L13.2534965,10.3304196 L7.40734266,-2.09265734 Z M27.1542721,36.4033824 L11.2434329,36.9016341 C11.2434329,36.9016341 7.41962683,36.0612539 7.42350285,36.0379977 C7.42737887,36.0147416 13.4025238,23.9470887 13.4025238,23.9470887 L21.3081182,23.9803054 L27.1542721,36.4033824 Z"
                              mask="url(#support-small-b)"
                            ></path>
                            <path
                              fill="#5357AA"
                              d="M7.40734266,-2.09265734 L23.3181818,-2.59090909 C23.3181818,-2.59090909 27.1419879,-1.75052884 27.1381119,-1.72727273 C27.1342359,-1.70401661 21.1590909,10.3636364 21.1590909,10.3636364 L13.2534965,10.3304196 L7.40734266,-2.09265734 Z M27.1542721,36.4033824 L11.2434329,36.9016341 C11.2434329,36.9016341 7.41962683,36.0612539 7.42350285,36.0379977 C7.42737887,36.0147416 13.4025238,23.9470887 13.4025238,23.9470887 L21.3081182,23.9803054 L27.1542721,36.4033824 Z"
                              mask="url(#support-small-b)"
                              transform="rotate(-90 17.28 17.155)"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </section>
              <section className="success">
                <div className="thank-you-container">
                  <div className="thank-you">
                    <div className="copy-container">
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="44"
                          height="44"
                          viewBox="0 0 44 44"
                        >
                          <g fill="none" fillRule="evenodd">
                            <circle
                              cx="22"
                              cy="22"
                              r="22"
                              fill="#C4F0FF"
                              fillRule="nonzero"
                            ></circle>
                            <polyline
                              stroke="#43458B"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="4"
                              points="14 23.504 19.34 29 31 17"
                            ></polyline>
                          </g>
                        </svg>
                      </div>
                      <h1 className="success-headline">Thank you!</h1>
                      <h2 className="success-subhead with-email">
                        We’ll get back to you as soon as possible{" "}
                        <span className="email-portion">
                          at <span className="submitted-email">{props.values.email}</span>
                        </span>
                      </h2>
                      <a className="common-Link common-Link--arrow" href="/au/blog">
                        Read the latest updates from the Stripe team
                      </a>
                    </div>
                    <hr className="divider" />
                  </div>
                </div>
              </section>
            </main>
          </div>
        </>
      )}
    />
  );
};

export default ContactUs;
