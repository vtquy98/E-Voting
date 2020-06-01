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

const SelectionComponent = ({
  value,
  onChange,
  onBlur,
  options,
  isMulti,
  ...others
}) => (
  <Select
    value={value}
    onChange={onChange}
    onBlur={() => onBlur} //if not it won't display what selected
    options={options}
    isMulti={isMulti}
    closeMenuOnSelect={false}
    components={animatedComponents}
    styles={customStyles}
    {...others}
  />
);

export default SelectionComponent;
