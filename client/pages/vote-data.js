import React from 'react';
import VoteDataComponent from '../components/VoteDataComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const VoteDataPage = ({ electionId, ...rootProps }) => (
  <DashboardPageLayout {...rootProps} title="not config">
    <VoteDataComponent electionId={electionId} />
  </DashboardPageLayout>
);

VoteDataPage.getInitialProps = ctx => {
  const {
    query: { id }
  } = ctx;
  return {
    electionId: { id }
  };
};

export default AuthenHOC(VoteDataPage);
