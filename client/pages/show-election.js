import React from 'react';
import ShowElectionComponent from '../components/ShowElectionComponent';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const ShowElectionPage = ({ electionId, ...rootProps }) => (
  <EmptyPageLayout {...rootProps} title="not config">
    <ShowElectionComponent electionId={electionId} />
  </EmptyPageLayout>
);

ShowElectionPage.getInitialProps = ctx => {
  const {
    query: { id }
  } = ctx;
  return {
    electionId: { id }
  };
};

export default AuthenHOC(ShowElectionPage);
