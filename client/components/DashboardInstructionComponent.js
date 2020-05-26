import React from 'react';

const DashboardInstructionComponent = ({ t }) => (
  <div className="card shadow mb-4 border-none">
    <div className="card-header py-3">
      <h6 className="m-0 font-weight-bold text-primary">
        {t('instruction.title')}
      </h6>
    </div>
    <div className="card-body">
      <div className="row">
        <div className="col-sm d-flex align-items-stretch">
          <div className="d-flex align-items-center">
            <img
              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              src="/static/assets/images/instruction.svg"
              alt="instruction-img"
            />
          </div>
        </div>
        <div className="col-sm">
          <p>
            <strong> {t('instruction.1')}</strong>
            <br /> {t('instruction.2')}
            <br />
          </p>
          <p>{t('instruction.3')}</p>
          <div className="mt-2">
            <strong>{t('instruction.4')}</strong>
          </div>
          <div className="ml-2 mt-1">
            <li>{t('instruction.5')}</li>
            <li>{t('instruction.6')}</li>
            <li>{t('instruction.7')}</li>
          </div>
          <div className="mt-2">
            <strong>{t('instruction.8')}</strong>
          </div>
          <div className="ml-2 mt-1">
            <li>{t('instruction.9')}</li>
            <li className="mt-1">{t('instruction.10')}</li>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardInstructionComponent;
