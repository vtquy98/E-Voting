import React from 'react';

export const RenderSelectedFieldComponent = ({
  input,
  options,
  meta: { touched, error }
}) => (
  <React.Fragment>
    <select
      {...input}
      className="selectpicker"
      data-style="select-with-transition"
      data-size="12"
    >
      {options.map(item => (
        <option key={item.id} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
    {touched && (error && <span style={{ color: 'red' }}>{error}</span>)}
  </React.Fragment>
);

export default RenderSelectedFieldComponent;
