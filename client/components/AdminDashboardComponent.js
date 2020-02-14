import React from 'react';
// import ReactTable from 'react-table';
// import Popup from 'reactjs-popup';

import SmallCardComponent from './SmallCardComponent';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, withState } from 'recompose';
import ElectionStatsComponent from './ElectionStatsComponent';
// import {
//   createVoting,
//   createVotingDataSelector,
//   getAllVoting,
//   getAllVotingDataDataSelector
// } from '../stores/VotingState';
import { getCurrentUserDataSelector } from '../stores/UserState';
import Sidebar from 'react-sidebar';

const withVotingName = withState('votingName', 'setVotingName', '');
const withSidebarState = withState('sidebarState', 'setSidebarState', false);

const connectToRedux = connect(
  createStructuredSelector({
    // successMessage: createVotingDataSelector,
    // votingList: getAllVotingDataDataSelector,
    currentUser: getCurrentUserDataSelector
  })
  // dispatch => ({
  //   // CreateVoting: votingName =>
  //   //   votingName && dispatch(createVoting(votingName)),
  //   // GetAllVoting: () => dispatch(getAllVoting())
  // })
);

const enhance = compose(
  withVotingName,
  connectToRedux,
  withSidebarState
);

class UserDashboardComponent extends React.Component {
  componentDidMount() {
    console.log(this.props.currentUser);
    // this.props.GetAllVoting();
  }

  render() {
    const {
      currentUser,
      sidebarState,
      setSidebarState,
      // setVotingName,
      // CreateVoting,
      // votingName,
      votingList
    } = this.props;
    console.log(votingList);
    return (
      <React.Fragment>
        <div className="app-content content">
          <Sidebar
            sidebar={
              <b>
                Sidebar content Sidebar content Sidebar content Sidebar content
                <button
                  type="button"
                  className="btn btn-secondary btn-min-width mr-1 mb-1"
                  onClick={() => setSidebarState(false)}
                >
                  Open side bar
                </button>
              </b>
            }
            open={sidebarState}
            //   onSetOpen={this.onSetSidebarOpen}
            styles={{
              sidebar: { background: 'white' },
              dragHandle: {
                zIndex: 1,
                position: 'fixed',
                top: 0
              },
              overlay: {
                zIndex: 1,
                position: 'fixed',
                opacity: 0,
                visibility: 'hidden',
                transition: 'opacity .3s ease-out, visibility .3s ease-out',
                backgroundColor: 'rgba(0,0,0,.3)'
              }
            }}
            pullRight={true}
            transitions
          ></Sidebar>
          <div className="content-wrapper">
            <div className="content-header row">
              <div className="content-header-left col-md-12 col-12 mb-1">
                <h3 className="content-header-title">Agu e-voting dashboard</h3>
              </div>
            </div>
            <div className="content-detached content-left">
              <div className="content-body">
                <section className="row">
                  <ElectionStatsComponent />
                </section>
              </div>
            </div>
            <div className="sidebar-detached sidebar-right">
              <div className="sidebar">
                <div className="project-sidebar-content">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">ETH network</h4>
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
                    <div className="card-content">
                      <div className="card-body border-top-blue-grey border-top-lighten-5">
                        <SmallCardComponent
                          title="Your wallet address"
                          content={currentUser.walletAddress}
                          classIcon="icon-wallet"
                          cardType="success"
                        />
                        <SmallCardComponent
                          title="Ether balance"
                          content={currentUser.balance}
                          classIcon="icon-diamond"
                          cardType="warning"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Project Overview</h4>
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
                            <a data-action="close">
                              <i className="ft-x"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="card-body">
                        <p>
                          <button
                            type="button"
                            className="btn btn-secondary btn-min-width mr-1 mb-1"
                            onClick={() => setSidebarState(true)}
                          >
                            Open side bar
                          </button>
                          <strong>Pellentesque habitant morbi tristique</strong>{' '}
                          senectus et netus et malesuada fames ac turpis
                          egestas. Vestibulum tortor quam, feugiat vitae.
                          <em>Aenean ultricies mi vitae est.</em> Mauris
                          placerat eleifend leo. Quisque sit amet est et sapien
                          ullamcorper pharetra. Vestibulum erat wisi,
                          condimentum sed, <code>commodo vitae</code>, ornare
                          sit amet, wisi. Aenean fermentum, elit eget tincidunt
                          condimentum, eros ipsum rutrum orci, sagittis tempus
                          lacus enim ac dui.
                          <a href="#">Donec non enim</a>.
                        </p>
                        <p>
                          <strong>Lorem ipsum dolor sit</strong>
                        </p>
                        <ol>
                          <li>Consectetuer adipiscing</li>
                          <li>Aliquam tincidunt mauris</li>
                          <li>Consectetur adipiscing</li>
                          <li>Vivamus pretium ornare</li>
                          <li>Curabitur massa</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default enhance(UserDashboardComponent);
