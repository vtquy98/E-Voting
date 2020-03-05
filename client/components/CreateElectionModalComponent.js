import React from 'react';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  createNewElection,
  createNewElectionDataSelector,
  createNewElectionErrorSelector,
  resetDataCreateNewElection
} from '../stores/ElectionState';

const withElectionNameState = withState('electionName', 'setElectionName', '');

const connectToRedux = connect(
  createStructuredSelector({
    successMessage: createNewElectionDataSelector,
    errorMessage: createNewElectionErrorSelector
  }),
  dispatch => ({
    createNewElection: name => name && dispatch(createNewElection(name)),
    resetData: () => {
      resetDataCreateNewElection(dispatch);
    }
  })
);
const enhance = compose(
  withElectionNameState,
  connectToRedux
);

class CreateElectionModalComponent extends React.Component {
  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const { electionName, setElectionName, createNewElection } = this.props;
    return (
      <div
        className="modal fade text-left"
        id="createNewElectionModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel35"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel6">
                <i className="fa fa-plus-circle"></i> New Election
              </h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <fieldset className="form-group floating-label-form-group">
                  <label htmlFor="email">Election name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="electionName"
                    placeholder="type something...."
                    onChange={e => setElectionName(e.currentTarget.value)}
                  />
                </fieldset>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success btn-lg"
                  data-dismiss="modal" //auto close after click, must refactor this when error!
                  onClick={e => {
                    e.preventDefault();
                    createNewElection(electionName);
                  }}
                >
                  Create
                </button>
                <button
                  className="btn btn-secondary btn-lg"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default enhance(CreateElectionModalComponent);
