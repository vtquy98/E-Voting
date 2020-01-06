import React from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import dynamic from 'next/dynamic';
import { compose, withState } from 'recompose';
import Router from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  getVoting,
  getVotingDataSelector,
  resetDataGetVoting,
  getVotingErrorSelector
} from '../stores/VotingState';
const QrReader = dynamic(import('react-qr-reader'), { ssr: false });
const withInputState = withState('stateInput', 'setStateInput', true);
const withVotingCodeState = withState('votingCode', 'setVotingCode', '');

const connectToRedux = connect(
  createStructuredSelector({
    successMessage: getVotingDataSelector,
    errorMessage: getVotingErrorSelector
  }),
  dispatch => ({
    GetVoting: votingCode => dispatch(getVoting(parseInt(votingCode))),
    resetData: () => {
      resetDataGetVoting(dispatch);
    }
  })
);
const enhance = compose(
  connectToRedux,
  withInputState,
  withVotingCodeState
);

const redirect = code => {
  Router.push(`/voting?code=${code}`);
};

const VoteComponent = ({
  stateInput,
  setStateInput,
  votingCode,
  setVotingCode,
  GetVoting,
  successMessage,
  errorMessage
}) => (
  <div className="main-panel-custom">
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-profile">
              <div className="card-avatar">
                <img
                  className="img"
                  src="static/assets/img/voting.jpg"
                  alt=""
                />
              </div>
              <div className="card-content">
                <h2 className="card-title">Please enter the code</h2>
                <div className="nav-center">
                  <ul
                    className="nav nav-pills nav-pills-warning nav-pills-icons"
                    role="tablist"
                  >
                    <li className={`${stateInput && 'active'} `}>
                      <a
                        href="panels.html#schedule-1"
                        role="tab"
                        data-toggle="tab"
                        aria-expanded="false"
                        onClick={() => {
                          setStateInput(true);
                        }}
                      >
                        <i className="material-icons">keyboard</i> Input the
                        code
                      </a>
                    </li>

                    <li className="">
                      <a
                        href="panels.html#tasks-2"
                        role="tab"
                        data-toggle="tab"
                        aria-expanded="true"
                        onClick={() => {
                          setStateInput(false);
                        }}
                      >
                        <i className="material-icons">camera_alt</i> Scan QR
                        code
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="row center">
                  <div className="col-lg-6">
                    {stateInput ? (
                      <div className="form-group label-floating is-empty">
                        <input
                          className="form-control"
                          name="number"
                          type="text"
                          required="true"
                          number="true"
                          placeholder="12 34 56"
                          onChange={e => setVotingCode(e.currentTarget.value)}
                        />
                        <span className="material-input"></span>

                        {errorMessage && (
                          <p className="text-danger">
                            Could not be found. Please try again.
                          </p>
                        )}

                        {successMessage && redirect(successMessage.votingCode)}

                        <button
                          className="btn btn-info"
                          onClick={e => {
                            e.preventDefault();
                            GetVoting(votingCode);
                          }}
                        >
                          Submit<div className="ripple-container"></div>
                        </button>
                        <p className="card-description">
                          The code is found on the screen in front of you
                        </p>
                      </div>
                    ) : (
                      <div className="">
                        <QrReader
                          delay={300}
                          // onError={this.handleError}
                          // onScan={this.handleScan}
                          style={{ width: '100%' }}
                        />
                        <p className="card-description card-description-custom">
                          The QR code is found on the screen in front of you
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="row">
                  
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .main-panel-custom {
        padding-top: 32px;
        position: relative;
        overflow: auto;
        min-height: 100%;
        -webkit-transform: translate3d(0px, 0, 0);
        -moz-transform: translate3d(0px, 0, 0);
        -o-transform: translate3d(0px, 0, 0);
        -ms-transform: translate3d(0px, 0, 0);
        transform: translate3d(0px, 0, 0);
        -webkit-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
        -moz-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
        -o-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
        -ms-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
        transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
      }
      .card-profile .card-avatar,
      .card-testimonial .card-avatar {
        max-width: 130px;
        max-height: 130px;
        margin: -50px auto 0;
        border-radius: 8%;
        overflow: hidden;
        box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42),
          0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
      }
      .center {
        display: flex;
        justify-content: center;
      }
      .card-description-custom {
        padding-top: 12px;
      }
    `}</style>
  </div>
);

export default enhance(VoteComponent);
