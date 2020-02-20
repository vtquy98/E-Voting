import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../utils/validation';
import RenderCandidateSelectionField from './FormField/RenderCandidateSelectionField';

const withForm = reduxForm({
  form: 'create_voting',
  destroyOnUnmount: false // <------ preserve form data
});

const VotingCandidateForm = props => {
  const { handleSubmit, previousPage, options } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h4 className="card-title">
        Let's add some <code>candidates</code> to add into the election
      </h4>
      <Field
        name="candidates"
        component={RenderCandidateSelectionField}
        options={options}
        validate={[required]}
      />

      <div className="form-actions right">
        <button
          type="button"
          className="btn btn-warning mr-1"
          name="previous"
          value="Previous"
          onClick={previousPage}
        >
          <i class="fa fa-chevron-circle-left"></i> Previous
        </button>
        <button type="submit" className="btn btn-success" value="Next">
          <i className="fa fa-check-square-o"></i> Next
        </button>
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

export default withForm(VotingCandidateForm);
