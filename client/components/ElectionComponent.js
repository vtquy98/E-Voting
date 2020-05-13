import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import ReactToPrint from 'react-to-print';
import QRToPrintComponent from './QRToPrintComponent';
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';

import {
  FcAbout,
  FcOrganization,
  FcCalendar,
  FcClock,
  FcEngineering,
  FcTodoList
} from 'react-icons/fc';

import {
  FaEthereum,
  FaPoll,
  FaPlay,
  FaHandLizard,
  FaStop,
  FaVoteYea
} from 'react-icons/fa';

import {
  // resetDataGetElection,
  getAllCandidates,
  getAllCandidatesDataSelector,
  // resetDataGetAllCandidates,
  getAllVoters,
  getAllVotersDataSelector,
  getElection,
  getElectionDataSelector,
  getElectionErrorSelector,
  // resetDataGetAllVoters,
  getTotalVotesCount,
  getTotalVotesCountDataSelector,
  // resetDatagetTotalVotesCount
  startVoting,
  startVotingErrorSelector,
  stopVoting,
  stopVotingErrorSelector,
  startVotingDataSelector,
  stopVotingDataSelector
} from '../stores/ElectionState';
import {
  getAllUsersDataSelector,
  getCurrentUserDataSelector
} from '../stores/UserState';
// import { SELECT_TO_VOTE, SELECT_TO_REMOVE } from '../enums/votingType';
import ManualVotingPopup from './ManualVotingPopup';
import DisplayUsersListComponent from './DisplayUsersListComponent';

const ENV_DEPLOY = process.env.ENV_DEPLOY || 'ropsten';

const connectToRedux = connect(
  createStructuredSelector({
    election: getElectionDataSelector,
    errorMessage: getElectionErrorSelector,
    candidates: getAllCandidatesDataSelector,
    voters: getAllVotersDataSelector,
    totalVoteCount: getTotalVotesCountDataSelector,
    currentUser: getCurrentUserDataSelector,
    users: getAllUsersDataSelector,
    startVotingErrorMessage: startVotingErrorSelector,
    stopVotingErrorMessage: stopVotingErrorSelector,
    startVotingSuccessMessage: startVotingDataSelector,
    stopVotingSuccessMessage: stopVotingDataSelector
  }),
  dispatch => ({
    getElection: id => dispatch(getElection(id)),
    getAllCandidates: electionId => dispatch(getAllCandidates(electionId)),
    getAllVoters: electionId => dispatch(getAllVoters(electionId)),
    getTotalVotesCount: electionId => dispatch(getTotalVotesCount(electionId)),
    startVoting: electionId => {
      dispatch(startVoting(electionId));
      toast(`Starting election ...`, { autoClose: false, toastId: electionId });
    },
    stopVoting: electionId => {
      dispatch(stopVoting(electionId));
      toast(`Stoping election ...`, { autoClose: false, toastId: electionId });
    }
  })
);

const enhance = compose(connectToRedux);

class ElectionComponent extends React.Component {
  componentDidMount() {
    const { electionId } = this.props;
    this.props.getElection(electionId.id);
    this.props.getAllCandidates(electionId.id);
    this.props.getAllVoters(electionId.id);
    this.props.getTotalVotesCount(electionId.id);
  }

  componentWillUnmount() {
    // this.props.resetData();
  }

