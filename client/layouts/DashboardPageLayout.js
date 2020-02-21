import React from 'react';
import VerticalBarComponent from '../components/VerticalBarComponent';
import FooterComponent from '../components/FooterComponent';
import NavBarComponent from '../components/NavBarComponent';
class DashboardPageLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <NavBarComponent />
        <VerticalBarComponent />
        {children}
        <FooterComponent />
      </React.Fragment>
    );
  }
}

export default DashboardPageLayout;
