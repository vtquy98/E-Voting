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
  <div>
    <input
      {...input}
      type={type}
      className="form-control"
      placeholder={placeholder}
      {...others}
    />
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

export default RenderInputFieldComponent;
