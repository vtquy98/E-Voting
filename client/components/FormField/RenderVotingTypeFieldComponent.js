import React from 'react';
import { SELECT_TO_VOTE, SELECT_TO_REMOVE } from '../../enums/votingType';
const RenderVotingTypeFieldComponent = ({
  input,
  label,
  meta: { touched, error }
}) => (
  <div>
    <h4 className="card-title">
      {' '}
      What is the voting <code>type</code>?{' '}
    </h4>
    <div className="middle">
      <label>
        <input
          type="radio"
          name="radio"
          id="option-1"
          value={SELECT_TO_VOTE}
          onChange={input.onChange}
        />
        <div className="front-end box">
          <span>Choose to vote</span>
        </div>
      </label>

      <label>
        <input
          type="radio"
          name="radio"
          id="option-2"
          value={SELECT_TO_REMOVE}
          onChange={input.onChange}
        />
        <div className="back-end box">
          <span>Choose to remove</span>
        </div>
      </label>

      <div className="text-danger text-center mt-1">
        {touched &&
          (error && (
            <div className="alert bg-danger  mb-2">
              <button type="button" className="close"></button>
              <strong>Oh snap!</strong> {error}
            </div>
          ))}
      </div>

      <style jsx>{`
        .middle {
          width: 100%;
          text-align: center;
        }
        .middle h1 {
          font-family: 'Dax', sans-serif;
          color: #fff;
        }
        .middle input[type='radio'] {
          display: none;
        }
        .middle input[type='radio']:checked + .box {
          background-color: #00b5b8;
        }
        .middle input[type='radio']:checked + .box span {
          color: white;
          transform: translateY(70px);
        }
        .middle input[type='radio']:checked + .box span:before {
          transform: translateY(0px);
          opacity: 1;
        }
        .middle .box {
          width: 200px;
          height: 200px;
          background-color: #fff;
          transition: all 250ms ease;
          will-change: transition;
          display: inline-block;
          text-align: center;
          cursor: pointer;
          position: relative;
          font-weight: 400;
        }
        .middle .box:active {
          transform: translateY(10px);
        }
        .middle .box span {
          position: absolute;
          transform: translate(0, 60px);
          left: 0;
          right: 0;
          transition: all 300ms ease;
          font-size: 1.5em;
          user-select: none;
          color: #007e90;
        }
        .middle .box span:before {
          font-size: 1.2em;
          font-family: FontAwesome;
          display: block;
          transform: translateY(-80px);
          opacity: 0;
          transition: all 300ms ease-in-out;
          font-weight: normal;
          color: white;
        }
        .middle .front-end span:before {
          content: '\f00c';
        }
        .middle .back-end span:before {
          content: '\f00d';
        }
        .middle p {
          color: #fff;
          font-family: 'Dax', sans-serif;
          font-weight: 400;
        }
        .middle p a {
          text-decoration: underline;
          font-weight: bold;
          color: #fff;
        }
        .middle p span:after {
          content: '\f0e7';
          font-family: FontAwesome;
          color: yellow;
        }
      `}</style>
    </div>
  </div>
);

export default RenderVotingTypeFieldComponent;
