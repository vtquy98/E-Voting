import React from 'react';

const SmallCardComponent = ({ title, content, classIcon, borderColor }) => (
  <div className={`card border-left-${borderColor} shadow h-100 py-2`}>
    <div className="card-body">
      <div className="row no-gutters align-items-center">
        <div className="col mr-2">
          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
            {title}
          </div>
          <div className="mb-0 font-weight-bold text-gray-800">{content}</div>
        </div>
        <div className="col-auto">
          <i class={`${classIcon} fa-2x text-gray-300`}></i>
        </div>
      </div>
    </div>
  </div>
);

export default SmallCardComponent;
