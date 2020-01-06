import React from 'react';

const RenderInputFieldComponent = ({}) => (
  <ul className="list-custom">
    <li className="list-item-custom">
      <input type="checkbox" className="hidden-box" id="first" />
      <label for="first" className="check--label">
        <span className="check--label-box"></span>
        <span className="check--label-text">First Checkbox</span>
      </label>
    </li>
    <li className="list-item-custom">
      <input type="checkbox" className="hidden-box" id="second" />
      <label for="second" className="check--label">
        <span className="check--label-box"></span>
        <span className="check--label-text">Second Checkbox</span>
      </label>
    </li>
    <li className="list-item-custom">
      <input type="checkbox" className="hidden-box" id="third" />
      <label for="third" className="check--label">
        <span className="check--label-box"></span>
        <span className="check--label-text">Third Checkbox</span>
      </label>
    </li>
  </ul>
);

export default RenderInputFieldComponent;
