import React from 'react';

const SmallCardComponent = ({ title, content, classIcon, cardType }) => (
  <div className={`card no-border border-left-${cardType} shadow h-100 py-2`}>
    <div className="card-body">
      <div className="row no-gutters align-items-center">
        <div className="col mr-2">
          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
            {title}
          </div>
          <div className="h5 mb-0 font-weight-bold text-gray-800">
            {content}
          </div>
        </div>
        <div className="col-auto">
          <i className={`${classIcon} fa-2x text-gray-300`}></i>
        </div>
      </div>
    </div>
    <style jsx>{`
      .no-border {
        border-right: none !important;
        border-bottom: none !important;
        border-top: none !important;
      }
    `}</style>
  </div>
);

export default SmallCardComponent;
