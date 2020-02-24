import React from 'react';
// import { SELECT_TO_VOTE } from '../../enums/votingType';
const RenderVoteCheckFieldComponent = ({
  input,
  label,
  options,
  votingType
}) => (
  <React.Fragment>
    {options.map((item, index) => (
      <div key={index}>
        <input
          {...input}
          type="checkbox"
          id={item.id}
          name={item.fullName}
          className="checkbox-input"
          checked={input.value.indexOf(item.id) !== -1}
          onChange={event => {
            const newValue = [...input.value];
            if (event.target.checked) {
              newValue.push(item.id);
            } else {
              newValue.splice(newValue.indexOf(item.id), 1);
            }

            return input.onChange(newValue);
          }}
        />
        <label for={item.id} className="checkbox-label">
          <div className="checkbox-text">
            <h3 className="text-bold-400">{item.fullName}</h3>
            <p className="checkbox-text--description">
              Click to <span className="un">un</span>check it!
              {/* {shortDescription} */}
            </p>
          </div>
        </label>
      </div>
    ))}

    <style jsx>
      {`
        .checkbox-input {
          display: none;
        }

        .checkbox-label,
        .checkbox-text,
        .checkbox-text--description {
          -webkit-transition: all 0.4s ease;
          transition: all 0.4s ease;
        }

        .checkbox-label {
          display: inline-block;
          vertical-align: top;
          position: relative;
          width: 100%;
          padding: 30px 60px;
          cursor: pointer;
          font-size: 24px;
          font-weight: 400;
          margin: 16px 0;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          box-shadow: inset 0 0 0 0 ${
            votingType === 'SELECT_TO_VOTE' ? `#16d39a;` : `#FF7588;`
          }
        }
        .checkbox-label:before {
          content: '';
          position: absolute;
          top: 75%;
          right: 16px;
          width: 40px;
          height: 40px;
          opacity: 0;
          background-color: ${
            votingType === 'SELECT_TO_VOTE' ? `#16d39a;` : `#FF7588;`
          }

          background-image: ${
            votingType === 'SELECT_TO_VOTE'
              ? `url(/static/assets/images/checked.svg);`
              : `url(/static/assets/images/cancel.svg);`
          }
          background-position: center;
          background-repeat: no-repeat;
          background-size: 24px;
          border-radius: 50%;
          -webkit-transform: translate(0%, -50%);
          transform: translate(0%, -50%);
          -webkit-transition: all 0.4s ease;
          transition: all 0.4s ease;
        }

        .checkbox-text--description {
          font-size: 14px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #d9d9d9;
        }
        .checkbox-text--description .un {
          display: none;
        }

        .checkbox-input:checked + .checkbox-label {
          border-color: ${
            votingType === 'SELECT_TO_VOTE' ? `#16d39a;` : `#FF7588;`
          };
          box-shadow: inset 0 -12px 0 0 ${
            votingType === 'SELECT_TO_VOTE' ? `#16d39a;` : `#FF7588;`
          };
        }
        .checkbox-input:checked + .checkbox-label:before {
          top: 0;
          opacity: 1;
        }
        .checkbox-input:checked + .checkbox-label .checkbox-text {
          -webkit-transform: translate(0, -8px);
          transform: translate(0, -8px);
        }
        .checkbox-input:checked + .checkbox-label .checkbox-text--description {
          border-color: #d9d9d9;
        }
        .checkbox-input:checked
          + .checkbox-label
          .checkbox-text--description
          .un {
          display: inline-block;
        }
       
      `}
    </style>
  </React.Fragment>
);

export default RenderVoteCheckFieldComponent;
