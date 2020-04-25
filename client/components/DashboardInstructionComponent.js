import React from 'react';

const DashboardInstructionComponent = () => (
  <div className="card shadow mb-4 border-none">
    <div className="card-header py-3">
      <h6 className="m-0 font-weight-bold text-primary">Instructions</h6>
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
            <strong>Thank you for using our system.</strong>
            <br /> We hope we can bring you good experience.
            <br />
          </p>
          <p>
            In this dashboard, you can view all elections, create new election,
            view your ethereum wallet address also current balance.
          </p>
          <div className="mt-2">
            <strong>To Create new Election:</strong>
          </div>
          <div className="ml-2 mt-1">
            <li>
              Click <code>create new eleciton</code>, type Election's name
            </li>
            <li>Wating for success</li>
            <li>
              Finish some election's information for anyone know more that.
            </li>
          </div>
          <div className="mt-2">
            <strong>Why any action take so long ?</strong>
          </div>
          <div className="ml-2 mt-1">
            <li>
              Well, any action on AGU E-Voting will be write on
              <code> blockchain</code>, so we must be waitting for
              <code> Consensus Mechanism</code>
            </li>
            <li className="mt-1">
              Usually, each action takes about one minute
            </li>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardInstructionComponent;
