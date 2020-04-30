import { get } from 'lodash/fp';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleBarAction } from '../stores/PageState';

const connectToRedux = connect(
  store => {
    return {
      PageState: get('PageState', store)
    };
  },
  dispatch => ({
    toggleBarAction: bindActionCreators(toggleBarAction, dispatch)
  })
);

let DEFAULT_VERTICAL_BAR_TOGGLE = true;

const VerticalBarComponent = ({ role, PageState, toggleBarAction }) => (
  <ul
    className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${PageState.isToggledBar &&
      'toggled'}`}
    id="accordionSidebar"
  >
    <Link href={role === 'ADMIN' ? `/admin-dashboard` : `/user/dashboard`}>
      <a className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon">
          <div className="navbar-brand">
            <img
              className="brand-logo"
              alt="stack admin logo"
              src="/static/assets/images/e-voting-logo.png"
              width="40"
            />
          </div>
        </div>
        <div className="sidebar-brand-text">
          E-Voting <sup>AGU</sup>
        </div>
      </a>
    </Link>

    <hr className="sidebar-divider my-0" />

    <li className="nav-item">
      <Link href="/user/dashboard">
        <a className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Your Dashboard</span>
        </a>
      </Link>
      <hr className="sidebar-divider" />
    </li>

    {role === 'ADMIN' && (
      <React.Fragment>
        <div className="sidebar-heading">For Admin</div>

        <li className="nav-item">
          <Link href="/admin-dashboard">
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Admin Dashboard</span>
            </a>
          </Link>
        </li>

        <li className="nav-item">
          <a
            href="#"
            data-toggle="modal"
            data-target="#createNewElectionModal"
            className="nav-link"
          >
            <i className="fas fa-plus-circle"></i>
            <span>Create Election</span>
          </a>
        </li>

        <li className="nav-item">
          <Link href="/user-management">
            <a className="nav-link">
              <i className="fas fa-users"></i>
              <span>User Management</span>
            </a>
          </Link>
          <hr className="sidebar-divider" />
        </li>
      </React.Fragment>
    )}

    <div className="sidebar-heading">Your menu</div>

    <li className="nav-item">
      <Link href="/user/info">
        <a className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Your profile </span>
        </a>
      </Link>
    </li>

    <hr className="sidebar-divider" />
    <div className="text-center d-none d-md-inline">
      <button
        id="sidebarToggle"
        className="rounded-circle border-0"
        onClick={() => {
          toggleBarAction({
            isToggledBar: (DEFAULT_VERTICAL_BAR_TOGGLE = !DEFAULT_VERTICAL_BAR_TOGGLE)
          });
        }}
      ></button>
    </div>
  </ul>
);

export default connectToRedux(VerticalBarComponent);
