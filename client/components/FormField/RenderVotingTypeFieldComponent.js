import React from 'react';
import { SELECT_TO_VOTE, SELECT_TO_REMOVE } from '../../enums/votingOption';
const RenderVotingTypeFieldComponent = ({
  input,
  type = 'radio',
  placeholder,
  label,
  icon,
  meta: { touched, error },
  candidate,
  ...others
}) => (
  //   <div>
  //     <input
  //       type="checkbox"
  //       className="hidden-box"
  //       value={input.value}
  //       onChange={input.onChange}
  //       candidate={candidate}
  //       id={candidate}
  //     />
  //     <label for={candidate} className="check--label">
  //       <span className="check--label-box"></span>
  //       <span className="check--label-text">{label}</span>
  //     </label>
  //   </div>

  <div className="tab-pane" id="account">
    <h4 className="info-text"> What is the voting type? </h4>
    <div className="row">
      <div className="option-group">
        <div className="option-container">
          <input
            className="option-input"
            id="option-1"
            type="radio"
            name="options"
            value={SELECT_TO_REMOVE}
            onChange={input.onChange}
          />
          <input
            className="option-input"
            id="option-2"
            type="radio"
            name="options"
            value={SELECT_TO_VOTE}
            onChange={input.onChange}
          />

          <label className="option" for="option-1">
            <span className="option__indicator"></span>
            <span className="option__label">
              <i className="material-icons">cancel</i>Cross to vote
            </span>
          </label>

          <label className="option" for="option-2">
            <span className="option__indicator"></span>
            <span className="option__label">
              <i className="material-icons">done</i>Check to vote
            </span>
          </label>
        </div>
        {touched && (error && <span style={{ color: 'red' }}>{error}</span>)}
      </div>
    </div>
  </div>
);

export default RenderVotingTypeFieldComponent;
