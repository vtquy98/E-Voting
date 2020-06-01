import React from 'react';
import SelectionComponent from '../SelectionComponent';

const RenderCandidateSelectionField = ({
  input,
  meta: { touched, error },
  options,
  isMulti = true
}) => (
  <div>
    <SelectionComponent
      value={input.value}
      onChange={input.onChange}
      onBlur={() => input.onBlur(input.value)}
      options={options}
      isMulti={isMulti}
      {...input}
    />
    <div className="text-danger text-center mt-1">
      {touched &&
        (error && (
          <div>
            <button type="button" className="close"></button>
            <strong>Oh snap!</strong> {error}
          </div>
        ))}
    </div>
  </div>
);

export default RenderCandidateSelectionField;
