import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCurrentUserDataSelector } from '../stores/UserState';
import Link from 'next/link';

import {
  getUserUpComingElection,
  getUserUpComingElectionDataSelector,
  reportParticipatedElection
} from '../stores/ElectionState';

const connectToRedux = connect(
  createStructuredSelector({
    currentUser: getCurrentUserDataSelector,
    upComingElection: getUserUpComingElectionDataSelector
  }),
  dispatch => ({
    getUserUpComingElection: () => dispatch(getUserUpComingElection()),
    reportParticipatedElection: electionId =>
      dispatch(reportParticipatedElection(electionId))
  })
);

class UserDashboardComponent extends React.Component {
  componentDidMount() {
    this.props.getUserUpComingElection();
  }

  render() {
    const {
      currentUser,
      upComingElection = [],
      reportParticipatedElection
    } = this.props;
    const praseRandom = ['After that', 'And then'];
    return (
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-12 mb-1">
              <h3 className="content-header-title">
                {currentUser.fullName} Dashboard
              </h3>
            </div>
          </div>
          <div className="content-body">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Upcoming Election</h4>
              </div>
              <div className="card-content">
                <div className="card-body">
                  <div className="card-text">
                    <section className="cd-horizontal-timeline loaded">
                      <div className="events-content">
                        {!upComingElection.length ? (
                          <ol>
                            <li className="selected" data-date="16/01/2015">
                              <h2>No Election Upcoming</h2>
                              <h3 className="text-muted mb-1 mt-2">
                                <em>
                                  You will receive mail if you was invited in
                                  any election
                                </em>
                              </h3>

                              <div className="d-flex justify-content-center">
                                <img
                                  src="/static/assets/images/empty.svg"
                                  alt="success"
                                  className="height-200 mt-2"
                                />
                              </div>
                            </li>
                          </ol>
                        ) : (
                          <div>
                            <ol>
                              {upComingElection.map((election, index) => (
                                <div key={index}>
                                  <li className="selected">
                                    <h2>
                                      <Link href={`/voting?id=${election.id}`}>
                                        <a> {election.name}</a>
                                      </Link>
                                    </h2>
                                    <h3 className="text-muted mb-1 mt-1">
                                      <em>
                                        Take place on: {election.dateTakePlace},{' '}
                                        {election.electionOwner}
                                      </em>
                                    </h3>
                                    <p className="lead">
                                      {election.description}
                                    </p>

                                    <div className="pr-2">
                                      <a
                                        onClick={e => {
                                          e.preventDefault();
                                          reportParticipatedElection({
                                            electionId: election.id
                                          });
                                        }}
                                      >
                                        <span className="badge badge-default badge-warning">
                                          <i className="ft-alert-octagon"></i> I
                                          Participated in this election  
                                        </span>
                                      </a>
                                    </div>
                                  </li>
                                  {index !== upComingElection.length - 1 && (
                                    <div className="mt-2 card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1">
                                      <span>
                                        {
                                          praseRandom[
                                            Math.floor(
                                              Math.random() * praseRandom.length
                                            )
                                          ]
                                        }
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connectToRedux(UserDashboardComponent);
