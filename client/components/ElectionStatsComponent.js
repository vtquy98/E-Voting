import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
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

class ElectionStatsComponent extends React.Component {
  componentDidMount() {
    this.props.getAllElection();
    this.props.getAllUsers();
  }

  render() {
    const { elections = [], users = [] } = this.props;
    return (
      <div className="col-md-12">
        <div className="card">
          <div className="card-head">
            <div className="card-header">
              <h4 className="card-title">All of elections</h4>
              <a className="heading-elements-toggle">
                <i className="fa fa-ellipsis-v font-medium-3"></i>
              </a>
            </div>
          </div>

          <div id="project-info" className="card-body row">
            <div className="project-info-count col-lg-4 col-md-12">
              <div className="project-info-icon">
                <h2>
                  {
                    elections.filter(election => election.state === 'CREATED')
                      .length
                  }
                </h2>
                <div className="project-info-sub-icon">
                  <span className="icon-rocket"></span>
                </div>
              </div>
              <div className="project-info-text pt-1">
                <h5>On going</h5>
              </div>
            </div>
            <div className="project-info-count col-lg-4 col-md-12">
              <div className="project-info-icon">
                <h2>{elections.length}</h2>
                <div className="project-info-sub-icon">
                  <span className="icon-layers"></span>
                </div>
              </div>
              <div className="project-info-text pt-1">
                <h5>Total</h5>
              </div>
            </div>
            <div className="project-info-count col-lg-4 col-md-12">
              <div className="project-info-icon">
                <h2>{users.length}</h2>
                <div className="project-info-sub-icon">
                  <span className="icon-user"></span>
                </div>
              </div>
              <div className="project-info-text pt-1">
                <h5>Total users</h5>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1">
              <span>List all of elections</span>
            </div>
            <div className="col-xl-12 col-lg-12">
              <div className="card">
                <div className="card-content">
                  <div
                    id="audience-list-scroll"
                    className="table-responsive height-300 position-relative"
                  >
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Candidates</th>
                          <th>Voters</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {elections.map((election, index) => (
                          <tr key="index">
                            <td>{index + 1}</td>
                            <td>
                              <Link
                                href={
                                  election.state === 'DRAFT'
                                    ? `/finish-create?id=${election.id}`
                                    : `/election?id=${election.id}`
                                }
                              >
                                {election.name}
                              </Link>
                            </td>
                            {/* finish-create */}
                            <td>{election.totalCandidateCount}</td>
                            <td>{election.tocalVoterCount}</td>
                            <td class="text-center font-small-2">
                              {election.state === 'CREATED' ? (
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
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer border-top-blue-grey border-top-lighten-5 text-muted">
                  <span className="float-right">
                    <a href="#" className="card-link">
                      View all <i className="fa fa-angle-right"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default enhance(ElectionStatsComponent);
