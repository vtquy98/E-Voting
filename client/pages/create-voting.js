import React from 'react';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
// import AuthenHOC from '../components/HOC/AuthenHOC';
import CreateVotingComponent from '../components/CreateVotingComponent';

const CreateVotingPage = ({ code, ...rootProps }) => (
  <DashboardPageLayout {...rootProps} title="not config">
    <CreateVotingComponent code={code} />
  </DashboardPageLayout>
);

CreateVotingPage.getInitialProps = ctx => {
  const {
    query: { code }
  } = ctx;
  return {
    code: { code }
  };
};

export default CreateVotingPage;
