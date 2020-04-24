import dynamic from 'next/dynamic';
import React from 'react';
import Countdown from 'react-countdown';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  getAllCandidates,
  getAllCandidatesDataSelector,
  getAllVoters,
  getAllVotersDataSelector,
  getElection,
  getElectionDataSelector,
  getElectionErrorSelector,
  getTotalVotesCount,
  getTotalVotesCountDataSelector
} from '../stores/ElectionState';
import {
  getAllUsersDataSelector,
  getCurrentUserDataSelector
} from '../stores/UserState';
import QRCodeComponent from './QRCodeComponent';
import { createVotingUrl } from '../libs';

import { FaQrcode } from 'react-icons/fa';

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

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="pt-1 h2 text-center">
        {minutes}:{seconds}
        <h4>
          <span className="icon-clock"></span> Time remaining
        </h4>
      </div>
    );
  }
};

class PresentationElectionComponent extends React.Component {
  componentDidMount() {
    const { electionId } = this.props;
    this.props.getElection(electionId.id);
    this.props.getAllCandidates(electionId.id);
  }

  componentWillUnmount() {
    //do later!
    // this.props.resetData();
  }

  render() {
    const { election = [], candidates = [] } = this.props;

    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/custom/owl.css"
        />

        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow border-none mb-4">
              <div className="card-header py-3 text-center">
                <h6 className="m-0 font-weight-bold text-primary ">
                  {election.electionOwner}
                </h6>
                <h3 className="mt-2 mb-0 font-weight-bold text-primary ">
                  {election.name}
                </h3>
              </div>
              <div className="card-body">
                <OwlCarousel
                  className="owl-theme"
                  loop
                  items={2}
                  margin={3}
                  autoplay
                  autoplayTimeout={5000}
                  responsive={{
                    0: {
                      items: 1
                    },
                    600: {
                      items: 2
                    }
                  }}
                >
                  {candidates.length &&
                    candidates.map((candidate, index) => (
                      <div className="profile-card mb-4" key={index}>
                        <div className="mask-shadow"></div>
                        <header>
                          <a href="#">
                            <img src={candidate.avatar} alt="" />
                          </a>
                          <h1 className="mt-4">{candidate.fullName}</h1>
                          <h2>{candidate.department}</h2>
                        </header>

                        <div className="profile-bio">
                          <p>{candidate.summaryDescription}</p>
                        </div>
                      </div>
                    ))}
                </OwlCarousel>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="row">
              <div className="col-xl-12 col-lg-6 col-md-12">
                <div className="card shadow border-none mb-4">
                  <div className="card-header py-3 text-center">
                    <h6 className="m-0 font-weight-bold text-primary">
                      <FaQrcode /> Scan to vote now
                    </h6>
                  </div>
                  <div className="card-body">
                    {' '}
                    <QRCodeComponent
                      text={createVotingUrl({
                        electionId: election.id
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="col-xl-12 col-lg-6 col-md-12">
                <div className="card bg-primary text-white shadow">
                  <div className="card-body">
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

        <style jsx>
          {`
            .profile-card {
              position: relative;
              width: 280px;
              margin: 0 auto;
              padding: 40px 30px 30px;
              background: #fff;
              border: 5px solid rgba(255, 255, 255, 0.7);
              text-align: center;
              border-radius: 4px;
              transition: all 200ms ease;
              // box-shadow: 0px 30px 60px -5px rgba(55, 55, 71, 0.3);
              box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
              transform: translate3d(0, -5px, 0);
              margin-top: 120px;
            }

            .profile-card:hover {
              transform: translate3d(0, -5px, 0);
            }

            .profile-card header {
              display: block;
              margin-bottom: 10px;
            }

            .profile-card header a {
              width: 150px;
              height: 150px;
              display: block;
              border-radius: 100%;
              margin: -120px auto 0;
              box-shadow: 0 0 0 5px #4e73df;
            }

            .profile-card header a img {
              border-radius: 50%;
              width: 150px;
              height: 150px;
            }

            .profile-card:hover header a,
            .profile-card header a:hover {
              animation: bounceOut 0.4s linear;
              -webkit-animation: bounceOut 0.4s linear;
            }

            .profile-card header h1 {
              font-size: 20px;
              color: #444;
              text-transform: uppercase;
              margin-bottom: 5px;
            }

            .profile-card header h2 {
              font-size: 14px;
              color: #acacac;
              text-transform: uppercase;
              margin: 0;
            }

            /*content*/
            .profile-bio {
              font-size: 14px;
              color: #a5a5a5;
              line-height: 1.7;
              font-style: italic;
              margin-bottom: 30px;
            }

            /*link social*/
            .profile-social-links {
              margin: 0;
              padding: 0;
              list-style: none;
            }

            .profile-social-links li {
              display: inline-block;
              margin: 0 10px;
            }

            .profile-social-links li a {
              width: 55px;
              height: 55px;
              display: block;
              background: #f1f1f1;
              border-radius: 50%;
              -webkit-transition: all 2.75s cubic-bezier(0, 0.83, 0.17, 1);
              -moz-transition: all 2.75s cubic-bezier(0, 0.83, 0.17, 1);
              -o-transition: all 2.75s cubic-bezier(0, 0.83, 0.17, 1);
              transition: all 2.75s cubic-bezier(0, 0.83, 0.17, 1);
              transform-style: preserve-3d;
            }

            .profile-social-links li a img {
              width: 35px;
              height: 35px;
              margin: 10px auto 0;
            }

            .profile-social-links li a:hover {
              background: #ddd;
              transform: scale(1.2);
              -webkit-transform: scale(1.2);
            }

            /*animation hover effect*/
            @-webkit-keyframes bounceOut {
              0% {
                box-shadow: 0 0 0 4px #82b541;
                opacity: 1;
              }
              25% {
                box-shadow: 0 0 0 1px #82b541;
                opacity: 1;
              }
              50% {
                box-shadow: 0 0 0 7px #82b541;
                opacity: 1;
              }
              75% {
                box-shadow: 0 0 0 4px #82b541;
                opacity: 1;
              }
              100% {
                box-shadow: 0 0 0 5px #82b541;
                opacity: 1;
              }
            }
            @keyframes bounceOut {
              0% {
                box-shadow: 0 0 0 6px #82b541;
                opacity: 1;
              }
              25% {
                box-shadow: 0 0 0 2px #82b541;
                opacity: 1;
              }
              50% {
                box-shadow: 0 0 0 9px #82b541;
                opacity: 1;
              }
              75% {
                box-shadow: 0 0 0 3px #82b541;
                opacity: 1;
              }
              100% {
                box-shadow: 0 0 0 5px #82b541;
                opacity: 1;
              }
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}
export default enhance(PresentationElectionComponent);
