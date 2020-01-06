import React from 'react';

const RenderCheckboxCandidateFieldComponent = ({
  input,
  type = 'text',
  placeholder,
  label,
  icon,
  meta: { touched, error },
  candidate,
  ...others
}) => (
  <div>
    <input
      type="checkbox"
      className="hidden-box"
      value={input.value}
      onChange={input.onChange}
      candidate={candidate}
      id={candidate}
    />
    <label for={candidate} className="check--label">
      <span className="check--label-box"></span>
      <span className="check--label-text">{label}</span>
    </label>
  </div>
);

export default RenderCheckboxCandidateFieldComponent;
