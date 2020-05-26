import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../utils/validation';
import RenderCandidateSelectionField from './FormField/RenderCandidateSelectionField';

const withForm = reduxForm({
  form: 'create_voting',
  destroyOnUnmount: false // <------ preserve form data
});

const VoterForm = props => {
  const {
    handleSubmit,
    pristine,
    previousPage,
    submitting,
    options,
    t
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h5 className="card-title">{t('finishedCreate.voterForm.title')}</h5>
      <Field
        name="voters"
        component={RenderCandidateSelectionField}
        options={options}
        validate={[required]}
      />
      <div className="d-flex justify-content-end">
        <div className="form-actions right">
          <button
            type="button"
            className="btn btn-warning mr-1"
            name="previous"
            value="Previous"
            onClick={previousPage}
          >
            <i className="fa fa-chevron-circle-left"></i>{' '}
            {t('finishedCreate.votingCandidateForm.previousBtn')}
          </button>
          <button
            type="submit"
            className="btn btn-success"
            disabled={pristine || submitting}
            value="Complete"
          >
            <i className="fa fa-check-square-o"></i>{' '}
            {t('finishedCreate.voterForm.finishBtn')}
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
export default withForm(VoterForm);
