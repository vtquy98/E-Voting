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
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-header row">
              <div className="content-header-left col-md-6 col-12 mb-1">
                <h3 className="content-header-title">{election.name}</h3>
              </div>
            </div>
            <div className="">
              <div className="content-body">
                <section id="descriptioin" className="card">
                  <div className="card-header">
                    <h4 className="card-title">summary</h4>
                    <div className="heading-elements">
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
                  </div>
                  <div className="card-content">
                    <ul className="list-inline list-inline-pipe text-center p-1 border-bottom-grey border-bottom-lighten-3">
                      <li>
                        Election Owner:{' '}
                        <span className="text-muted">
                          {election.electionOwner}
                        </span>
                      </li>
                      <li>
                        Created at:{' '}
                        <span className="text-muted">{election.createdAt}</span>
                      </li>
                      <li>
                        Voting time:{' '}
                        <span className="text-muted">
                          {election.votingTime} min
                        </span>
                      </li>
                      <li>
                        Voting type:{' '}
                        <span className="text-muted">
                          {election.votingType === 'SELECT_TO_VOTE'
                            ? 'Select to vote'
                            : election.votingType === 'SELECT_TO_REMOVE'
                            ? 'Select to remove'
                            : 'Select to trust'}
                        </span>
                      </li>
                      <li>
                        {/* HANDLE IT WHEN CHOOSE TRUST VOTE */}
                        At least choose:{' '}
                        <span className="text-muted">
                          {election.atLeastVote}
                        </span>
                      </li>
                      <li>
                        Most choose:{' '}
                        <span className="text-muted">{election.mostVote}</span>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-muted"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title=""
                          data-original-title="Export as PDF"
                        >
                          <i className="fa fa-file-excel-o"></i>
                        </a>
                      </li>
                    </ul>

                    <div className="card-body">
                      <div className="card-text text-center">
                        <p>{election.description}</p>
                      </div>
                      <div id="project-info" className="card-body row">
                        <div className="project-info-count col-lg-4 col-md-12">
                          <div className="project-info-icon">
                            <h2>{candidates.length}</h2>
                            <div className="project-info-sub-icon">
                              <span className="icon-user"></span>
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
                              <span className="ft-users"></span>
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
                              <span className="icon-layers"></span>
                            </div>
                          </div>
                          <div className="project-info-text pt-1">
                            <h5>Voted</h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
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
                              <i className="fa fa-btc"></i> Explore on
                              blockchain network
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
                            <Popup
                              trigger={
                                <a
                                  type="button"
                                  className="btn mr-1 mb-1 btn-info text-white"
                                >
                                  <i className="fa fa-hand-paper-o"></i> Manual
                                  voting
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
                              <i className="fa fa-hand-paper-o"></i> Stop voting
                              and caculate result
                            </button>
                          </div>
                        ) : (
                          <Link href={`/election-result?id=${election.id}`}>
                            <a
                              type="button"
                              className="btn mr-1 mb-1 btn-success"
                            >
                              View election result
                            </a>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="card">
                  <div className="card-header">
                    <h4 className="card-title">Candidates</h4>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <div className="card-text">
                        <p>
                          This table contains all classNamees related to the
                          content detached left sticky sidebar layout. This is a
                          custom layout classNamees for content detached left
                          sticky sidebar layout page requirements.
                        </p>
                        <p>All of candidates:</p>
                        {!candidates.length ? (
                          <div
                            className="alert alert-icon-right alert-info alert-dismissible mb-2"
                            role="alert"
                          >
                            <strong>Heads up!</strong> This election does have
                            any candidate, let's try{' '}
                            <a href="#" className="alert-link">
                              add someone
                            </a>
                          </div>
                        ) : (
                          <div className="row">
                            {candidates.map((candidate, index) => (
                              <div
                                className="col-xl-4 col-md-4 col-sm-12"
                                key={index}
                              >
                                <div className="card">
                                  <div className="card-content">
                                    <div className="card-body">
                                      <h4 className="card-title">
                                        {candidate.fullName}
                                      </h4>
                                      <img
                                        className="img-fluid my-1"
                                        src={candidate.avatar}
                                        alt="Card"
                                      />

                                      <p className="card-text">
                                        {/* {candidate.description} DO LATER!!! */}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                <section id="html-markup" className="card">
                  <div className="card-header">
                    <h4 className="card-title">Voters</h4>
                    <a className="heading-elements-toggle">
                      <i className="fa fa-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0">
                        <li>
                          <a data-action="collapse">
                            <i className="ft-minus"></i>
                          </a>
                        </li>
                        <li>
                          <a data-action="reload">
                            <i className="ft-rotate-cw"></i>
                          </a>
                        </li>
                        <li>
                          <a data-action="close">
                            <i className="ft-x"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-content vertical-scroll scroll-example height-300">
                    <div className="card-body">
                      <div className="card-text">
                        <p>
                          This table contains all classNamees related to the
                          content detached left sticky sidebar layout. This is a
                          custom layout classNamees for content detached left
                          sticky sidebar layout page requirements.
                        </p>
                        <p>scroll to view all of voters:</p>
                        {!voters.length ? (
                          <div
                            className="alert alert-icon-right alert-info alert-dismissible mb-2"
                            role="alert"
                          >
                            <strong>Heads up!</strong> This election does have
                            any voter, let's try{' '}
                            <a href="#" className="alert-link">
                              add someone
                            </a>
                          </div>
                        ) : (
                          <div className="row">
                            {voters.map((voter, index) => (
                              <div
                                className="col-xl-4 col-md-4 col-sm-12"
                                key={index}
                              >
                                <div className="card">
                                  <div className="card-content">
                                    <div className="card-body">
                                      <h4 className="card-title">
                                        {voter.fullName}
                                      </h4>
                                      <img
                                        className="img-fluid my-1"
                                        src={voter.avatar}
                                        alt="Card"
                                      />

                                      <p className="card-text">
                                        {/* {candidate.description} DO LATER!!! */}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
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
          `}</style>
        </div>
      </React.Fragment>
    );
  }
}
export default enhance(ElectionComponent);
