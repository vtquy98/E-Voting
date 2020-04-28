import { get } from 'lodash/fp';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleBarAction } from '../stores/PageState';
import { doLogout } from '../stores/UserState';
const connectToRedux = connect(
  store => {
    return {
      PageState: get('PageState', store)
    };
  },
  dispatch => ({
    toggleBarAction: bindActionCreators(toggleBarAction, dispatch),
    logout: () => dispatch(doLogout())
  })
);

let DEFAULT_VERTICAL_BAR_TOGGLE = true;

const NavBarComponent = ({ currentUser, logout, toggleBarAction }) => (
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
