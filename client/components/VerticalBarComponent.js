import React from 'react';
import Link from 'next/link';
const VerticalBarComponent = ({ role }) => (
  <div
    className="main-menu menu-fixed menu-light menu-accordion"
    data-scroll-to-active="true"
  >
    <div className="main-menu-content">
      <ul
        className="navigation navigation-main"
        id="main-menu-navigation"
        data-menu="menu-navigation"
      >
        {role === 'ADMIN' && (
          <React.Fragment>
            {' '}
            <li className=" navigation-header">
              <span>For Administator</span>
              <i
                className=" ft-minus"
                data-toggle="tooltip"
                data-placement="right"
                data-original-title="General"
              ></i>
            </li>
            <li className="nav-item">
              <Link href="/admin-dashboard">
                <a>
                  <i className="ft-home"></i>
                  <span className="menu-title">Admin Dashboard</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="#"
                data-toggle="modal"
                data-target="#createNewElectionModal"
              >
                <i className="ft-plus-square"></i>
                <span className="menu-title">Create Election</span>
              </a>
            </li>
            <li className="nav-item">
              <Link href="/user-management">
                <a>
                  <i className="ft-user"></i>
                  <span className="menu-title">Users Management</span>
                </a>
              </Link>
            </li>
          </React.Fragment>
        )}

        <li className=" navigation-header">
          <span>As a user</span>
          <i
            className=" ft-minus"
            data-toggle="tooltip"
            data-placement="right"
            data-original-title="Apps"
          ></i>
        </li>
        <li className=" nav-item">
          <Link href="/user/dashboard">
            <a>
              <i className="ft-home"></i>
              <span className="menu-title">Dashboard</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/user/info">
            <a>
              <i className="ft-user"></i>
              <span className="menu-title">Your information</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default VerticalBarComponent;
