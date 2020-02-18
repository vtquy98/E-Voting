import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { SELECT_TO_VOTE } from '../enums/votingType';
import {
  getAllCandidates,
  getAllCandidatesDataSelector,
  // resetDataGetAllCandidates,
  getElection,
  getElectionDataSelector
} from '../stores/ElectionState';
import { getCurrentUserDataSelector } from '../stores/UserState';
import RenderVoteCheckFieldComponent from './FormField/RenderVoteCheckFieldComponent';

const connectToRedux = connect(
  createStructuredSelector({
    election: getElectionDataSelector,
    // errorMessage: getElectionErrorSelector,
    candidates: getAllCandidatesDataSelector,
    currentUser: getCurrentUserDataSelector
  }),
  dispatch => ({
    getElection: id => dispatch(getElection(id)),
    getAllCandidates: electionId => dispatch(getAllCandidates(electionId)),
    onSubmit: ({ candidates }) =>
      // dispatch(
      //   createArticle({
      //     title,
      //     categoryId,
      //     description,
      //     imageDescription,
      //     content,
      //     hastags
      //   })
      // )
      console.log(candidates)
  })
);

const withForm = reduxForm({
  form: 'voting'
});

const enhance = compose(
  connectToRedux,
  withForm
);

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
      candidates = [],
      // election = [],
      handleSubmit,
      pristine,
      reset,
      submitting
    } = this.props;

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
                <div className="col-md-4">
                  <div className="card text-white box-shadow-0 bg-warning">
                    <div className="card-header">
                      <h4 className="card-title">Caution!</h4>
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
                    <div className="card-content collapse show">
                      <div className="card-body">
                        <p className="card-text">
                          Use <code>bg-warning</code> class for warning
                          background color.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header border-0-bottom">
                      <h1 className="title text-center mt-2">
                        Who will you vote for?
                      </h1>
                    </div>
                    <div className="card-content">
                      <div className="card-body">
                        <div className="col-lg-12 col-md-6 col-sm-12">
                          <form onSubmit={handleSubmit}>
                            <Field
                              name="candidates"
                              options={candidates}
                              component={RenderVoteCheckFieldComponent}
                              votingType={SELECT_TO_VOTE}
                            />
                            <div className="text-center mt-2">
                              <div className="form-group">
                                <button
                                  type="submit"
                                  className="btn mr-1 mb-1 btn-success btn-lg"
                                  disabled={pristine || submitting}
                                >
                                  <i className="fa fa-check-circle"></i> Submit
                                </button>
                                <button
                                  type="button"
                                  disabled={pristine || submitting}
                                  onClick={reset}
                                  className="btn mr-1 mb-1 btn-danger btn-lg"
                                >
                                  <i className="fa fa-times"></i> Reset
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
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

            .title {
              font-size: 36px;
              font-weight: 300;
            }
          `}</style>
        </div>
      </React.Fragment>
    );
  }
}
export default enhance(ShowElectionComponent);
