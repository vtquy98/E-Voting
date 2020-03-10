import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const customStyles = {
  option: provided => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    // color: state.isSelected ? 'red' : 'blue',
    padding: 10
  })
};
const RenderCandidateSelectionField = ({
  input,
  meta: { touched, error },
  options,
  isMulti = true
}) => (
  <div>
    <Select
      {...input}
      value={input.value}
      onChange={input.onChange}
      onBlur={() => input.onBlur(input.value)} //if not it won't display what selected
      options={options}
      isMulti={isMulti}
      closeMenuOnSelect={false}
      components={animatedComponents}
      styles={customStyles}
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

export default RenderCandidateSelectionField;
