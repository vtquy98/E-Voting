import React from 'react';
import {
  SELECT_TO_VOTE,
  SELECT_TO_REMOVE,
  SELECT_TO_TRUST
} from '../../enums/votingType';

const RenderVotingTypeFieldComponent = ({
  input,
  label,
  meta: { touched, error },
  t
}) => (
  <div>
    <h5 className="card-title mt-2">
      {t('finishedCreate.votingDescriptionForm.votingType')}
    </h5>
    <div className="middle">
      <label>
        <input
          type="radio"
          name="radio"
          id={SELECT_TO_VOTE}
          value={SELECT_TO_VOTE}
          onChange={input.onChange}
        />
        <div className="choose-to-vote box">
          <span>{t('electionDetail.type.selectToVote')}</span>
        </div>
      </label>

      <label>
        <input
          type="radio"
          name="radio"
          id={SELECT_TO_REMOVE}
          value={SELECT_TO_REMOVE}
          onChange={input.onChange}
        />
        <div className="choose-to-remove box">
          <span>{t('electionDetail.type.selectToRemove')}</span>
        </div>
      </label>

      <label>
        <input
          type="radio"
          name="radio"
          id={SELECT_TO_TRUST}
          value={SELECT_TO_TRUST}
          onChange={input.onChange}
        />
        <div className="choose-to-trust box">
          <span>{t('electionDetail.type.selectToTrust')}</span>
        </div>
      </label>

      <div className="text-danger text-center mt-1">
        {touched &&
          (error && (
            <div>
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
          background-color: #4e73df;
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
          font-family: 'Font Awesome 5 Free';
          display: block;
          transform: translateY(-80px);
          opacity: 0;
          transition: all 300ms ease-in-out;
          font-weight: normal;
          color: white;
        }
        .middle .choose-to-vote span:before {
          content: '\f682';
        }
        .middle .choose-to-remove span:before {
          content: '\f00d';
        }
        .middle .choose-to-trust span:before {
          content: '\f004';
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
