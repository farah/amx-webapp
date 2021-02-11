import React from "react";

interface Props {
  loading: boolean;
}

const LoadingSpinner: React.FC<Props> = ({ loading }) => {
  return (
    <>
      <div
        loading-spinner=""
        role="alert"
        style={{ display: loading ? "block" : "none" }}
      >
        <div className="spinner-wrapper">
          <div className="spinner-container active">
            <div className="spinner-layer blue">
              <div className="circle-clipper left">
                <div className="circle fit"></div>
              </div>
              <div className="gap-patch">
                <div className="circle fit"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle fit"></div>
              </div>
            </div>
            <div className="spinner-layer red">
              <div className="circle-clipper left">
                <div className="circle fit"></div>
              </div>
              <div className="gap-patch">
                <div className="circle fit"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle fit"></div>
              </div>
            </div>
            <div className="spinner-layer yellow">
              <div className="circle-clipper left">
                <div className="circle fit"></div>
              </div>
              <div className="gap-patch">
                <div className="circle fit"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle fit"></div>
              </div>
            </div>
            <div className="spinner-layer green">
              <div className="circle-clipper left">
                <div className="circle fit"></div>
              </div>
              <div className="gap-patch">
                <div className="circle fit"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle fit"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
