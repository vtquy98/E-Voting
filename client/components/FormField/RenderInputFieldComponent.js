import React from 'react';

const RenderInputFieldComponent = ({
  input,
  type = 'text',
  placeholder,
  label,
  icon,
  meta: { touched, error },
  ...others
}) => (
  <div className="input-group">
    <span className="input-group-addon">
      <i className="material-icons">{icon}</i>
    </span>
    <div className="form-group label-floating is-empty">
      <label className="control-label">{label}</label>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="form-control"
        {...others}
      />
      <span className="material-input"></span>
      <div className="text-danger text-center">
        {touched && (error && <span style={{ color: 'red' }}>{error}</span>)}
      </div>
    </div>
  </div>
);

export default RenderInputFieldComponent;
