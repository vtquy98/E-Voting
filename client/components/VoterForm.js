import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../utils/validation';
import RenderCandidateSelectionField from './FormField/RenderCandidateSelectionField';

const withForm = reduxForm({
  form: 'create_voting',
  destroyOnUnmount: false // <------ preserve form data
});

const VoterForm = props => {
  const { handleSubmit, pristine, previousPage, submitting, options } = props;
  return (
    // <form onSubmit={handleSubmit}>
    //   <div className="row">
    //     <div className="col-md-6">
    //       <div className="card">
    //         <div
    //           className="card-header card-header-icon"
    //           data-background-color="rose"
    //         >
    //           <i className="material-icons">today</i>
    //         </div>
    //         <div className="card-content">
    //           <h4 className="card-title">What time can the voting start?</h4>
    //           <Field
    //             name="votingDatetime"
    //             component={RenderDateTimeFieldComponent}
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     <div className="col-md-6">
    //       <div className="card">
    //         <div
    //           className="card-header card-header-icon"
    //           data-background-color="rose"
    //         >
    //           <i className="material-icons">av_timer</i>
    //         </div>
    //         <div className="card-content">
    //           <h4 className="card-title">How long does the voting take?</h4>
    //           <div className="form-group">
    //             <label className="label-control">Mintute</label>
    //             <Field
    //               name="timeVoting"
    //               type="number"
    //               component={RenderNumberUpDownFieldComponent}
    //             />
    //             <span className="material-input"></span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="wizard-footer">
    //     <div className="pull-right">
    //       <input
    //         className="btn btn-primary btn-user btn-block"
    // type="submit"
    // disabled={pristine || submitting}
    // value="Complete"
    //       />
    //     </div>
    //     <div className="pull-left">
    //       <input
    //         type="button"
    //         className="btn btn-primary btn-user btn-block"
    //         name="previous"
    // value="Previous"
    // onClick={previousPage}
    //       />
    //     </div>
    //     <div className="clearfix"></div>
    //   </div>
    // </form>

    <form onSubmit={handleSubmit}>
      <h4 className="card-title">
        Who is the <code>voters</code>?
      </h4>
      <Field
        name="voters"
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
        <button
          type="submit"
          className="btn btn-success"
          disabled={pristine || submitting}
          value="Complete"
        >
          <i className="fa fa-check-square-o"></i> Finish
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
export default withForm(VoterForm);
