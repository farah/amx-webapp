type Props = {
    onClickBack: any;
  };
  
  export const TWSpinner = ({ onClickBack }: Props) => {
    return (
      <div className="media-body">
        <hr className="m-t-0 hidden-xs hidden-sm" />
        <a
          onClick={() => onClickBack(null)}
          className="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1 tw-card-back"
        >
          <span className="tw-icon tw-icon-arrow-left ng-scope">
            <svg width="24" height="24" fill="currentColor" className="ng-scope">
              <path d="M5.814 13H22v-2H5.814l6.893-6.893L11.293 2.7 2 12l9.293 9.3 1.414-1.407L5.814 13z"></path>
            </svg>
          </span>
        </a>
        <div>
          <div>
            <div className="text-xs-center ng-scope">
              <div className="loader">
                <div className="loader-spinner"></div>
                <div className="loader-flag">
                  <svg xmlns="http://www.w3.org/2000/svg" className="loader-flag-outline" viewBox="-2 -2 56 56">
                    <polygon
                      className="loader-flag-stroke"
                      stroke="#00B9FF"
                      stroke-width="2"
                      stroke-linejoin="miter"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-dasharray="300"
                      stroke-dashoffset="300"
                      fill="none"
                      points="24.6,27.3 0,27.3 14.3,13.7 6.1,0 48.2,0 26.3,52 19.5,52 39.2,
            5.5 16.8,5.5 21.6,13.6 13.4,21.8 27,21.8"
                    ></polygon>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="loader-flag-fill" viewBox="0 2 52 48">
                    <polygon
                      fill="#00B9FF"
                      points="6.1,0 14.3,13.7 0,27.3 24.6,27.3 27,21.8 13.4,21.8 21.6,
            13.6 16.8,5.5 39.2,5.5 19.5,52 26.3,52 48.2,0 "
                    ></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TWSpinner;
  