import React from 'react';
import Link from 'next/link';

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
          <Link href="/user/dashboard">
            <a>
              <i className="ft-home"></i>
              <span className="menu-title">Dashboard</span>
            </a>
          </Link>
        </li>
        <li className=" nav-item">
          <Link href="/user/profile">
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
