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
  <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
    <div className="navbar-wrapper">
      <div className="navbar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item mobile-menu d-md-none mr-auto">
            <a
              className="nav-link nav-menu-main menu-toggle hidden-xs"
              href="#"
            >
              <i className="ft-menu font-large-1"></i>
            </a>
          </li>
          <li className="nav-item">
            <Link
              href={
                currentUser.role === 'ADMIN'
                  ? `/admin-dashboard`
                  : `/user/dashboard`
              }
            >
              <a className="navbar-brand">
                <img
                  className="brand-logo"
                  alt="stack admin logo"
                  src="/static/assets/images/e-voting-logo.png"
                  width="30"
                />
                <h2 className="brand-text">AGU E-VOTING</h2>
              </a>
            </Link>
          </li>
          <li className="nav-item d-md-none">
            <a
              className="nav-link open-navbar-container"
              data-toggle="collapse"
              data-target="#navbar-mobile"
            >
              <i className="fa fa-ellipsis-v"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-container content">
        <div className="collapse navbar-collapse" id="navbar-mobile">
          <ul className="nav navbar-nav mr-auto float-left">
            <li className="nav-item d-none d-md-block">
              <a
                className="nav-link nav-menu-main menu-toggle hidden-xs"
                href="#"
              >
                <i className="ft-menu"></i>
              </a>
            </li>
          </ul>
          <ul className="nav navbar-nav float-right">
            <li className="dropdown dropdown-language nav-item">
              <a
                className="dropdown-toggle nav-link"
                id="dropdown-flag"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="flag-icon flag-icon-gb"></i>
                <span className="selected-language"></span>
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown-flag">
                <a className="dropdown-item" href="#">
                  <i className="flag-icon flag-icon-gb"></i> English
                </a>
                <a className="dropdown-item" href="#">
                  <i className="flag-icon flag-icon-vn"></i> Vietnam
                </a>
              </div>
            </li>
            <li className="dropdown dropdown-user nav-item">
              <a
                className="dropdown-toggle nav-link dropdown-user-link"
                href="#"
                data-toggle="dropdown"
              >
                <span className="avatar avatar-online">
                  <img src={currentUser && currentUser.avatar} alt="avatar" />
                  <i></i>
                </span>
                <span className="user-name">{currentUser.fullName}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <Link href="/user/dashboard">
                  <a className="dropdown-item">
                    <i className="ft-check-square"></i> Dashboard
                  </a>
                </Link>
                <Link href="/user/info">
                  <a className="dropdown-item">
                    <i className="ft-user"></i> Your Profile
                  </a>
                </Link>

                <div className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={logout}>
                  <i className="ft-power"></i> Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default connectToRedux(NavBarComponent);
