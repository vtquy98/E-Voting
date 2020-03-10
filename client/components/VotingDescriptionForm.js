import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { required, isNumber } from '../utils/validation';
import RenderTextAreaFieldComponent from './FormField/RenderTextAreaFieldComponent';
import RenderVotingTypeFieldComponent from './FormField/RenderVotingTypeFieldComponent';
import RenderInputFieldWithIcon from './FormField/RenderInputFieldWithIcon';

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

class VotingDescriptionForm extends React.Component {
  render() {
    const { handleSubmit, votingTypeValue } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12 mt-2">
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
        </div>
        <div className="row">
          <div className="col-md-12 mt-2">
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

        {parseInt(votingTypeValue) !== SELECT_TO_TRUST && (
          <div className="row">
            <div className="col-md-6 mt-2">
              <h4 className="card-title">
                Vote <code>at least</code> (option)
              </h4>

              <Field
                icon="ft-chevrons-right"
                name="atLeastVote"
                type="number"
                component={RenderInputFieldWithIcon}
                placeholder="Minimum vote for candidates"
                validate={[isNumber]}
              />
            </div>
            <div className="col-md-6 mt-2">
              <h4 className="card-title">
                Vote <code>the most</code> (option)
              </h4>

              <Field
                icon="ft-chevrons-left"
                name="mostVote"
                type="number"
                component={RenderInputFieldWithIcon}
                placeholder="Maximum vote for candidates"
                validate={[isNumber]}
              />
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-6 mt-2">
            <h4 className="card-title">
              Time to <code>take place</code> (option)
            </h4>
            <Field
              type="date"
              icon="fa fa-calendar-check-o"
              className="form-control"
              name="dateTakePlace"
              component={RenderInputFieldWithIcon}
              validate={[required]}
            />
          </div>
        </div>

        <div className="form-actions right">
          <button type="button" className="btn btn-warning mr-1" disabled>
            <i className="ft-x"></i> Previous
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
  }
}

export default enhance(VotingDescriptionForm);
