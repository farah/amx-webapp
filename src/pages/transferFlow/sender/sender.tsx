import React from "react";
import classNames from "classnames";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field as Fields } from "formik";
import { unwrapResult } from "@reduxjs/toolkit";
import { PhoneNumberInput, Select, Typeahead, Button } from "@transferwise-ui/index";
import BirthdayInput from "./BirthdayInput";
import { Search as SearchIcon } from "@transferwise/icons";
import { RootState } from "app/rootReducer";
import { useAuth } from "contexts/Firebase";
import LoadingSpinner from "components/LoadingSpinner";
import { AppDispatch } from "app/store";
import { useFormikContext, Formik, Form } from "formik";
import { updateUser, checkExistingCustomer } from "store/user/userSlice";
import { addressAutocomplete, parseAddress } from "api/misc";
import { changeSteps } from "store/flow/flowSlice";
import { useNavigate } from "react-router-dom";

import validationSchema from "./validationSchema";
import { stateOptions } from "./data";

interface FormValues {
  firstName: any;
  middleName: any;
  lastName: any;
  birthdate: any;
  mobile: any;
  formattedAddress: any;
  suburb: any;
  state: any;
  postcode: any;
}

function SenderForm() {
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    errors,
    touched,
    handleSubmit,
    validateForm
  } = useFormikContext<FormValues>();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [addressOptions, setAddressOptions] = React.useState([]);
  const user = useSelector((state: RootState) => state.user);
  const [currentState, setState] = React.useState({
    label: "Victoria",
    value: "Victoria"
  });
  const { userId } = useAuth();

  const handleClick = async () => {

    let isExistingCustomer;

    validateForm();
    try {
  //    const resultAction = await dispatch(checkExistingCustomer({ uid: userId, mobile: "61424476595" }));
   //   const user = unwrapResult(resultAction);
    } catch (e) {}
    if (true) {
      // navigate("/transfer/recipient");
      return;
    }

    if (!isExistingCustomer) {
      dispatch(changeSteps(true));
      //this.props.history.push("/verify");
      return;
    }
  };

  const searchAddress = async term => {
    const results = await addressAutocomplete(term);
    setAddressOptions(results);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="row ng-scope">
        <div className="col-lg-offset-2 col-lg-8">
          <header className="transfer-flow-main__header">
            <span className="ng-scope">
              <h2 className="text-xs-left text-sm-center">Who is sending the money?</h2>
            </span>
          </header>
          <div className="b-bootstrap-wrap m-t-3">
            <div className="m-b-5 p-b-2 ng-scope ng-isolate-scope">
              <ul className="nav nav-tabs">
                <li className="uib-tab nav-item ng-scope ng-isolate-scope active">
                  <a href="" className="nav-link ng-binding">
                    Personal
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane ng-scope active">
                  <div className="m-t-3 ng-scope">
                    <div className="ng-scope">
                      <div className="row">
                        <div className="col-sm-6">
                          <div
                            className={classNames("form-group", {
                              "has-error": touched.firstName && errors.firstName
                            })}
                          >
                            <label className="control-label">First name</label>

                            <Fields name="firstName">
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
                            </Fields>
                            {touched.firstName && errors.firstName && (
                              <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
                                <div>{errors.firstName}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div
                            className={classNames("form-group", {
                              "has-error": touched.lastName && errors.lastName
                            })}
                          >
                            <label className="control-label">Last name</label>
                            <Fields name="lastName">
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
                            </Fields>
                            {touched.lastName && errors.lastName && (
                              <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
                                <div>{errors.lastName}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div
                            className={classNames("form-group", {
                              "has-error": touched.birthdate && errors.birthdate
                            })}
                          >
                            <label className="control-label">Date of Birth</label>

                            <BirthdayInput
                              id="birthdate"
                              onChange={value => {
                                setFieldValue("birthdate", value);
                              }}
                              onBlur={() => {
                                setFieldTouched("birthdate", true);
                              }}
                              locale="en-GB"
                              disabled={false}
                              size="md"
                              value={values.birthdate}
                              monthFormat="long"
                              mode={"day-month-year"}
                            />
                            {touched.birthdate && errors.birthdate && (
                              <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
                                <div>Date of birth is invalid</div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label className="control-label">Mobile</label>

                          <Fields name="mobile">
                            {({ ...field }) => {
                              return (
                                <PhoneNumberInput
                                  selectedCountry={{ value: 11, label: "Australia" }}
                                  placeholder="Enter mobile"
                                  countryCode="AU"
                                  initialValue={values.mobile}
                                  onChange={value => {
                                    setFieldValue("mobile", value);
                                  }}
                                  onBlur={value => {
                                    setFieldTouched("mobile", true);
                                  }}
                                  lockCountryCode
                                  {...field}
                                />
                              );
                            }}
                          </Fields>
                          {touched.mobile && errors.mobile && (
                            <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
                              <div>{errors.mobile}</div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row ng-hide"></div>

                      <div className="ng-scope">
                        <h4 className="page-header">Your address</h4>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div
                            className={classNames("form-group", {
                              "has-error": touched.formattedAddress && errors.formattedAddress
                            })}
                          >
                            <label className="control-label">Address</label>

                            <Fields>
                              {({ ...field }) => {
                                const options = addressOptions.map(label => ({ label }));

                                return (
                                  <Typeahead
                                    id="typeahead"
                                    name="typeahead-input-name"
                                    size="md"
                                    maxHeight={100}
                                    showSuggestions
                                    initialValue={[{ label: values.formattedAddress }]}
                                    value={"dd"}
                                    placeholder="placeholder"
                                    chipSeparators={[",", " "]}
                                    onSearch={searchAddress}
                                    onChange={async option => {
                                ;
                                      if (!options.length) {
                                        setFieldTouched("formattedAddress", true);
                                        setFieldValue("formattedAddress", "");
                                        return;
                                      }
                                      const address = await parseAddress(option[0].label);

                                      setFieldValue("suburb", address.Suburb);
                                      setFieldValue("postcode", address.Postcode);
                                      setFieldValue("state", address.State);
                                      setFieldValue("formattedAddress", options.length > 0 ? option[0].label : "");

                                      const stateMap = {
                                        VIC: stateOptions[0],
                                        NSW: stateOptions[1],
                                        NT: stateOptions[2],
                                        WA: stateOptions[3],
                                        TAS: stateOptions[4],
                                        QLD: stateOptions[5],
                                        SA: stateOptions[6]
                                      };

                                      setState(stateMap[address.State]);
                                    }}
                                    addon={<SearchIcon />}
                                    onBlur={() => {
                                      setFieldTouched("formattedAddress", true);
                                    }}
                                    options={options}
                                    {...field}
                                  />
                                );
                              }}
                            </Fields>

                            {touched.formattedAddress && errors.formattedAddress && (
                              <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
                                <div>{errors.formattedAddress}</div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div
                            className={classNames("form-group", {
                              "has-error": touched.suburb && errors.suburb
                            })}
                          >
                            <label className="control-label">Suburb</label>
                            <Fields name="suburb">
                              {({ ...field }) => (
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter suburb"
                                  id="suburb"
                                  name="suburb"
                                  disabled
                                  value={values.suburb}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  {...field}
                                />
                              )}
                            </Fields>
                            {touched.suburb && errors.suburb && (
                              <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
                                <div>The value is too long</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <div
                            className={classNames("form-group", {
                              "has-error": touched.postcode && errors.postcode
                            })}
                          >
                            <label className="control-label">Post code</label>
                            <Fields name="postcode">
                              {({ ...field }) => (
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter postcode"
                                  id="postcode"
                                  name="postcode"
                                  disabled
                                  value={values.postcode}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  {...field}
                                />
                              )}
                            </Fields>
                            {touched.postcode && errors.postcode && (
                              <div role="alert" className="alert alert-detach alert-danger small p-x-2 p-y-1 arrow">
                                <div>{errors.postcode}</div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <label className="control-label">State</label>
                          <Fields name="state">
                            {({ ...field }) => (
                              <Select
                                id="state"
                                required={true}
                                disabled
                                label={"State"}
                                name={"basic-select"}
                                selected={currentState}
                                onChange={() => {}}
                                onBlur={() => setFieldTouched("state", true)}
                                options={stateOptions}
                                {...field}
                              />
                            )}
                          </Fields>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ng-scope">
                    <div className="col-sm-6 col-sm-offset-3">
                      <Button
                        onClick={handleClick}
                        className="btn btn-primary btn-block ft-continue-button ng-scope ng-isolate-scope"
                        loading={isSubmitting}
                        size="md"
                        block
                        htmlType="submit"
                        disabled={Object.keys(touched).length > 0 && Object.keys(errors).length > 0}
                        label="Confirm"
                        type="btn-primary"
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const Sender = ({ updateUserProfile }) => {
  const { userProfile } = useSelector((state: RootState) => state.user);
  const { userId, authUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async values => {
    const { firstName, middleName, lastName, birthdate, mobile, formattedAddress, suburb, state, postcode } = values;
    debugger
    const user = {
      firstName,
      middleName,
      lastName,
      birthdate,
      mobile,
      email: authUser.email,
      address: {
        formattedAddress,
        suburb,
        state,
        postcode
      },
      userInfoComplete: true
    };

    await updateUserProfile({ uid: userId, user: { ...user } });
    
    localStorage.removeItem("newReceiverForm");
    if (true) {
      navigate("/transfer/recipient");
      return;
    }

    return;
  };
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      {user.loading === "pending" ? (
        <LoadingSpinner loading={true} />
      ) : (
        <div className="app">
          <Formik
            enableReinitialize
            initialValues={{
              firstName: userProfile?.firstName || "",
              middleName: userProfile?.middleName || "",
              lastName: userProfile?.lastName || "",
              birthdate: userProfile?.birthdate || "",
              mobile: userProfile?.mobile || "+614",
              formattedAddress: userProfile?.address?.formattedAddress || "",
              suburb: userProfile?.address?.suburb || "",
              state: userProfile?.address?.state || "",
              postcode: userProfile?.address?.postcode || ""
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <SenderForm />
          </Formik>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = {
  updateUserProfile: updateUser
};

export default connect(null, mapDispatchToProps)(Sender);
