import React from "react";

const AccountInfo: React.FC = () => {
  return (
    <div className="account-info">
      <figure>
        <div className="changelog">
          <p className="badge">Bank Account details</p>

          <ul className="entries">
            <li className="card1">
              <div className="meta" style={{ display: "flex" }}>
                <span>
                  <a href="" className="site-header__home">
                    <div className="site-header__logo">
                      <img
                        style={{ height: "40px" }}
                        src="https://storage.googleapis.com/amx-assets/assets/img/bng_bank.png"
                      />
                    </div>
                  </a>
                </span>
                <strong>online transfer only</strong>
              </div>
              <div>
                <div className="Santa__pricing">
                  <h4 className="Santa__price">Account name</h4>
                  <p className="Santa__priceLabel common-BodyText">Amal Enterprises</p>
                  <h4 className="Santa__price">BSB</h4>
                  <p className="Santa__priceLabel common-BodyText">806 043</p>
                  <h4 className="Santa__price">Account number</h4>
                  <p className="Santa__priceLabel common-BodyText">10025 7918</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </figure>
    </div>
  );
};

export default AccountInfo;
