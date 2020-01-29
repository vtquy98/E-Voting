import React from 'react';
import { Field, reduxForm } from 'redux-form';
// import validate from './validate';
import { compose } from 'recompose';

import RenderSelectedImageFieldComponent from './FormField/RenderSelectedImageFieldComponent';
import RenderTextAreaFieldComponent from './FormField/RenderTextAreaFieldComponent';
import RenderVotingTypeFieldComponent from './FormField/RenderVotingTypeFieldComponent';

const withForm = reduxForm({
  form: 'create_voting',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
  //   validate });
});

const enhance = compose(
  // connectToRedux,
  withForm
);

const VotingDescriptionForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <link
        rel="stylesheet"
        type="text/css"
        href="/static/customs/custom.css"
      />
      <div className="row">
        <div className="col-sm-5 col-sm-offset-1">
          <h6>Image desciption</h6>
          <Field
            name="imageDescription"
            component={RenderSelectedImageFieldComponent}
            type="file"
          />
        </div>

        <div className="col-sm-6">
          <h6>Voting's description</h6>
          <Field
            name="description"
            type="text"
            component={RenderTextAreaFieldComponent}
            rows="9"
          />
        </div>

        <div className="col-lg-12">
          <Field name="votingType" component={RenderVotingTypeFieldComponent} />
        </div>
      </div>

      <div className="d-flex">
        <div className="justify-content-center">
          <input
            className="btn btn-primary btn-user btn-block"
            type="submit"
            value="Next"
          />
        </div>
        <div className="clearfix"></div>
      </div>
      <style jsx>{`
        .material-icons {
          font-size: 50px;
        }
      `}</style>
    </form>
  );
};

export default enhance(VotingDescriptionForm);
