import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderInputFieldComponent from './FormField/RenderInputFieldComponent';
import { FieldArray } from 'redux-form';
import { compose } from 'recompose';

const withForm = reduxForm({
  form: 'create_voting',
  destroyOnUnmount: false // <------ preserve form data
  //   validate });
});

const enhance = compose(
  // connectToRedux,
  withForm
);

// const renderError = ({ meta: { touched, error } }) =>
//   touched && error ? <span>{error}</span> : false;

const renderMembers = ({ fields }) => (
  <div>
    <div className="row">
      <div className="col-lg-12">
        <div className="text-center">
          <button
            type="button"
            className="btn btn-rose btn-fill"
            onClick={() => fields.push({})}
          >
            Add a Candidate<div class="ripple-container"></div>
          </button>
        </div>
      </div>
    </div>

    {fields && fields.length === 0 && (
      <h4 className="text-center"> Empty, let's try add some candidates! </h4>
    )}
    <div className="row">
      {fields.map((candidate, index) => (
        <div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Candidate #{index + 1}</h4>
                <button
                  type="button"
                  className="btn btn-danger btn-round"
                  onClick={() => fields.remove(index)}
                >
                  <i className="material-icons">close</i>
                </button>
              </div>
              <div className="card-content">
                <Field
                  name={`${candidate}.candidateName`}
                  type="text"
                  component={RenderInputFieldComponent}
                  icon="face"
                  label="Candidate's name"
                />
                <Field
                  name={`${candidate}.candidateDescription`}
                  type="text"
                  component={RenderInputFieldComponent}
                  label="Candidate's descriptions"
                  icon="face"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const VotingCandidateForm = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="candidates" component={renderMembers} />
      <div className="wizard-footer">
        <div className="pull-right">
          <input
            className="btn btn-next btn-fill btn-rose btn-wd"
            type="submit"
            value="Next"
          />
        </div>
        <div className="pull-left">
          <input
            type="button"
            className="btn btn-previous btn-fill btn-default btn-wd"
            name="previous"
            value="Previous"
            onClick={previousPage}
          />
        </div>
        <div className="clearfix"></div>
      </div>
    </form>
  );
};

export default enhance(VotingCandidateForm);
