import React from 'react';
import VerticalBarComponent from '../components/VerticalBarComponent';
import FooterComponent from '../components/FooterComponent';
import NavBarComponent from '../components/NavBarComponent';
import CreateElectionModalComponent from '../components/CreateElectionModalComponent';
class DashboardPageLayout extends React.Component {
  render() {
    const { children, currentUser } = this.props;
    return (
      <React.Fragment>
        <NavBarComponent currentUser={currentUser} />
        <VerticalBarComponent role={currentUser.role} />
        {children}
        {currentUser.role === 'ADMIN' && <CreateElectionModalComponent />}
        <FooterComponent />
      </React.Fragment>
    );
  }
}

export default DashboardPageLayout;
