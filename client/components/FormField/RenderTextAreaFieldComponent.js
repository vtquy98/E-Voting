import React from 'react';

const RenderTextAreaFieldComponent = ({
  input,
  placeholder,
  rows,
  meta: { touched, error }
}) => (
  <React.Fragment>
    <div className="position-relative has-icon-left">
      <textarea
        {...input}
        rows={rows}
        className="form-control"
        name="notes"
        placeholder={placeholder}
      ></textarea>
      <div className="form-control-position">
        <i className="ft-file"></i>
      </div>
    </div>

    <div className="text-danger text-center mt-1">
      {touched &&
        (error && (
          <div className="alert bg-danger  mb-2">
            <button type="button" className="close"></button>
            <strong>Oh snap!</strong> {error}
          </div>
        ))}
    </div>
  </React.Fragment>
);

export default RenderTextAreaFieldComponent;
