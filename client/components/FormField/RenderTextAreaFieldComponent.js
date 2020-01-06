import React from 'react';

const RenderTextAreaFieldComponent = ({
  input,
  placeholder,
  rows,
  meta: { touched, error }
}) => (
  <React.Fragment>
    <textarea
      {...input}
      className="form-control"
      placeholder={placeholder}
      rows={rows}
    ></textarea>
    <div className="text-danger text-center">
      {touched && (error && <span style={{ color: 'red' }}>{error}</span>)}
    </div>
  </React.Fragment>
);

export default RenderTextAreaFieldComponent;
