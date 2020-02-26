import React from 'react';
import QRCodeComponent from './QRCodeComponent';
import { createVotingUrl } from '../libs';

class QRToPrintComponent extends React.Component {
  render() {
    const { election, candidates } = this.props;
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title text-center">
                {election.electionOwner}
              </h4>
              <h1 className="text-center mt-2">{election.name}</h1>
            </div>
            <div className="card-content">
              <div className="card text-center">
                <div className="card-content">
                  <div className="col-lg-8">
                    <div className="card-body pt-3">
                      <div className="ml-2 mr-2">
                        <QRCodeComponent
                          text={createVotingUrl({
                            electionId: election.id
                          })}
                        />
                      </div>
                      <form className="form text-left">
                        <div className="form-body">
                          <h4 className="form-section">
                            <i className="ft-user"></i> List of Candidates
                          </h4>

                          {candidates.map((candidate, index) => (
                            <h2 className="text-bold-600 m-3">
                              {index + 1}. {candidate.fullName}
                            </h2>
                          ))}

                          <div className="row"></div>
                          <h4 className="form-section">
                            <i className="fa fa-paperclip"></i> Caution
                          </h4>
                          <p className="m-2">
                            1. This is example for caution when manual poll vote
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QRToPrintComponent;
