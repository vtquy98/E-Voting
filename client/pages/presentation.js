import React from 'react';
import PresentationElectionComponent from '../components/PresentationElectionComponent';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const ShowElectionPage = ({ electionId, ...rootProps }) => (
  <EmptyPageLayout {...rootProps} title="not config">
    <PresentationElectionComponent electionId={electionId} />
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
