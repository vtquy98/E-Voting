import React from 'react';
import { withTranslation } from '../i18n';

const CandidateInfoComponent = ({
  candidate,
  title = false,
  hasCandidateName = true,
  t
}) => (
  <div className="row">
    <div className="col-auto mr-4">
      <img
        src={candidate.avatar}
        alt="avt"
        width="120"
        className="rounded-circle mb-4"
      />
    </div>
    <div className="col">
      {title && (
        <div className="font-weight-bold text-primary text-uppercase mb-2">
          Thông tin ứng cử viên
        </div>
      )}

      <div className="mb-0 text-gray-800">
        {hasCandidateName && (
          <p>
            <b>{t('candidateInfo.fullName')}: </b>
            {candidate.fullName}
          </p>
        )}

        <p>
          <b>{t('candidateInfo.department')}: </b>
          {candidate.department}
        </p>

        <p>
          <b>{t('candidateInfo.profession')}: </b>
          {candidate.profession}
        </p>

        <p>
          <b>{t('candidateInfo.birthDate')}: </b>
          {candidate.birthDate}
        </p>

        <p>
          <b>{t('candidateInfo.summaryDescription')}: </b>
          {candidate.summaryDescription}
        </p>
      </div>
    </div>
  </div>
);

export default withTranslation('voting')(CandidateInfoComponent);
