import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type Props = {
  onClickBack?: any;
};
function MobileNav({}: Props) {
    const navigate = useNavigate();
  return (
    <div className="mobileNav">
      <ul className="mobileNav__items">
        <li className="mobileNavItem mobileNavItem--active">
        <Link to='/account'  className="mobileNavItem__link">
            <span className="mobileNavItem__icon">
              <span className="tw-icon tw-icon-home " aria-hidden="true" role="presentation">
                <svg width="24" height="24" fill="currentColor" focusable="false">
                  <path d="M23 11L12 2 .895 11l1.224 1.551L12 4.518l9.775 8.033L23 11zM6 14v6h12v-6h2v8H4v-8h2z"></path>
                </svg>
              </span>
            </span>
            <span className="mobileNavItem__label">Home</span>
          </Link>
        </li>
        <li className="mobileNavItem mobileNavItem--call-to-action">
        <Link to='/transfer'   className="mobileNavItem__link">
            <span className="mobileNavItem__icon">
              <span className="tw-icon tw-icon-send " aria-hidden="true" role="presentation">
                <svg width="24" height="24" fill="currentColor" focusable="false">
                  <path d="M12.555 13.612l3.494-7.736 1.261 3.466 1.88-.684-2.395-6.578-1.43.52-.026-.012-.012.027-5.11 1.86.685 1.879 3.275-1.192-3.445 7.626a5.87 5.87 0 011.823.824z"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.75 18.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-2 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  ></path>
                </svg>
              </span>
            </span>
            <span className="mobileNavItem__label">Send</span>
          </Link>
        </li>
        <li className="mobileNavItem">
          <Link to='/account/recipients' className="mobileNavItem__link">
            <span className="mobileNavItem__icon">
              <span className="tw-icon tw-icon-recipients " aria-hidden="true" role="presentation">
                <svg width="24" height="24" fill="currentColor" focusable="false">
                  <path d="M15.5 2a4.493 4.493 0 00-3.561 1.749 6.733 6.733 0 011.545 1.273A2.5 2.5 0 1115.18 8.98a6.839 6.839 0 01-.144 1.996A4.5 4.5 0 1015.5 2zM15.5 15c-.201 0-.397.004-.588.01a13.836 13.836 0 00-1.82-.631c.418-.394.786-.84 1.092-1.33A17.48 17.48 0 0115.5 13c3.403 0 5.627.934 6.912 1.748 1.18.748 1.588 2.06 1.588 3.2V19h-2v-1.052c0-.732-.258-1.257-.658-1.51C20.369 15.82 18.515 15 15.5 15z"></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 9.5a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM8.5 7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
                  ></path>
                  <path d="M17 20.948V22h-2v-1.052c0-.732-.258-1.257-.658-1.51C13.369 18.82 11.515 18 8.5 18c-3.015 0-4.87.821-5.842 1.437-.4.254-.658.78-.658 1.511V22H0v-1.052c0-1.14.407-2.452 1.588-3.2C2.873 16.934 5.098 16 8.5 16c3.403 0 5.627.934 6.912 1.748 1.18.748 1.588 2.06 1.588 3.2z"></path>
                </svg>
              </span>
            </span>
            <span className="mobileNavItem__label">Recipients</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MobileNav;
