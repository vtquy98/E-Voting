import React from 'react';
import Link from 'next/link';
import { doLogout } from '../stores/UserState';
import { connect } from 'react-redux';

const connectToRedux = connect(
  null,
  dispatch => ({
    logout: () => dispatch(doLogout())
  })
);

const NavBarComponent = ({ currentUser, logout }) => (
  <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <button
      id="sidebarToggleTop"
      className="btn btn-link d-md-none rounded-circle mr-3"
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
