import React from 'react';
import VerticalBarComponent from '../components/VerticalBarComponent';
import FooterComponent from '../components/FooterComponent';
import Link from 'next/link';

class DashboardPageLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <VerticalBarComponent />
        <div className="wrapper">
          <div className="main-panel">
            <nav className="navbar navbar-transparent navbar-absolute">
              <div className="container-fluid">
                <div className="navbar-minimize">
                  <button
                    id="minimizeSidebar"
                    className="btn btn-round btn-white btn-fill btn-just-icon"
                  >
                    <i className="material-icons visible-on-sidebar-regular">
                      more_vert
                    </i>
                    <i className="material-icons visible-on-sidebar-mini">
                      view_list
                    </i>
                  </button>
                </div>
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link href="/user-dashboard">
                    <a className="navbar-brand"> Dashboard </a>
                  </Link>
                </div>
              </div>
            </nav>
            {children}
            <FooterComponent />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardPageLayout;
