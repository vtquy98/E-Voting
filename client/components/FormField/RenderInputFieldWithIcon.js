import React from 'react';

const RenderInputFieldWithIcon = ({
  input,
  placeholder,
  label,
  icon,
  meta: { touched, error },
  ...others
}) => (
  <div>
    <div className="position-relative has-icon-left">
      <input
        {...input}
        type="number"
        className="form-control"
        placeholder={placeholder}
        {...others}
      />
      <div className="form-control-position">
        <i className={icon}></i>
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
  </div>
);

export default RenderInputFieldWithIcon;
