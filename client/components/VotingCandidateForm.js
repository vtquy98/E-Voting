import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { required } from '../utils/validation';
import RenderCandidateSelectionField from './FormField/RenderCandidateSelectionField';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { SELECT_TO_TRUST } from '../enums/votingType';

const withForm = reduxForm({
  form: 'create_voting',
  destroyOnUnmount: false // <------ preserve form data
});

const selector = formValueSelector('create_voting');

const SelectingFormValuesForm = connect(state => {
  const votingTypeValue = selector(state, 'votingType');
  return {
    votingTypeValue
  };
});

const enhance = compose(
  withForm,
  SelectingFormValuesForm
);

const VotingCandidateForm = props => {
  const { handleSubmit, previousPage, options, votingTypeValue } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h5 className="card-title">
        Let's add some <code>candidates</code> to add into the election
      </h5>

      <Field
        name="candidates"
        component={RenderCandidateSelectionField}
        options={options}
        validate={[required]}
        isMulti={!(parseInt(votingTypeValue) === SELECT_TO_TRUST)}
      />
      <div className="d-flex justify-content-end">
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-warning mr-1"
            name="previous"
            value="Previous"
            onClick={previousPage}
          >
            <i className="fa fa-chevron-circle-left"></i> Previous
          </button>

          <button type="submit" className="btn btn-success" value="Next">
            <i className="fa fa-check-square-o"></i> Next
          </button>
        </div>
      </div>
      <style jsx>{`
        .material-icons {
          font-size: 50px;
        }

        .form-actions {
          border-top: none !important;
          padding: 0px 0;
          margin-top: 20px;
        }
      `}</style>
    </form>
  );
};

export default enhance(VotingCandidateForm);
