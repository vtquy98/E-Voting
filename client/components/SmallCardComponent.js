import React from 'react';

const SmallCardComponent = ({ title, content, classIcon, cardType }) => (
  <div className="card">
    <div className="card-content">
      <div className="card-body">
        <div className="media">
          <div className="media-body text-left w-50 mr-1">
            <h5 className={`${cardType}`}>{content}</h5>
            <span>{title}</span>
          </div>
          <div className="media-right media-middle">
            <i
              className={`${classIcon} ${cardType} font-large-2 float-right`}
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SmallCardComponent;
