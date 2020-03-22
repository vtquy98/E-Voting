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
        <div className="app-content content">
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
      </React.Fragment>
    );
  }
}

export default enhance(UserDashboardComponent);
