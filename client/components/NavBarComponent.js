import React from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';

const NavBarComponent = () => (
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
            <a className="navbar-brand" href="index.html">
              <img
                className="brand-logo"
                alt="stack admin logo"
                src="/static/assets/images/e-voting-logo.png"
                width="30"
              />
              <h2 className="brand-text">AGU E-VOTING</h2>
            </a>
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
            <li className="dropdown dropdown-notification nav-item">
              <a
                className="nav-link nav-link-label"
                href="#"
                data-toggle="dropdown"
              >
                <i className="ficon ft-bell"></i>
                <span className="badge badge-pill badge-default badge-danger badge-default badge-up">
                  5
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                <li className="dropdown-menu-header">
                  <h6 className="dropdown-header m-0">
                    <span className="grey darken-2">Notifications</span>
                    <span className="notification-tag badge badge-default badge-danger float-right m-0">
                      5 New
                    </span>
                  </h6>
                </li>
                <li className="scrollable-container media-list">
                  <a href="javascript:void(0)">
                    <div className="media">
                      <div className="media-left align-self-center">
                        <i className="ft-plus-square icon-bg-circle bg-cyan"></i>
                      </div>
                      <div className="media-body">
                        <h6 className="media-heading">You have new order!</h6>
                        <p className="notification-text font-small-3 text-muted">
                          Lorem ipsum dolor sit amet, consectetuer elit.
                        </p>
                        <small>
                          <time
                            className="media-meta text-muted"
                            datetime="2015-06-11T18:29:20+08:00"
                          >
                            30 minutes ago
                          </time>
                        </small>
                      </div>
                    </div>
                  </a>
                  <a href="javascript:void(0)">
                    <div className="media">
                      <div className="media-left align-self-center">
                        <i className="ft-download-cloud icon-bg-circle bg-red bg-darken-1"></i>
                      </div>
                      <div className="media-body">
                        <h6 className="media-heading red darken-1">
                          99% Server load
                        </h6>
                        <p className="notification-text font-small-3 text-muted">
                          Aliquam tincidunt mauris eu risus.
                        </p>
                        <small>
                          <time
                            className="media-meta text-muted"
                            datetime="2015-06-11T18:29:20+08:00"
                          >
                            Five hour ago
                          </time>
                        </small>
                      </div>
                    </div>
                  </a>
                  <a href="javascript:void(0)">
                    <div className="media">
                      <div className="media-left align-self-center">
                        <i className="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3"></i>
                      </div>
                      <div className="media-body">
                        <h6 className="media-heading yellow darken-3">
                          Warning notifixation
                        </h6>
                        <p className="notification-text font-small-3 text-muted">
                          Vestibulum auctor dapibus neque.
                        </p>
                        <small>
                          <time
                            className="media-meta text-muted"
                            datetime="2015-06-11T18:29:20+08:00"
                          >
                            Today
                          </time>
                        </small>
                      </div>
                    </div>
                  </a>
                  <a href="javascript:void(0)">
                    <div className="media">
                      <div className="media-left align-self-center">
                        <i className="ft-check-circle icon-bg-circle bg-cyan"></i>
                      </div>
                      <div className="media-body">
                        <h6 className="media-heading">Complete the task</h6>
                        <small>
                          <time
                            className="media-meta text-muted"
                            datetime="2015-06-11T18:29:20+08:00"
                          >
                            Last week
                          </time>
                        </small>
                      </div>
                    </div>
                  </a>
                  <a href="javascript:void(0)">
                    <div className="media">
                      <div className="media-left align-self-center">
                        <i className="ft-file icon-bg-circle bg-teal"></i>
                      </div>
                      <div className="media-body">
                        <h6 className="media-heading">
                          Generate monthly report
                        </h6>
                        <small>
                          <time
                            className="media-meta text-muted"
                            datetime="2015-06-11T18:29:20+08:00"
                          >
                            Last month
                          </time>
                        </small>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="dropdown-menu-footer">
                  <a
                    className="dropdown-item text-muted text-center"
                    href="javascript:void(0)"
                  >
                    Read all notifications
                  </a>
                </li>
              </ul>
            </li>
            <li className="dropdown dropdown-user nav-item">
              <a
                className="dropdown-toggle nav-link dropdown-user-link"
                href="#"
                data-toggle="dropdown"
              >
                <span className="avatar avatar-online">
                  <img
                    src="/static/assets/images/e-voting-logo.png"
                    alt="avatar"
                  />
                  <i></i>
                </span>
                <span className="user-name">John Doe</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="user-profile.html">
                  <i className="ft-user"></i> Edit Profile
                </a>
                <a className="dropdown-item" href="email-application.html">
                  <i className="ft-mail"></i> My Inbox
                </a>
                <a className="dropdown-item" href="user-cards.html">
                  <i className="ft-check-square"></i> Task
                </a>
                <a className="dropdown-item" href="chat-application.html">
                  <i className="ft-message-square"></i> Chats
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="login-with-bg-image.html">
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

export default NavBarComponent;
