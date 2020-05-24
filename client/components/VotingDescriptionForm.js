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
    const { handleSubmit, votingTypeValue, t } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12 mt-2">
            <h5 className="card-title">
              {t('finishedCreate.votingDescriptionForm.description')}
            </h5>
            <Field
              name="description"
              type="text"
              component={RenderTextAreaFieldComponent}
              rows="11"
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
              t={t}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mt-2">
            <h5 className="card-title">{t('electionDetail.electionOwner')}</h5>

            <Field
              icon="ft-user"
              name="electionOwner"
              type="text"
              component={RenderInputFieldWithIcon}
              validate={[required]}
            />
          </div>
          <div className="col-md-6 mt-2">
            <h5 className="card-title">{t('electionDetail.votingTime')}</h5>

            <Field
              icon="ft-clock"
              name="votingTime"
              type="text"
              component={RenderInputFieldWithIcon}
              placeholder={t(
                'finishedCreate.votingDescriptionForm.votingTime_placeholder'
              )}
              validate={[required, isNumber]}
            />
          </div>
        </div>

        {parseInt(votingTypeValue) !== SELECT_TO_TRUST && (
          <div className="row">
            <div className="col-md-6 mt-2">
              <h5 className="card-title">
                {t('electionDetail.role.atLeastChoose')}
              </h5>

              <Field
                icon="ft-chevrons-right"
                name="atLeastVote"
                type="number"
                component={RenderInputFieldWithIcon}
                validate={[isNumber]}
              />
            </div>
            <div className="col-md-6 mt-2">
              <h5 className="card-title">
                {t('electionDetail.role.mostChoose')}
              </h5>

              <Field
                icon="ft-chevrons-left"
                name="mostVote"
                type="number"
                component={RenderInputFieldWithIcon}
                validate={[isNumber]}
              />
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-md-6 mt-2">
            <h5 className="card-title">{t('electionDetail.takePlaceOn')}</h5>
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
        <div className="d-flex justify-content-end">
          <div className="form-actions">
            <button type="submit" className="btn btn-success" value="Next">
              <i className="fa fa-check-square-o"></i>{' '}
              {t('finishedCreate.votingDescriptionForm.nextBtn')}
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
  }
}

export default enhance(VotingDescriptionForm);
