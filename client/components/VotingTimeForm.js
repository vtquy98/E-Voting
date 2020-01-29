import React from 'react';
import { Field, reduxForm } from 'redux-form';
// import validate from './validate';
import RenderDateTimeFieldComponent from './FormField/RenderDateTimeFieldComponent';
import RenderNumberUpDownFieldComponent from './FormField/RenderNumberUpDownFieldComponent';

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

const VotingTimeForm = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <link
        rel="stylesheet"
        type="text/css"
        href="/static/customs/react-datetime.css"
      />
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div
              className="card-header card-header-icon"
              data-background-color="rose"
            >
              <i className="material-icons">today</i>
            </div>
            <div className="card-content">
              <h4 className="card-title">What time can the voting start?</h4>
              <Field
                name="votingDatetime"
                component={RenderDateTimeFieldComponent}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div
              className="card-header card-header-icon"
              data-background-color="rose"
            >
              <i className="material-icons">av_timer</i>
            </div>
            <div className="card-content">
              <h4 className="card-title">How long does the voting take?</h4>
              <div className="form-group">
                <label className="label-control">Mintute</label>
                <Field
                  name="timeVoting"
                  type="number"
                  component={RenderNumberUpDownFieldComponent}
                />
                <span className="material-input"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wizard-footer">
        <div className="pull-right">
          <input
            className="btn btn-primary btn-user btn-block"
            type="submit"
            disabled={pristine || submitting}
            value="Complete"
          />
        </div>
        <div className="pull-left">
          <input
            type="button"
            className="btn btn-primary btn-user btn-block"
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
export default enhance(VotingTimeForm);
