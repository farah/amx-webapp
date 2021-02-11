import React from "react";
import { AppDispatch } from "app/store";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "components/Header";
import AccountInfo from "./accountInfo";
import Process from "./process";
import EmailNotification from "./emailNotification";
import Calculator from "components/Calculator";
import { getExchangeRate } from "store/calculator/calculatorSlice";
import { useGoogleOneTapLogin } from 'hooks/useGoogleOneTap';

const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getExchangeRate());
  }, [dispatch]);

  useGoogleOneTapLogin({
    onError: error => console.log(error),
    onSuccess: response => console.log(response),
    googleAccountConfigs: {
      client_id:  '595104054619-oha0q98qqki5gdrvcelv2tjc8dbr57hq.apps.googleusercontent.com'
    },
  });


  return (
    <>
      <Header color="#6b7c93" />
    
      <div className="globalContent">
        <main>
          <header className="landing page-header">
            <div className="common-StripeGrid anchorBottom">
              <div className="backgroundContainer">
                <div className="grid">
                  <div className="background" />
                </div>
              </div>

              <div className="stripeContainer">
                <div className="grid">
                  <div className="stripe outline shift-down"></div>
                  <div className="stripe slate8"></div>
                  <div className="stripe blue4"></div>
                  <div className="stripe blue1"></div>
                  <div className="stripe yellow6"></div>
                  <div className="stripe outline"></div>
                  <div className="stripe slate8"></div>
                  <div className="stripe outline shift-up"></div>
                  <div className="stripe yellow6"></div>
                  <div className="stripe blue1"></div>
                  <div className="stripe blue4"></div>
                  <div className="stripe blue6"></div>
                  <div className="stripe slate8"></div>
                  <div className="stripe blue4"></div>
                  <div className="stripe outline shift-up"></div>
                  <div className="stripe slate8"></div>
                  <div className="stripe blue1"></div>
                  <div className="stripe yellow6"></div>
                </div>
              </div>
            </div>

            <div className="landing container-lg" id="futureproof">
              <div className="landing__info">
                <Link to="/login" className="announcement">
                  <span className="new-pill">New</span>
                  <span className="message">Online transfer now availablle! SIgn up today.</span>
                </Link>

                <div className="landing__header">
                  <h1 className="common-SectionTitle">Amal Express Australia</h1>
                  <p className="common-MediumBodyText">
                    Amal Express is a money transfer service with a global network of agents.
                  </p>
                </div>
                <AccountInfo />

                <div className="landing-buttons common-ButtonGroup landing-group">
                  <div className="mp">
                    <Link to="/contact" className="common-Button common-Button--dark">
                      Contact us
                    </Link>
                    <Link to="/locations" className="common-Button">
                      Locations
                    </Link>
                  </div>
                </div>
                <Calculator landingPage />
              </div>
            </div>
          </header>

          <section className="small-benefits">
            <div className="container-lg">
              <ul className="xs-rows sm-cols">
                <li className="feature-block xs-icon-top">
                  <figure className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <g fill="none" fillRule="evenodd">
                        <g>
                          <path
                            id="Base"
                            fill="#87bbfd"
                            d="M39.6 6.48A23.51 23.51 0 1 1 9.38 42.5 23.51 23.51 0 0 1 39.6 6.48zm-1.95 7.89c.26-.31.39-.71.34-1.12-.04-.4-.24-.79-.55-1.05a1.54 1.54 0 0 0-2.18.16c-.54.64-.44 1.6.22 2.16s1.63.49 2.18-.15zM39.1 34.3a1.9 1.9 0 0 0-2.08-.26 1.81 1.81 0 0 0-.98 1.82c.08.75.61 1.4 1.34 1.64.73.23 1.52 0 2-.57.65-.78.53-1.96-.28-2.63zM42 19.57c-.3-.8-1.19-1.23-1.98-.95a1.5 1.5 0 0 0-.9 1.95c.3.8 1.2 1.23 1.99.95a1.5 1.5 0 0 0 .9-1.95zm-.9 10.9a1.5 1.5 0 0 0 1.57-.67c.33-.52.3-1.2-.06-1.7-.36-.52-1-.78-1.6-.65-.62.12-1.08.6-1.18 1.22-.13.83.44 1.63 1.28 1.8zM21.04 7.09c-.4-.34-.98-.33-1.35 0-.38.35-.44.92-.14 1.35.3.42.87.57 1.32.34a1 1 0 0 0 .48-1.25 1.04 1.04 0 0 0-.3-.44zm8.86 1.26a1.05 1.05 0 0 0-.85-1.2A1 1 0 0 0 28 7.6c-.22.34-.2.8.04 1.14.25.34.67.5 1.07.42.4-.08.72-.4.78-.8v-.01zM12.38 9.83l-.43.39A18.85 18.85 0 0 0 5.9 24.94c.08.8.1 1.67.27 2.46l.23 1.22.35 1.2c.1.41.25.8.42 1.2.16.4.3.8.48 1.18.4.75.75 1.54 1.24 2.24a19.12 19.12 0 0 0 7.35 6.8c.72.37 1.45.68 2.18.98.74.22 1.45.54 2.2.67.72.16 1.43.35 2.13.4.69.09 1.39.18 2 .19a19.71 19.71 0 0 0 8.55-1.66 1.68 1.68 0 1 0-1.3-3.1l-.05.03-.06.02-.47.22a17.56 17.56 0 0 1-3.61 1.14c-.87.16-1.9.28-2.98.29-.59.01-1.13-.05-1.74-.1-.6-.02-1.2-.16-1.83-.27-.63-.09-1.24-.34-1.89-.5-.62-.24-1.26-.48-1.89-.78a16.6 16.6 0 0 1-6.58-5.65c-.46-.6-.78-1.28-1.16-1.93-.17-.33-.3-.68-.46-1.02a6.9 6.9 0 0 1-.4-1.04l-.36-1.06L8.27 27c-.2-.72-.2-1.4-.31-2.09-.05-.7-.05-1.54-.05-2.14a16.9 16.9 0 0 1 1.17-5.57 17.22 17.22 0 0 1 4.3-6.31.73.73 0 0 0-1-1.06z"
                            transform="matrix(1 0 0 -1 0 48.98)"
                          ></path>
                          <path
                            id="Lightning-Bolt"
                            fill="#6772e5"
                            d="M26.3 15.8l-1.07 6.59 4.64.2h.15c.38.07.7.3.88.64.17.35.17.75 0 1.1l-5.82 11.16a.9.9 0 0 1-1.69-.55l1.08-6.6-4.65-.22h-.14c-.38-.07-.7-.3-.88-.64a1.21 1.21 0 0 1 0-1.1l5.81-11.14a.9.9 0 0 1 1.7.55z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </figure>
                  <h3 className="common-BodyTitle">Fast delivery</h3>
                  <p className="common-BodyText">Get your money to family and friends in minutes.</p>
                </li>

                <li className="feature-block xs-icon-top">
                  <img
                    className="icon global"
                    src="https://storage.googleapis.com/amx-assets/assets/img/global.svg"
                    style={{ width: "44px" }}
                  />
                  <h3 className="common-BodyTitle">Global reach</h3>
                  <p className="common-BodyText">
                    With Amal Express, send over to 500 locations in more than 35 countries.
                  </p>
                </li>

                <li className="feature-block xs-icon-top">
                  <img
                    className="icon"
                    src="https://storage.googleapis.com/amx-assets/assets/img/partnerships.svg"
                    style={{ width: "44px" }}
                  />
                  <h3 className="common-BodyTitle">Trusted</h3>
                  <p className="common-BodyText">
                    Amal Express has served millions of customers around the world for more than 20 years, our
                    experience in delivery remittance to the most remote and undeveloped regions in{" "}
                  </p>
                </li>
              </ul>
            </div>
          </section>
          <Process />
          <EmailNotification />
        </main>
      </div>
    </>
  );
};

export default LandingPage;
