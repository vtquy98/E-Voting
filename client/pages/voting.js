import React from 'react';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';
import VotingComponent from '../components/VotingComponent';

const VotingPage = ({ electionId, ...rootProps }) => (
  <EmptyPageLayout {...rootProps} title="not config">
    <VotingComponent electionId={electionId} />
  </EmptyPageLayout>
);

VotingPage.getInitialProps = ctx => {
  const {
    query: { id }
  } = ctx;
  return {
    electionId: { id }
  };
};

export default AuthenHOC(VotingPage);
