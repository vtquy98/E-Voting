import React from 'react';
import ReactTable from 'react-table';
import Popup from 'reactjs-popup';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, withState } from 'recompose';

import {
  createVoting,
  createVotingDataSelector,
  getAllVoting,
  getAllVotingDataDataSelector
} from '../stores/VotingState';

const withVotingName = withState('votingName', 'setVotingName', '');

const connectToRedux = connect(
  createStructuredSelector({
    successMessage: createVotingDataSelector,
    votingList: getAllVotingDataDataSelector
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
    this.props.GetAllVoting();
  }

  render() {
    const { setVotingName, CreateVoting, votingName, votingList } = this.props;
    console.log(votingList);
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/customs/react-table.css"
        />
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div
                    className="card-header card-header-icon"
                    data-background-color="green"
                  >
                    <i className="material-icons">equalizer</i>
                  </div>
                  <div className="card-content">
                    <h4 className="card-title">Your voting </h4>
                    <div className="d-flex justify-content-between">
                      <div className="col-lg-2">
                        <Popup
                          trigger={
                            <a
                              href="#pablo"
                              className="btn btn-success btn-just-icon btn-fill btn-round ml-2"
                            >
                              <i className="material-icons">add</i>
                            </a>
                          }
                          modal
                        >
                          {close => (
                            <div>
                              <div className="modal-body">
                                <div class="form-group">
                                  <div className="card-title">
                                    <h3>Create new voting</h3>
                                  </div>
                                  <input
                                    id="input-field"
                                    type="text"
                                    className="form-control"
                                    placeholder="Name of the voting"
                                    onChange={e =>
                                      setVotingName(e.currentTarget.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-success btn-link"
                                  onClick={e => {
                                    e.preventDefault();
                                    CreateVoting(votingName);
                                  }}
                                >
                                  Create voting
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline btn-link"
                                  onClick={() => close()}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </Popup>
                      </div>
                      <div className="col-md-6 col-md-offset-4">
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="material-icons">search</i>
                          </span>
                          <div className="form-group label-floating is-empty">
                            <label className="control-label">
                              Type to search
                            </label>
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                            />
                            <span className="material-input"></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ReactTable
                      data={votingList}
                      manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                      // pages={Math.ceil(
                      //   totalCount / (pageSize || PAGE_SIZE_DEFAULT)
                      // )} // Display the total number of pages
                      // onFetchData={e => this.fetchData(e, { dispatchAction })}
                      defaultPageSize={5}
                      // page={page || PAGE_DEFAULT}
                      // pageSize={pageSize || PAGE_SIZE_DEFAULT}
                      className="-striped -highlight"
                      columns={COLUMNS}
                      // previousText={
                      //   <div className="custom-button-footer">
                      //     {t('table.previous_text')}
                      //   </div>
                      // }
                      // nextText={
                      //   <div className="custom-button-footer">
                      //     {t('table.next_text')}
                      //   </div>
                      // }
                      // noDataText={t('table.no_rows_text')}
                      // pageText={t('table.page_text')}
                      // rowsText={t('table.rows_text')}
                      // loadingText={t('table.loading_text')}
                      // ofText={t('table.of_text')}
                    />
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
