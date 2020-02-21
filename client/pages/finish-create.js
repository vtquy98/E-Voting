import React from 'react';
import FinishCreateElectionComponent from '../components/FinishCreateElectionComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const FinishCreateElectionPage = ({ electionId, ...rootProps }) => (
  <DashboardPageLayout {...rootProps} title="not config">
    <FinishCreateElectionComponent electionId={electionId} />
  </DashboardPageLayout>
);

FinishCreateElectionPage.getInitialProps = ctx => {
  const {
    query: { id }
  } = ctx;
  return {
    electionId: { id }
  };
};

export default AuthenHOC(FinishCreateElectionPage);