  render() {
    const {
      election = [],
      candidates = [],
      voters = [],
      // getTotalVotesCount,
      startVoting,
      stopVoting
    } = this.props;

    return (
      <React.Fragment>
        <div className="d-none">
          <QRToPrintComponent
            ref={el => (this.componentRef = el)}
            election={election}
            candidates={candidates}
          />
        </div>

        <h1 className="h3 mb-2 text-gray-800">{election.name}</h1>

        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Election's Summary
                </h6>

                {election.state === 'CREATED' ? (
                  <span className="badge badge-default badge-warning">
                    {election.state}
                  </span>
                ) : election.state === 'STARTED' ? (
                  <span className="badge badge-default badge-success">
                    {election.state}
                  </span>
                ) : (
                  <span className="badge badge-default badge-danger">
                    {election.state}
                  </span>
                )}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 mb-4">
                    <div className="card border-none bg-info text-white shadow">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-1 text-center h3 ">
                            <i className="fas fa-splotch"></i>
                          </div>
                          <div className="col-sm">{election.description}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-4">
                    <div className="card border-left-info h-100 py-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-1 text-center h3 ">
                            <FcAbout />
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
                                <FcCalendar /> Created at:
                                <span className="text-muted font-weight-bold">
                                  {' '}
                                  {election.createdAt}
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
                                  {election.votingType === 'SELECT_TO_VOTE'
                                    ? 'Select to vote'
                                    : election.votingType === 'SELECT_TO_REMOVE'
                                    ? 'Select to remove'
                                    : 'Select to trust'}
                                </span>
                              </p>

                              {election.votingType !== 'SELECT_TO_TRUST' && (
                                <div>
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
                              )}
                            </div>
                          </div>
                          <div className="col-sm">
                            <div className="col-lg-12">
                              {' '}
                              <div id="project-info" className="card-body row">
                                <div className="project-info-count col-lg-4 col-md-12">
                                  <div className="project-info-icon">
                                    <h2>{candidates.length}</h2>
                                    <div className="project-info-sub-icon">
                                      <span>
                                        <i className="fas fa-user-friends"></i>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="project-info-text pt-1">
                                    <h5>Candidates</h5>
                                  </div>
                                </div>
                                <div className="project-info-count col-lg-4 col-md-12">
                                  <div className="project-info-icon">
                                    <h2>{voters.length}</h2>
                                    <div className="project-info-sub-icon">
                                      <span>
                                        <i className="fas fa-users"></i>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="project-info-text pt-1">
                                    <h5>Voters</h5>
                                  </div>
                                </div>
                                <div className="project-info-count col-lg-4 col-md-12">
                                  <div className="project-info-icon">
                                    <h2>
                                      {election.votedCount}/{voters.length}
                                    </h2>
                                    <div className="project-info-sub-icon">
                                      <span>
                                        <i className="fas fa-vote-yea"></i>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="project-info-text pt-1">
                                    <h5>Voted</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-center text-center">
                      {election.state === 'CREATED' ? (
                        <div>
                          <button
                            className="btn mr-1 mb-1 btn-success"
                            onClick={e => {
                              e.preventDefault();
                              startVoting(election.id);
                            }}
                          >
                            <i className="fa fa-hourglass-start"></i> Start
                            voting now
                          </button>

                          <a
                            className="btn mr-1 mb-1 btn-info"
                            rel="noopener noreferrer"
                            target="_blank"
                            href={`${
                              ENV_DEPLOY === 'ropsten'
                                ? 'https://ropsten.etherscan.io/address/' +
                                  election.electionAddress
                                : 'https://etherscan.io/address/' +
                                  election.electionAddress
                            }`}
                            role="button"
                          >
                            <FaEthereum /> Explore on blockchain network
                          </a>

                          <ReactToPrint
                            trigger={() => (
                              <button className="btn mr-1 mb-1 btn-warning">
                                <i className="fa fa-print"></i> Print QR for
                                candidates
                              </button>
                            )}
                            content={() => this.componentRef}
                          />
                        </div>
                      ) : election.state === 'STARTED' ? (
                        <div>
                          <Link href={`/presentation?id=${election.id}`}>
                            <a
                              type="button"
                              className="btn mr-1 mb-1 btn-success"
                            >
                              <FaPlay /> Show election
                            </a>
                          </Link>
                          <Popup
                            trigger={
                              <a
                                type="button"
                                className="btn mr-1 mb-1 btn-info text-white"
                              >
                                <FaHandLizard /> Manual voting
                              </a>
                            }
                            modal
                          >
                            {close => (
                              <div className="hi">
                                <ManualVotingPopup
                                  candidates={candidates}
                                  electionId={election.id}
                                  onClick={() => close()}
                                />
                              </div>
                            )}
                          </Popup>

                          <button
                            type="button"
                            className="btn mr-1 mb-1 btn-warning"
                            onClick={e => {
                              e.preventDefault();
                              stopVoting(election.id);
                            }}
                          >
                            <FaStop /> Stop voting
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Link href={`/result?id=${election.id}`}>
                            <a
                              type="button"
                              className="btn mr-1 mb-1 btn-success"
                            >
                              <FaPoll /> View election result
                            </a>
                          </Link>
                          <Link href={`/vote-data?id=${election.id}`}>
                            <a type="button" className="btn mr-1 mb-1 btn-info">
                              <FaVoteYea /> View votes data
                            </a>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <div className="card shadow mb-4" style={{ height: '400px' }}>
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Candidates List
                </h6>
              </div>

              <div className="card-body overflow-auto">
                <DisplayUsersListComponent users={candidates} />
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className="card shadow mb-4" style={{ height: '400px' }}>
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Voters List
                </h6>
              </div>

              <div className="card-body overflow-auto">
                {' '}
                <DisplayUsersListComponent users={voters} />
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
export default enhance(ElectionComponent);
