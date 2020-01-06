import React from 'react';

const RenderNumberUpDownFieldComponent = ({
  input: { onChange, value }
  // meta: { touched, error }
}) => (
  <input
    className="form-control"
    type="number"
    name="quantity"
    min="1"
    max="240"
    value={value}
    onChange={onChange}
  />
);

export default RenderNumberUpDownFieldComponent;
