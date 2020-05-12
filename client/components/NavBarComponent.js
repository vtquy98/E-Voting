import { get } from 'lodash/fp';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { i18n } from '../i18n';
import { CHANGE_LANGUAGE, toggleBarAction } from '../stores/PageState';
import { doLogout } from '../stores/UserState';

const connectToRedux = connect(
  store => {
    return {
      PageState: get('PageState', store),
      availableLanguages: get('availableLanguages', store),
      currentLanguage: get('currentLanguage', store)
    };
  },
  dispatch => ({
    toggleBarAction: bindActionCreators(toggleBarAction, dispatch),
    changeLanguage: payload =>
      dispatch({
        type: CHANGE_LANGUAGE,
        payload
      }),
    logout: () => dispatch(doLogout())
  })
);

let DEFAULT_VERTICAL_BAR_TOGGLE = true;

const NavBarComponent = ({
  currentUser,
  logout,
  toggleBarAction,
  currentLanguage,
  changeLanguage
}) => (
  <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <button
      id="sidebarToggleTop"
      className="btn btn-link d-md-none rounded-circle mr-3"
      onClick={() => {
        toggleBarAction({
          isToggledBar: (DEFAULT_VERTICAL_BAR_TOGGLE = !DEFAULT_VERTICAL_BAR_TOGGLE)
        });
      }}
    >
      <i className="fa fa-bars"></i>
    </button>
    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown no-arrow mx-1 show">
        <a
          className="nav-link dropdown-toggle"
          id="alertsDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          {currentLanguage.symbol === 'vi' ? (
            <img src="/static/assets/images/vn.svg" alt="vn" width="32px" />
          ) : (
            <img src="/static/assets/images/en.svg" alt="en" width="32px" />
          )}
        </a>

        <div
          className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="alertsDropdown"
        >
          <h6 className="dropdown-header">Choose Language</h6>
          <a
            className="dropdown-item d-flex align-items-center"
            onClick={() => {
              changeLanguage(1);
              i18n.changeLanguage('vi');
            }}
          >
            <div className="mr-3">
              <img src="/static/assets/images/vn.svg" alt="vn" width="32px" />
            </div>
            <div>Tiếng Việt</div>
          </a>
          <a
            className="dropdown-item d-flex align-items-center"
            onClick={() => {
              changeLanguage(2);
              i18n.changeLanguage('en');
            }}
          >
            <div className="mr-3">
              <img src="/static/assets/images/en.svg" alt="en" width="32px" />
            </div>
            <div>English</div>
          </a>
        </div>
      </li>
      <div className="topbar-divider d-none d-sm-block"></div>
      <li className="nav-item dropdown no-arrow">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">
            {currentUser.fullName}
          </span>
          <img
            src={currentUser && currentUser.avatar}
            alt="avatar"
            className="img-profile rounded-circle"
          />
        </a>

        <div
          className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <Link href="/user/dashboard">
            <a className="dropdown-item">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Your Dashboard
            </a>
          </Link>
          <Link href="/user/info">
            <a className="dropdown-item">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Your Profile
            </a>
          </Link>

          <div className="dropdown-divider" />

          <a href="#" className="dropdown-item" onClick={logout}>
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>
);

export default connectToRedux(NavBarComponent);
