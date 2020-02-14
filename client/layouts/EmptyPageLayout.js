import React from 'react';
import Link from 'next/link';

class EmptyPageLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
          <div className="navbar-wrapper">
            <div className="navbar-header ">
              <ul className="nav navbar-nav ">
                <li className="nav-item">
                  <Link href="/admin-dashboard">
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
              </ul>
            </div>
          </div>
        </nav>
        {children}
        <style jsx>{`
          .content {
            margin-left: 10px !important;
          }
          .navbar-header {
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default EmptyPageLayout;
