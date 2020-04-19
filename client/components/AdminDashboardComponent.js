import React from 'react';
import SmallCardComponent from './SmallCardComponent';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, withState } from 'recompose';
import ElectionStatsComponent from './ElectionStatsComponent';
import { getCurrentUserDataSelector } from '../stores/UserState';

const withVotingName = withState('votingName', 'setVotingName', '');

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
  connectToRedux
);

class UserDashboardComponent extends React.Component {
  componentDidMount() {
    // this.props.GetAllVoting();
  }

  render() {
    const { currentUser } = this.props;

    return (
      <React.Fragment>
        {/* <div className="app-content content">
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
                      <h4 className="card-title">How to using?</h4>
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
                          <strong>Thank you for using our system.</strong>
                          <br /> We hope we can bring you good experience.
                          <br />
                        </p>
                        <p>
                          In this dashboard, you can view all elections, create
                          new election, view your ethereum wallet address also
                          current balance.
                        </p>
                        <p>
                          <strong>To Create new Election:</strong>
                        </p>
                        <div className="ml-2 mt-1">
                          <li>
                            Click <code>create new eleciton</code>, type
                            Election's name
                          </li>
                          <li>Wating for success</li>
                          <li>
                            Finish some election's information for anyone know
                            more that.
                          </li>
                        </div>
                        <div>
                          <strong>Why any action take so long ?</strong>
                          <div className="ml-2 mt-1">
                            <li>
                              Well, any action on AGU E-Voting will be write on
                              <code>blockchain</code>, so we must be waitting
                              for
                              <code>Consensus Mechanism</code>
                            </li>
                            <li className="mt-1">
                              Usually, each action takes about 1 minute
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
       */}

        <h1 className="h3 mb-4 text-gray-800">Admin Dashboard</h1>

        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Earnings (Monthly)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $40,000
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                      Earnings (Annual)
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      $215,000
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-info shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Tasks
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col-auto">
                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                          50%
                        </div>
                      </div>
                      <div className="col">
                        <div className="progress progress-sm mr-2">
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Pending Requests
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      18
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8 col-lg-7">
            <ElectionStatsComponent />
          </div>

          <div className="col-xl-4 col-lg-5">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Revenue Sources
                </h6>
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

              <div className="card-body">ahihi</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Illustrations
                </h6>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <img
                    className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                    src="img/undraw_posting_photo.svg"
                    alt=""
                  />
                </div>
                <p>
                  Add some quality, svg illustrations to your project courtesy
                  of{' '}
                  <a rel="nofollow" href="https://undraw.co/">
                    unDraw
                  </a>
                  , a constantly updated collection of beautiful svg images that
                  you can use completely free and without attribution!
                </p>
                <a rel="nofollow" href="https://undraw.co/">
                  Browse Illustrations on unDraw &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default enhance(UserDashboardComponent);
