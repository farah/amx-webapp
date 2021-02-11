import React from "react";
import Header from "components/Header";

const Locations: React.FC = () => {
  return (
    <>
      <Header color="white" />
      <div id="locations-page" className="globalContent">
        <main>
          <div className="StripeBackground-container">
            <div className="StripeBackground-large">
              <div className="stripe s1"></div>
              <div className="stripe s2"></div>
              <div className="stripe s3"></div>
              <div className="stripe s4"></div>
              <div className="stripe s5"></div>
              <div className="stripe s6"></div>
              <div className="stripe s7"></div>
              <div className="stripe s8"></div>
              <div className="stripe s9"></div>
              <div className="stripe s10"></div>
              <div className="stripe s11"></div>
              <div className="stripe s12"></div>
              <div className="stripe s13"></div>
              <div className="gradient"></div>
              <div className="stripe below"></div>
              <div className="dots"></div>
            </div>
          </div>

          <div className="container Header-container">
            <header className="Header">
              <h1 className="common-SectionTitle">Our locations</h1>
              <p className="Header-subTitle common-IntroText"></p>
            </header>
          </div>

          <section id="callouts" className="ContactOptions-section">
            <div className="container">
              <div className="row">
                <a
                  href="https://goo.gl/maps/BcRMWWASceYuRirr5"
                  className="contactCalloutBox"
                >
                  <div className="contactCalloutInnerContainer">
                    <div className="contactCallout-Icon sales"></div>
                    <h2 className="ContactCalloutTitle common-BodyTitle">Footscray</h2>
                    <p className="ContactCalloutTagline common-BodyText">
                      5/144-148 Nicholson St <br />
                      Footscray VIC 3011
                      <br />
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 (03) 9689-0955
                      </a>
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 0408695682
                      </a>
                    </p>
                  </div>
                  <div className="ContactCalloutFooter">
                    <div className="common-BodyText common-Link--arrow">Go to maps</div>
                  </div>
                </a>

                <a className="contactCalloutBox">
                  <div className="contactCalloutInnerContainer">
                    <div className="contactCallout-Icon support"></div>
                    <h2 className="ContactCalloutTitle common-BodyTitle">Kensington</h2>
                    <p className="ContactCalloutTagline common-BodyText">
                      27 Stubbs St <br />
                      Kensington VIC 3031
                      <br />
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 (03) 9376-7779
                      </a>
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 0403223924
                      </a>
                    </p>{" "}
                  </div>
                  <div className="ContactCalloutFooter">
                    <a href="https://goo.gl/maps/hHhds4H8ojJgJrh2A">
                      <div className="common-BodyText common-Link--arrow support">
                        Go to maps
                      </div>
                    </a>
                  </div>
                </a>

                <a className="contactCalloutBox">
                  <div className="contactCalloutInnerContainer">
                    <div className="contactCallout-Icon media"></div>
                    <h2 className="ContactCalloutTitle common-BodyTitle">Sunshine</h2>
                    <p className="ContactCalloutTagline common-BodyText">
                      Shop 30 324-328 Hampshire Rd
                      <br />
                      Sunshine VIC 3020
                      <br />
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 (03) 9312-6233
                      </a>
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 0411486112
                      </a>
                    </p>
                  </div>
                  <div className="ContactCalloutFooter">
                    <a href="https://goo.gl/maps/iiUJrbfgn58Wf6EY9">
                      <div className="common-BodyText common-Link--arrow">Go to maps</div>
                    </a>
                  </div>
                </a>
              </div>

              <div className="row">
                <a className="contactCalloutBox">
                  <div className="contactCalloutInnerContainer">
                    <div className="contactCallout-Icon sales"></div>
                    <h2 className="ContactCalloutTitle common-BodyTitle">
                      Hoppers Crossing
                    </h2>
                    <p className="ContactCalloutTagline common-BodyText">
                      1-3 Alexandra Ave <br />
                      Hoppers Crossing VIC 3029
                      <br />
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 (03) 8742-4764
                      </a>
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 0432609465
                      </a>
                    </p>{" "}
                  </div>
                  <div className="ContactCalloutFooter">
                    <a href="https://goo.gl/maps/gjApbrNjob9LojcY7">
                      <div className="common-BodyText common-Link--arrow">Go to maps</div>
                    </a>
                  </div>
                </a>

                <a className="contactCalloutBox">
                  <div className="contactCalloutInnerContainer">
                    <div className="contactCallout-Icon media"></div>
                    <h2 className="ContactCalloutTitle common-BodyTitle">Adelaide</h2>
                    <p className="ContactCalloutTagline common-BodyText">
                      Unit 5 433 Torrens Rd <br />
                      Kilkenny Rd SA 5009
                      <br />
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 (08) 8268-7777
                      </a>
                      <br />
                    </p>{" "}
                  </div>
                  <div className="ContactCalloutFooter">
                    <a href="https://goo.gl/maps/pg2sNEpS9xDNr9q19">
                      <div className="common-BodyText common-Link--arrow">Go to maps</div>
                    </a>
                  </div>
                </a>

                <a className="contactCalloutBox">
                  <div className="contactCalloutInnerContainer">
                    <div className="contactCallout-Icon media"></div>
                    <h2 className="ContactCalloutTitle common-BodyTitle">Preston</h2>
                    <p className="ContactCalloutTagline common-BodyText">
                      296 High St <br />
                      Preston VIC 3072
                      <br />
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 (03) 9471-1287
                      </a>
                      <br />
                      <a
                        href="tel:+18882352699"
                        className="sc-footer__link sc-footer__phone"
                      >
                        +61 0417577315
                      </a>
                    </p>{" "}
                  </div>
                  <div className="ContactCalloutFooter">
                    <a href="https://goo.gl/maps/y74MNeqePx2KX2Vi9">
                      <div className="common-BodyText common-Link--arrow">Go to maps</div>
                    </a>
                  </div>
                </a>
              </div>
            </div>
          </section>

          <aside className="container">
            <div className="inner-col">
              <section>
                <h3 className="common-BodyTitle">General communication</h3>
                <p className="common-BodyText">
                  For general queries, including partnership opportunities, please email{" "}
                  <a className="common-Link">support@amal.express</a>
                </p>
              </section>
            </div>
          </aside>
        </main>
      </div>
    </>
  );
};

export default Locations;
