import React from 'react';
import VerticalBarComponent from '../components/VerticalBarComponent';
import FooterComponent from '../components/FooterComponent';
import NavBarComponent from '../components/NavBarComponent';
import CreateElectionModalComponent from '../components/CreateElectionModalComponent';
class DashboardPageLayout extends React.Component {
  render() {
    const { children, currentUser } = this.props;
    return (
      <div id="wrapper">
        <VerticalBarComponent role={currentUser.role} />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <NavBarComponent currentUser={currentUser} />
            <div className="container-fluid">{children}</div>
          </div>
          <FooterComponent />
        </div>
        {currentUser.role === 'ADMIN' && <CreateElectionModalComponent />}
      </div>
    );
  }
}

export default DashboardPageLayout;
