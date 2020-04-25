import Link from 'next/link';
import React from 'react';
import { FaPlay, FaRegTrashAlt } from 'react-icons/fa';
import {
  FcCalendar,
  FcClock,
  FcEngineering,
  FcOrganization,
  FcRules,
  FcTodoList
} from 'react-icons/fc';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  getUserUpComingElection,
  getUserUpComingElectionDataSelector,
  reportParticipatedElection
} from '../stores/ElectionState';
import { getCurrentUserDataSelector } from '../stores/UserState';

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
    return (
      <React.Fragment>
        <h1 className="h3 mb-4 text-gray-800">
          {currentUser.fullName} Dashboard
        </h1>
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow border-none mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Upcoming Election
                </h6>
              </div>
              <div className="card-body">
                {!upComingElection.length ? (
                  <div className="text-center">
                    <h3>No Election Upcoming</h3>

                    <h4 className="text-muted mb-1 mt-2">
                      You will receive mail if you was invited in any election
                    </h4>

                    <div className="d-flex justify-content-center">
                      <img
                        src="/static/assets/images/empty.svg"
                        alt="success"
                        className="mt-2"
                        width="50%"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <ol>
                      {upComingElection.map((election, index) => (
                        <div key={index}>
                          <div className="card border-left-primary h-100 py-2 mb-4">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-lg-12 mb-2">
                                  <h2 className="text-center">
                                    <Link href={`/voting?id=${election.id}`}>
                                      <a> {election.name}</a>
                                    </Link>
                                  </h2>
                                </div>
                                <div className="col-sm-1 text-center h3 ">
                                  <FcRules />
                                </div>
                                <div className="col-sm-4">
                                  <div>
                                    <p>
                                      <FcOrganization /> Election Owner:
                                      <span className="text-muted font-weight-bold">
                                        {' '}
                                        {election.electionOwner}
                                      </span>
                                    </p>
                                    <p>
                                      {' '}
                                      <FcCalendar /> Take place on:
                                      <span className="text-muted font-weight-bold">
                                        {' '}
                                        {election.dateTakePlace}
                                      </span>
                                    </p>

                                    <p>
                                      <FcClock /> Voting time:
                                      <span className="text-muted font-weight-bold">
                                        {' '}
                                        {election.votingTime} min
                                      </span>
                                    </p>
                                    <p>
                                      <FcEngineering /> Voting type:
                                      <span className="text-muted font-weight-bold">
                                        {' '}
                                        {election.votingType ===
                                        'SELECT_TO_VOTE'
                                          ? 'Select to vote'
                                          : election.votingType ===
                                            'SELECT_TO_REMOVE'
                                          ? 'Select to remove'
                                          : 'Select to trust'}
                                      </span>
                                    </p>
                                    <p>
                                      <FcTodoList /> At least choose:
                                      <span className="text-muted font-weight-bold">
                                        {' '}
                                        {election.atLeastVote}
                                      </span>
                                    </p>
                                    <p>
                                      <FcTodoList /> Most choose:
                                      <span className="text-muted font-weight-bold">
                                        {' '}
                                        {election.mostVote}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="col-sm">
                                  <div className="col-lg-12">
                                    <div
                                      id="project-info"
                                      className="card-body row d-flex justify-content-center"
                                    >
                                      <div className="project-info-count col-lg-4 col-md-12">
                                        <Link
                                          href={`/voting?id=${election.id}`}
                                        >
                                          <a>
                                            <div className="project-info-icon">
                                              {/* <h2>{candidates.length}</h2> */}
                                              <h2>
                                                <FaPlay />
                                              </h2>
                                            </div>
                                            <div className="project-info-text pt-1">
                                              <h5>Vote now</h5>
                                            </div>
                                          </a>
                                        </Link>
                                      </div>
                                      <div className="project-info-count col-lg-4 col-md-12">
                                        <a
                                          href="#"
                                          onClick={e => {
                                            e.preventDefault();
                                            reportParticipatedElection({
                                              electionId: election.id
                                            });
                                          }}
                                        >
                                          <div className="project-info-icon">
                                            <h2>
                                              <FaRegTrashAlt />
                                            </h2>
                                          </div>
                                          <div className="project-info-text pt-1">
                                            <h5>Cancel</h5>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .scroll-example {
            padding: 0.5rem;
            position: relative;
            border: none;
            overflow: auto;
          }

          #project-info {
            overflow: hidden;
          }
          #project-info .project-info-count {
            text-align: center;
            vertical-align: top;
          }
          #project-info .project-info-count .project-info-icon {
            border: 3px solid #ececec;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
            padding: 37px 0;
            position: relative;
            width: 110px;
            height: 110px;
          }
          #project-info .project-info-count .project-info-text {
            display: block;
            margin-top: 20px;
            left: 0;
            position: relative;
            top: 0;
            width: 99.8%;
          }
          #project-info .project-info-count .project-info-sub-icon {
            position: relative;
            border-radius: 65px;
            border: 1px solid #adadad;
            background: #fff;
            bottom: -5px;
            left: 34px;
            width: 40px;
            height: 40px;
          }
          #project-info .project-info-count .project-info-sub-icon span {
            font-size: 1.2rem;
            top: 10px;
            position: relative;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default connectToRedux(UserDashboardComponent);
