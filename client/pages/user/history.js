import React from 'react';
import UserVoteHistoryComponent from '../../components/UserVoteHistoryComponent';
import DashboardPageLayout from '../../layouts/DashboardPageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const VoteHistoryPage = ({ ...rootProps }) => (
  <DashboardPageLayout {...rootProps} title="not config">
    <UserVoteHistoryComponent />
  </DashboardPageLayout>
);

VoteHistoryPage.getInitialProps = async () => ({
  namespacesRequired: ['election']
});

export default AuthenHOC(VoteHistoryPage);
