import React from 'react';
import ElectionComponent from '../components/ElectionComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const ElectionPage = ({ electionId, ...rootProps }) => (
  <DashboardPageLayout {...rootProps} title="not config">
    <ElectionComponent electionId={electionId} />
  </DashboardPageLayout>
);

ElectionPage.getInitialProps = ctx => {
  const {
    query: { id }
  } = ctx;
  return {
    electionId: { id }
  };
};

export default AuthenHOC(ElectionPage);
