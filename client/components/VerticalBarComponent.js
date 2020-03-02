import React from 'react';

const VerticalBarComponent = () => (
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
        <li className=" navigation-header">
          <span>General</span>
          <i
            className=" ft-minus"
            data-toggle="tooltip"
            data-placement="right"
            data-original-title="General"
          ></i>
        </li>
        <li className=" nav-item">
          <a href="index.html">
            <i className="ft-home"></i>
            <span className="menu-title" data-i18n="">
              Dashboard
            </span>
            <span className="badge badge badge-primary badge-pill float-right mr-2">
              3
            </span>
          </a>
        </li>
        <li className=" nav-item">
          <a href="#" data-toggle="modal" data-target="#createNewElectionModal">
            <i className="ft-plus-square"></i>
            <span className="menu-title" data-i18n="">
              Create Election
            </span>
          </a>
        </li>
        <li className=" navigation-header">
          <span>Apps</span>
          <i
            className=" ft-minus"
            data-toggle="tooltip"
            data-placement="right"
            data-original-title="Apps"
          ></i>
        </li>
        <li className=" nav-item">
          <a href="email-application.html">
            <i className="ft-mail"></i>
            <span className="menu-title" data-i18n="">
              Email Application
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default VerticalBarComponent;
