import React from 'react';
import UserProfileComponent from '../../components/UserProfileComponent';
import DashboardPageLayout from '../../layouts/DashboardPageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const UserProfilePage = ({ ...rootProps }) => (
  <DashboardPageLayout {...rootProps} title="not config">
    <UserProfileComponent />
  </DashboardPageLayout>
);

UserProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['profile']
});

export default AuthenHOC(UserProfilePage);
