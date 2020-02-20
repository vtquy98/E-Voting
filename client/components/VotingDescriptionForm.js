import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, isNumber } from '../utils/validation';
import RenderTextAreaFieldComponent from './FormField/RenderTextAreaFieldComponent';
import RenderVotingTypeFieldComponent from './FormField/RenderVotingTypeFieldComponent';
import RenderInputFieldWithIcon from './FormField/RenderInputFieldWithIcon';

const withForm = reduxForm({
  form: 'create_voting',
  destroyOnUnmount: false // <------ preserve form data
});

const VotingDescriptionForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mt-2">
          <h4 className="card-title">
            Election's <code>description</code>
          </h4>

          <Field
            name="description"
            type="text"
            component={RenderTextAreaFieldComponent}
            rows="11"
            placeholder="type something..."
            validate={[required]}
          />
        </div>

        <div className="col-md-6 mt-2">
          <Field
            name="votingType"
            component={RenderVotingTypeFieldComponent}
            validate={[required]}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mt-2">
          <h4 className="card-title">
            Election <code>Owner</code>
          </h4>

          <Field
            icon="ft-user"
            name="electionOwner"
            type="text"
            component={RenderInputFieldWithIcon}
            placeholder="Who's a owner of the election?"
            validate={[required]}
          />
        </div>
        <div className="col-md-6 mt-2">
          <h4 className="card-title">
            Voting's <code>time</code>
          </h4>

          <Field
            icon="ft-clock"
            name="votingTime"
            type="text"
            component={RenderInputFieldWithIcon}
            placeholder="Number of voting time (minute)"
            validate={[required, isNumber]}
          />
        </div>
      </div>

      <div className="form-actions right">
        <button type="button" className="btn btn-warning mr-1" disabled>
          <i class="ft-x"></i> Previous
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

export default withForm(VotingDescriptionForm);
