import React from 'react';
const RenderTrustField = ({ input, label, meta: { touched, error }, t }) => (
  <div className="mb-4">
    <div className="row">
      <div className="option-group">
        <div className="option-container">
          <input
            className="option-input"
            id="option-1"
            type="radio"
            name="options"
            value={true}
            onChange={input.onChange}
          />
          <input
            className="option-input"
            id="option-2"
            type="radio"
            name="options"
            value={false}
            onChange={input.onChange}
          />

          <label className="option" htmlFor="option-1">
            <span className="option__indicator"></span>
            <span className="option__label">
              <i className="ft-thumbs-up"></i> {t('trustVote.trust')}
            </span>
          </label>

          <label className="option" htmlFor="option-2">
            <span className="option__indicator"></span>
            <span className="option__label">
              <i className="ft-thumbs-down"></i> {t('trustVote.dontTrust')}
            </span>
          </label>
        </div>
        {touched && (error && <span style={{ color: 'red' }}>{error}</span>)}
      </div>
    </div>

    <style jsx>{`
      .list-custom {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .list-item-custom {
        margin: 0;
        padding: 0;
        border-bottom: 1px solid #ecf0f1;
        position: relative;
      }

      .list-item-custom:last-child {
        border: 0;
      }

      .hidden-box {
        position: absolute;
        top: -9999px;
        left: -9999px;
        appearance: none;
        opacity: 0;
      }

      .check--label {
        font-size: 20px;
        margin: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
      }

      .check--label-box {
        display: flex;
        align-self: center;
        position: relative;
        height: 20px;
        width: 20px;
        margin: 0 20px;
        border: 2px solid #3498db;
        border-radius: 2px;
        cursor: pointer;
      }
      .check--label-text {
        display: flex;
        align-self: center;
        position: relative;
        cursor: pointer;
        padding: 20px;
        border-left: 1px solid #ecf0f1;
      }

      .check--label-text:after {
        content: '';
        display: block;
        width: 0%;
        height: 2px;
        background-color: #000;
        position: absolute;
        top: 50%;
        left: 7.5%;
        transform: translateY(-50%);
        transition: width 100ms ease-in-out;
      }

      .hidden-box:checked + .check--label {
        background-color: #f9f9f9;
      }

      .hidden-box:checked + .check--label .check--label-box {
        background-color: #3498db;
      }

      .hidden-box:checked + .check--label .check--label-box:after {
        content: '';
        display: block;
        position: absolute;
        top: -1px;
        left: 4px;
        width: 6px;
        height: 12px;
        border: solid #000;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      .hidden-box:checked + .check--label .check--label-text:after {
        width: 85%;
      }

      .option-group {
        width: 90%;
        max-width: 500px;
        height: 150px;
        position: relative;
        overflow: hidden;
        border-radius: 0.25em;
        font-size: 4rem;
        margin: 0.2em auto;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
      }
      .option-container {
        display: flex;
        justify-content: center;
        align-items: stretch;
        width: 120%;
        height: 100%;
        margin: 0 -10%;
      }
      .option {
        overflow: hidden;
        flex: 1;
        display: block;
        padding: 0.5em;
        background-color: #4e73df;
        position: relative;
        margin: 0em;
        margin-right: 0.2em;
        border-radius: 0.25em;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        flex-direction: column;
        cursor: pointer;
        opacity: 0.5;
        transition-duration: 0.8s, 0.6s;
        transition-property: opacity, -webkit-transform;
        transition-property: transform, opacity;
        transition-property: transform, opacity, -webkit-transform;
        transition-timing-function: cubic-bezier(0.98, 0, 0.22, 0.98), linear;
        will-change: transform, opacity;
      }
      .option:last-child {
        margin-right: 0;
      }
      .option__indicator {
        display: block;
        -webkit-transform-origin: left bottom;
        transform-origin: left bottom;
        transition: inherit;
        will-change: transform;
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        left: 0.5em;
      }
      .option__indicator:before,
      .option__indicator:after {
        content: '';
        display: block;
        border: solid 2px #fff;
        border-radius: 50%;
        width: 0.25em;
        height: 0.25em;
        position: absolute;
        top: 0;
        right: 0;
      }
      .option__indicator:after {
        background: #64d6ee;
        -webkit-transform: scale(0);
        transform: scale(0);
        transition: inherit;
        will-change: transform;
      }
      .option-input {
        position: absolute;
        top: 0;
        z-index: -1;
        visibility: hidden;
      }
      .option__label {
        display: block;
        width: 100%;
        text-transform: uppercase;
        font-size: 24px;
        font-weight: bold;
        -webkit-transform-origin: left bottom;
        transform-origin: left bottom;
        -webkit-transform: translateX(20%) scale(0.7);
        transform: translateX(20%) scale(0.7);
        transition: inherit;
        will-change: transform;
        color: #fff;
      }
      .option__label sub {
        margin-left: 0.25em;
        font-size: 0.4em;
        display: inline-block;
        vertical-align: 0.3em;
      }
      .option__label:after {
        content: '';
        display: block;
        border: solid 2px #fff;
        width: 100%;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleX(0.2);
        transform: scaleX(0.2);
        transition: inherit;
        will-change: transform;
      }
      .option:last-child .option__label {
        -webkit-transform: translateX(0%) scale(0.7);
        transform: translateX(0%) scale(0.7);
      }
      .option:last-child .option__indicator {
        -webkit-transform: translateX(-20%);
        transform: translateX(-20%);
      }
      .option-input:checked ~ .option {
        -webkit-transform: translateX(-20%) translateX(0.2em);
        transform: translateX(-20%) translateX(0.2em);
      }
      .option-input:checked ~ .option .option__indicator {
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
      }
      .option-input:checked ~ .option .option__label {
        -webkit-transform: translateX(40%) scale(0.7);
        transform: translateX(40%) scale(0.7);
      }
      .option-input:first-child:checked ~ .option {
        -webkit-transform: translateX(20%) translateX(-0.2em);
        transform: translateX(20%) translateX(-0.2em);
      }
      .option-input:first-child:checked ~ .option .option__indicator {
        -webkit-transform: translateX(-40%);
        transform: translateX(-40%);
      }
      .option-input:first-child:checked ~ .option .option__label {
        -webkit-transform: translateX(0%) scale(0.7);
        transform: translateX(0%) scale(0.7);
      }
      .option-input:nth-child(1):checked ~ .option:nth-of-type(1),
      .option-input:nth-child(2):checked ~ .option:nth-of-type(2) {
        opacity: 1;
      }
      .option-input:nth-child(1):checked
        ~ .option:nth-of-type(1)
        .option__indicator,
      .option-input:nth-child(2):checked
        ~ .option:nth-of-type(2)
        .option__indicator {
        -webkit-transform: translateX(0);
        transform: translateX(0);
      }
      .option-input:nth-child(1):checked
        ~ .option:nth-of-type(1)
        .option__indicator::after,
      .option-input:nth-child(2):checked
        ~ .option:nth-of-type(2)
        .option__indicator::after {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      .option-input:nth-child(1):checked
        ~ .option:nth-of-type(1)
        .option__label,
      .option-input:nth-child(2):checked
        ~ .option:nth-of-type(2)
        .option__label,
      .option-input:nth-child(1):checked
        ~ .option:nth-of-type(1)
        .option__label::after,
      .option-input:nth-child(2):checked
        ~ .option:nth-of-type(2)
        .option__label::after {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    `}</style>
  </div>
);

export default RenderTrustField;
