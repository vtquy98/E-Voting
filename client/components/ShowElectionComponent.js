import dynamic from 'next/dynamic';
import React from 'react';
import Countdown from 'react-countdown';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
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
  getTotalVotesCountDataSelector
  // resetDatagetTotalVotesCount
} from '../stores/ElectionState';
import {
  getAllUsersDataSelector,
  getCurrentUserDataSelector
} from '../stores/UserState';
import QRCodeComponent from './QRCodeComponent';
import { createVotingUrl } from '../libs';

const OwlCarousel = dynamic(import('react-owl-carousel'), { ssr: false });

const connectToRedux = connect(
  createStructuredSelector({
    election: getElectionDataSelector,
    errorMessage: getElectionErrorSelector,
    candidates: getAllCandidatesDataSelector,
    voters: getAllVotersDataSelector,
    totalVoteCount: getTotalVotesCountDataSelector,
    currentUser: getCurrentUserDataSelector,
    users: getAllUsersDataSelector
  }),
  dispatch => ({
    getElection: id => dispatch(getElection(id)),
    getAllCandidates: electionId => dispatch(getAllCandidates(electionId)),
    getAllVoters: electionId => dispatch(getAllVoters(electionId)),
    getTotalVotesCount: electionId => dispatch(getTotalVotesCount(electionId))
  })
);

const enhance = compose(connectToRedux);

const Completionist = () => (
  <div className="card bg-danger white">
    <div className="card-content">
      <div className="card-body">
        <div className="text-center mb-1">
          <i className="ft-clock font-large-3"></i>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 text-center clearfix">
            <h2 className="pt-1">
              <span> Time's up! Please waiting for the election result!</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Renderer callback with condition
const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="card bg-success white">
        <div className="card-content">
          <div className="card-body">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 text-center clearfix">
                <h2 className="pt-1">
                  {minutes}:{seconds}
                  <h4>
                    <span className="icon-clock"></span> Time remaining
                  </h4>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

class ShowElectionComponent extends React.Component {
  componentDidMount() {
    const { electionId } = this.props;
    this.props.getElection(electionId.id);
    this.props.getAllCandidates(electionId.id);
  }

  componentWillUnmount() {
    // this.props.resetData();
  }

  render() {
    const {
      election = [],
      // users = [],
      candidates = []
      // voters = [],
      // getTotalVotesCount
    } = this.props;
    console.log(election);
    console.log(candidates);

    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          type="text/css"
          href="static/assets/css/pages/owl.carousel.min.css"
        />
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-body">
              <div className="row">
                <div className="col-xl-8 col-lg-12 col-md-12">
                  <div className="card">
                    <div className="card-header border-0-bottom">
                      <h1 className="card-title text-center mb-2">
                        {election.electionOwner}
                      </h1>
                      <h1 className="text-center text-uppercase">
                        {election.name}
                      </h1>
                    </div>
                    <div className="card-content">
                      <div className="card-body">
                        <div className="col-md-12 col-12 text-center">
                          {election.description}
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-sm-12">
                            <div className="card">
                              <div className="card-content">
                                <div className="card-body">
                                  <OwlCarousel
                                    className="owl-theme"
                                    loop
                                    items={2}
                                    margin={3}
                                    autoplay
                                    autoplayTimeout={2000}
                                  >
                                    {candidates.length &&
                                      candidates.map((candidate, index) => (
                                        <div className="item" key={index}>
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

                                                {/* <p className="card-text">
                                                {candidate.description} DO LATER!!!
                                              </p> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </OwlCarousel>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div className="col-md-6 col-12">
                          <img
                            className="card-img-top mb-1 img-fluid"
                            src={election.thumbnail}
                            alt={election.name}
                            height="100"
                          />
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-xl-12 col-lg-6 col-md-12">
                      <div className="card text-white bg-info">
                        <div className="card-header">
                          <h4 className="card-title">Scan to vote now</h4>
                        </div>
                        <div className="card-content">
                          <div className="card-body">
                            <QRCodeComponent
                              text={createVotingUrl({
                                electionId: election.id
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-12">
                      <Countdown
                        date={Date.now() + election.votingTime * 60 * 1000}
                        renderer={renderer}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            .content {
              margin-left: 10px !important;
            }
          `}</style>
        </div>
      </React.Fragment>
    );
  }
}
export default enhance(ShowElectionComponent);
