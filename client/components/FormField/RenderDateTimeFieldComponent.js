import React from 'react';
import Datetime from 'react-datetime';

const RenderDateTimeFieldComponent = ({
  input: { onChange, value }
  // meta: { touched, error }
}) => (
  <div className="form-goup">
    <label className="label-control">Datetime Picker</label>
    <Datetime
      inputProps={{ placeholder: 'Choose time' }}
      onChange={onChange}
      value={value}
    />
    <span className="material-input"></span>
  </div>
);

export default RenderDateTimeFieldComponent;
