import React from 'react';
import ReactTable from 'react-table';
import Popup from 'reactjs-popup';

import SmallCardComponent from './SmallCardComponent';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, withState } from 'recompose';

import {
  createVoting,
  createVotingDataSelector,
  getAllVoting,
  getAllVotingDataDataSelector
} from '../stores/VotingState';
import { getCurrentUserDataSelector } from '../stores/UserState';

const withVotingName = withState('votingName', 'setVotingName', '');

const connectToRedux = connect(
  createStructuredSelector({
    successMessage: createVotingDataSelector,
    votingList: getAllVotingDataDataSelector,
    currentUser: getCurrentUserDataSelector
  }),
  dispatch => ({
    CreateVoting: votingName =>
      votingName && dispatch(createVoting(votingName)),
    GetAllVoting: () => dispatch(getAllVoting())
  })
);

const enhance = compose(
  withVotingName,
  connectToRedux
);

const COLUMNS = [
  {
    accessor: 'name',
    Header: 'Name'
  },
  {
    accessor: 'createdAt',
    Header: 'Created At'
  },
  {
    accessor: 'votingCode',
    Header: 'Voting Code'
  },
  {
    accessor: 'isClosed',
    Header: 'Active'
  }
];

class UserDashboardComponent extends React.Component {
  componentDidMount() {
    console.log(this.props.currentUser);
    this.props.GetAllVoting();
  }

