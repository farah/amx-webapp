/* eslint-disable */
import { Loader } from "@transferwise-ui";
import { useAuth } from "contexts/Firebase";
type Props = {
  receiver: any;
  loading: any
};

function ReceiverItem({ receiver, loading }: Props) {
  const { logout, authResult } = useAuth();
  return (
    <button className={`tw-navigation-option media decision tw-option__sm-media ${loading ? 'disabled' : ''}`}>
      <div className="media-left">
        <div className="circle circle-sm text-primary circle-inverse">
          <div className="tw-badge tw-badge-border-light tw-badge-sm">
            <div className="tw-badge__children">
              {!authResult ? (
                <Loader small={false} size={Loader.Size.EXTRA_SMALL} />
              ) : (
                <div className="tw-avatar tw-avatar--md tw-avatar--thumbnail tw-avatar--light">
                  <div className="tw-avatar__content">
                    <img
                      src={authResult.photoURL}
                      alt="abdi farah"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="tw-badge__content">
              <img src="https://transferwise.com/public-resources/assets/flags/square/aud.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="media-body">
        <div className="h5">
          {receiver.firstName} {receiver.lastName}{" "}
        </div>
        <div className="decision__content">
          <span>Receiver mobile is {receiver.mobile}</span>
        </div>
      </div>
      <div className="media-right">
        <span
          className="tw-icon tw-icon-chevron-up tw-chevron chevron-color right d-block"
          aria-hidden="true"
          role="presentation"
        >
          <svg width="16" height="16" fill="currentColor" focusable="false">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4l-6.6 6.653L2.537 11.8 8 6.293l5.463 5.507 1.137-1.147L8 4z"
            ></path>
          </svg>
        </span>
      </div>
    </button>
  );
}

export default ReceiverItem;
