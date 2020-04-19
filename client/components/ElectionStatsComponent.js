import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import TableComponent from './TableComponent';

import {
  getAllElection,
  getAllElectionDataDataSelector
} from '../stores/ElectionState';
import {
  getAllUsers,
  getAllUsersDataSelector,
  getCurrentUserDataSelector
} from '../stores/UserState';

const connectToRedux = connect(
  createStructuredSelector({
    elections: getAllElectionDataDataSelector,
    currentUser: getCurrentUserDataSelector,
    users: getAllUsersDataSelector
  }),
  dispatch => ({
    getAllElection: () => dispatch(getAllElection()),
    getAllUsers: () => dispatch(getAllUsers())
  })
);

const enhance = compose(connectToRedux);

const COLUMNS = [
  {
    accessor: 'index',
    Header: '#'
  },
  {
    accessor: 'name',
    Header: 'Name',
    sortType: 'basic' //add sort to more field
  },
  {
    accessor: 'candidates',
    Header: 'Candidates'
  },
  {
    accessor: 'voters',
    Header: 'Voters'
  },
  {
    accessor: 'status',
    Header: 'Status'
  }
];

const mapElectionsToDataField = ({ elections = [] }) =>
  elections.map((election, index) => ({
    index: index + 1,
    name: (
      <Link
        href={
          election.state === 'DRAFT'
            ? `/finish-create?id=${election.id}`
            : `/election?id=${election.id}`
        }
      >
        <a>{election.name}</a>
      </Link>
    ),
    candidates: election.totalCandidateCount,
    voters: election.tocalVoterCount,
    status:
      election.state === 'CREATED' ? (
        <span className="badge badge-default badge-warning">
          {election.state}
        </span>
      ) : election.state === 'STARTED' ? (
        <span className="badge badge-default badge-success">
          {election.state}
        </span>
      ) : election.state === 'DRAFT' ? (
        <span className="badge badge-default badge-secondary">
          {election.state}
        </span>
      ) : (
        <span className="badge badge-default badge-danger">
          {election.state}
        </span>
      )
  }));

class ElectionStatsComponent extends React.Component {
  componentDidMount() {
    this.props.getAllElection();
    this.props.getAllUsers();
  }

  render() {
    const { elections = [], users = [] } = this.props;
    return (
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">All Elections</h6>
          <div className="dropdown no-arrow">
            <a
              className="dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
              aria-labelledby="dropdownMenuLink"
            >
              <div className="dropdown-header">Dropdown Header:</div>
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <TableComponent
              columns={COLUMNS}
              data={mapElectionsToDataField({
                elections
              })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default enhance(ElectionStatsComponent);
