import React from "react";

const Process: React.FC = () => {
  const dispatch = React.useState();
  return (
    <section className="process">
      <div className="container-lg">
        <div className="intro-copy">
          <h2 className="common-UppercaseTitle">How does it work?</h2>
          <p className="common-IntroText">
            With Amal Express, send money overseas instantly in just three steps.
          </p>
        </div>
        <ul className="timeline">
          <li className="line"></li>

          <li className="step">
            <div className="icon-container tax-id">
              <figure className="icon tax-id"></figure>
            </div>
            <p className="common-BodyText">
              Verify your identity if your a new customer by emailing us a copy of your
              drivers license
              <br />
              <span className="day">Step 1</span>
            </p>
          </li>
          <li className="step">
            <div className="icon-container documents-bank-account">
              <figure className="icon bank-account"></figure>
            </div>
            <p className="common-BodyText">
              Deposit amount by transferring to our bank account
              <br />
              <span className="day">Step 2</span>
            </p>
          </li>
          <li className="step">
            <div className="icon-container submit">
              <figure className="icon submit"></figure>
            </div>
            <p className="common-BodyText">
              Call or text to give receiver details with a screenshot of the order.
              Money will be sent in 5 minutes
              <br />
              <span className="day">Step 3</span>
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Process;
