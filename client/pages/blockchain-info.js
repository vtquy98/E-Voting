import React from 'react';
import BlockchainInfoComponent from '../components/BlockchainInfoComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const BlockchainInfoPage = rootProps => (
  <DashboardPageLayout {...rootProps}>
    <BlockchainInfoComponent />
  </DashboardPageLayout>
);

BlockchainInfoPage.getInitialProps = async () => ({
  namespacesRequired: ['admin-dashboard']
});

export default AuthenHOC(BlockchainInfoPage);