  render() {
    const {
      currentUser,
      setVotingName,
      CreateVoting,
      votingName,
      votingList
    } = this.props;
    console.log(votingList);
    return (
      <React.Fragment>
        {/* <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Overview</h1>
            <a
              href="#"
              className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            >
              <i className="fas fa-download fa-sm text-white-50"></i> Generate
              Report
            </a>
          </div>

          <div className="row">
            <div className="col-xl-7 col-md-12 mb-4">
              <SmallCardComponent
                title="Your wallet"
                content={currentUser.walletAddress}
                classIcon="fas fa-wallet"
                borderColor="primary"
              />
            </div>

            <div className="col-xl-5 col-md-12 mb-4">
              <SmallCardComponent
                title="Balance"
                content={currentUser.balance}
                classIcon="fab fa-ethereum"
                borderColor="success"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    All elections
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

                <div className="card-body">
                  <div className="container">
                    <div className="row py-3">
                      <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card">
                          <div className="product-image">
                            <img
                              src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                              className="card-img-top"
                              alt="photo"
                            />
                          </div>

                          <div className="card-body">
                            <h4 className="card-title font-weight-bold mb-2">
                              Pair of brown leather boots beside bet
                            </h4>
                            <div className="rating py-2">
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star-half text-warning"></i>
                            </div>

                            <p className="card-text">
                              Take Bootstrap 4 to the next level with official
                              free themes and snippets.{' '}
                            </p>
                            <ul className="list-unstyled">
                              <li>
                                <i className="lnr lnr-checkmark-circle text-primary mr-2"></i>
                                Everything white and black
                              </li>
                              <li>
                                <i className="lnr lnr-checkmark-circle text-primary mr-2"></i>
                                More ram
                              </li>
                              <li>
                                <i className="lnr lnr-checkmark-circle text-primary mr-2"></i>
                                Better graphic card
                              </li>
                            </ul>
                            <p className="card-text color-dots">
                              Available in five different colors
                              <br />
                              <span className="d-inline-block rounded-circle bg-success"></span>
                              <span className="d-inline-block rounded-circle bg-primary"></span>
                              <span className="d-inline-block rounded-circle bg-secondary"></span>
                              <span className="d-inline-block rounded-circle bg-dark"></span>
                              <span className="d-inline-block rounded-circle bg-danger"></span>
                            </p>
                            <div className="text-right">
                              <button className="btn btn-block btn-primary">
                                Buy now
                                <i className="lnr lnr-chevron-right pl-2"></i>
                              </button>
                            </div>
                          </div>
                          <div className="card-footer bg-transparent d-flex justify-content-between">
                            <span>
                              Now
                              <strong className="font-weight-bold">
                                75% off
                              </strong>
                            </span>
                            <div>
                              <del className="text-muted mr-2">$300</del>
                              <strong className="text-primary font-weight-bold">
                                $75
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card ">
                          <div className="product-image">
                            <img
                              src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                              className="card-img-top"
                              alt="photo"
                            />
                          </div>

                          <div className="card-body">
                            <h4 className="card-title font-weight-bold mb-2">
                              Pair of brown leather boots beside bet
                            </h4>
                            <div className="rating py-2">
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star-half text-warning"></i>
                            </div>

                            <p className="card-text">
                              Take Bootstrap 4 to the next level with official
                              free themes and snippets.{' '}
                            </p>
                            <ul className="list-unstyled">
                              <li>
                                <i className="fas fa-users"></i>
                                Everything white and black
                              </li>
                              <li>
                                <i className="lnr lnr-checkmark-circle text-primary mr-2"></i>
                                More ram
                              </li>
                              <li>
                                <i className="lnr lnr-checkmark-circle text-primary mr-2"></i>
                                Better graphic card
                              </li>
                            </ul>
                            <p className="card-text color-dots">
                              Available in five different colors
                              <br />
                              <span className="d-inline-block rounded-circle bg-success"></span>
                              <span className="d-inline-block rounded-circle bg-primary"></span>
                              <span className="d-inline-block rounded-circle bg-secondary"></span>
                              <span className="d-inline-block rounded-circle bg-dark"></span>
                              <span className="d-inline-block rounded-circle bg-danger"></span>
                            </p>
                            <div className="text-right">
                              <button className="btn btn-block btn-primary">
                                Buy now
                                <i className="lnr lnr-chevron-right pl-2"></i>
                              </button>
                            </div>
                          </div>
                          <div className="card-footer bg-transparent d-flex justify-content-between">
                            <span>
                              Now
                              <strong className="font-weight-bold">
                                75% off
                              </strong>
                            </span>
                            <div>
                              <del className="text-muted mr-2">$300</del>
                              <strong className="text-primary font-weight-bold">
                                $75
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4">
                        <div className="card ">
                          <div className="product-image">
                            <img
                              src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                              className="card-img-top"
                              alt="photo"
                            />
                          </div>

                          <div className="card-body">
                            <h4 className="card-title font-weight-bold mb-2">
                              Pair of brown leather boots beside bet
                            </h4>
                            <div className="rating py-2">
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star text-warning"></i>
                              <i className="lnr lnr-star-half text-warning"></i>
                            </div>

                            <p className="card-text">
                              Take Bootstrap 4 to the next level with official
                              free themes and snippets.{' '}
                            </p>
                            <ul className="list-unstyled">
                              <li>
                                <i className="lnr lnr-checkmark-circle text-primary mr-2"></i>
                                Everything white and black
                              </li>
                              <li>
                                <i className="lnr lnr-checkmark-circle text-primary mr-2"></i>
                                More ram
                              </li>
                              <li>
                                <i className="lnr lnr-checkmark-circle text-primary mr-2"></i>
                                Better graphic card
                              </li>
                            </ul>
                            <p className="card-text color-dots">
                              Available in five different colors
                              <br />
                              <span className="d-inline-block rounded-circle bg-success"></span>
                              <span className="d-inline-block rounded-circle bg-primary"></span>
                              <span className="d-inline-block rounded-circle bg-secondary"></span>
                              <span className="d-inline-block rounded-circle bg-dark"></span>
                              <span className="d-inline-block rounded-circle bg-danger"></span>
                            </p>
                            <div className="text-right">
                              <button className="btn btn-block btn-primary">
                                Buy now
                                <i className="lnr lnr-chevron-right pl-2"></i>
                              </button>
                            </div>
                          </div>
                          <div className="card-footer bg-transparent d-flex justify-content-between">
                            <span>
                              Now
                              <strong className="font-weight-bold">
                                75% off
                              </strong>
                            </span>
                            <div>
                              <del className="text-muted mr-2">$300</del>
                              <strong className="text-primary font-weight-bold">
                                $75
                              </strong>
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
        </div>*/}
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-header row">
              <div className="content-header-left col-md-6 col-12 mb-1">
                <h3 className="content-header-title">Invoice Template</h3>
              </div>
              <div className="content-header-right breadcrumbs-right breadcrumbs-top col-md-6 col-12">
                <div className="breadcrumb-wrapper col-12">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Invoice</a>
                    </li>
                    <li className="breadcrumb-item active">Invoice Template</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="content-body">
              <section className="card">
                <div id="invoice-template" className="card-body">
                  <div id="invoice-company-details" className="row">
                    <div className="col-md-6 col-sm-12 text-center text-md-left">
                      <div className="media">
                        <img
                          src="../../../app-assets/images/logo/stack-80x80.png"
                          alt="company logo"
                          className=""
                        />
                        <div className="media-body">
                          <ul className="ml-2 px-0 list-unstyled">
                            <li className="text-bold-800">
                              Stack Creative Studio
                            </li>
                            <li>4025 Oak Avenue,</li>
                            <li>Melbourne,</li>
                            <li>Florida 32940,</li>
                            <li>USA</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-12 text-center text-md-right">
                      <h2>INVOICE</h2>
                      <p className="pb-3"># INV-001001</p>
                      <ul className="px-0 list-unstyled">
                        <li>Balance Due</li>
                        <li className="lead text-bold-800">$ 12,000.00</li>
                      </ul>
                    </div>
                  </div>

                  <div id="invoice-customer-details" className="row pt-2">
                    <div className="col-sm-12 text-center text-md-left">
                      <p className="text-muted">Bill To</p>
                    </div>
                    <div className="col-md-6 col-sm-12 text-center text-md-left">
                      <ul className="px-0 list-unstyled">
                        <li className="text-bold-800">Mr. Bret Lezama</li>
                        <li>4879 Westfall Avenue,</li>
                        <li>Albuquerque,</li>
                        <li>New Mexico-87102.</li>
                      </ul>
                    </div>
                    <div className="col-md-6 col-sm-12 text-center text-md-right">
                      <p>
                        <span className="text-muted">Invoice Date :</span>{' '}
                        06/05/2016
                      </p>
                      <p>
                        <span className="text-muted">Terms :</span> Due on
                        Receipt
                      </p>
                      <p>
                        <span className="text-muted">Due Date :</span>{' '}
                        10/05/2016
                      </p>
                    </div>
                  </div>

                  <div id="invoice-items-details" className="pt-2">
                    <div className="row">
                      <div className="table-responsive col-sm-12">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Item & Description</th>
                              <th className="text-right">Rate</th>
                              <th className="text-right">Hours</th>
                              <th className="text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>
                                <p>Create PSD for mobile APP</p>
                                <p className="text-muted">
                                  Simply dummy text of the printing and
                                  typesetting industry.
                                </p>
                              </td>
                              <td className="text-right">$ 20.00/hr</td>
                              <td className="text-right">120</td>
                              <td className="text-right">$ 2400.00</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>
                                <p>iOS Application Development</p>
                                <p className="text-muted">
                                  Pellentesque maximus feugiat lorem at cursus.
                                </p>
                              </td>
                              <td className="text-right">$ 25.00/hr</td>
                              <td className="text-right">260</td>
                              <td className="text-right">$ 6500.00</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>
                                <p>WordPress Template Development</p>
                                <p className="text-muted">
                                  Vestibulum euismod est eu elit convallis.
                                </p>
                              </td>
                              <td className="text-right">$ 20.00/hr</td>
                              <td className="text-right">300</td>
                              <td className="text-right">$ 6000.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-7 col-sm-12 text-center text-md-left">
                        <p className="lead">Payment Methods:</p>
                        <div className="row">
                          <div className="col-md-8">
                            <table className="table table-borderless table-sm">
                              <tbody>
                                <tr>
                                  <td>Bank name:</td>
                                  <td className="text-right">ABC Bank, USA</td>
                                </tr>
                                <tr>
                                  <td>Acc name:</td>
                                  <td className="text-right">Amanda Orton</td>
                                </tr>
                                <tr>
                                  <td>IBAN:</td>
                                  <td className="text-right">
                                    FGS165461646546AA
                                  </td>
                                </tr>
                                <tr>
                                  <td>SWIFT code:</td>
                                  <td className="text-right">BTNPP34</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-5 col-sm-12">
                        <p className="lead">Total due</p>
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td>Sub Total</td>
                                <td className="text-right">$ 14,900.00</td>
                              </tr>
                              <tr>
                                <td>TAX (12%)</td>
                                <td className="text-right">$ 1,788.00</td>
                              </tr>
                              <tr>
                                <td className="text-bold-800">Total</td>
                                <td className="text-bold-800 text-right">
                                  {' '}
                                  $ 16,688.00
                                </td>
                              </tr>
                              <tr>
                                <td>Payment Made</td>
                                <td className="pink text-right">
                                  (-) $ 4,688.00
                                </td>
                              </tr>
                              <tr className="bg-grey bg-lighten-4">
                                <td className="text-bold-800">Balance Due</td>
                                <td className="text-bold-800 text-right">
                                  $ 12,000.00
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="text-center">
                          <p>Authorized person</p>
                          <img
                            src="../../../app-assets/images/pages/signature-scan.png"
                            alt="signature"
                            className="height-100"
                          />
                          <h6>Amanda Orton</h6>
                          <p className="text-muted">Managing Director</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="invoice-footer">
                    <div className="row">
                      <div className="col-md-7 col-sm-12">
                        <h6>Terms & Condition</h6>
                        <p>
                          You know, being a test pilot isn't always the
                          healthiest business in the world. We predict too much
                          for the next year and yet far too little for the next
                          10.
                        </p>
                      </div>
                      <div className="col-md-5 col-sm-12 text-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg my-1"
                        >
                          <i className="fa fa-paper-plane-o"></i> Send Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default enhance(UserDashboardComponent);
