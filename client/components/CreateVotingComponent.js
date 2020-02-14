// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import {
//   addVotingInfo,
//   addVotingInfoDataSelector,
//   getVoting,
//   getVotingDataSelector,
//   resetDataAddVotingInfo,
//   resetDataCreateVoting
// } from '../stores/VotingState';
// import WizardFormSecondPage from './VotingCandidateForm';
// import VotingDescriptionForm from './VotingDescriptionForm';
// import WizardFormThirdPage from './VotingTimeForm';

// const connectToRedux = connect(
//   createStructuredSelector({
//     votingData: getVotingDataSelector,
//     successMessage: addVotingInfoDataSelector
//   }),
//   dispatch => ({
//     GetVoting: votingCode => dispatch(getVoting(votingCode)),
//     AddVotingInfo: ({ votingCode, ...values }) =>
//       dispatch(addVotingInfo({ votingCode, ...values })),
//     resetData: () => {
//       resetDataAddVotingInfo(dispatch);
//       resetDataCreateVoting(dispatch);
//     }
//   })
// );

// class WizardForm extends Component {
//   constructor(props) {
//     super(props);
//     this.nextPage = this.nextPage.bind(this);
//     this.previousPage = this.previousPage.bind(this);
//     this.state = {
//       page: 1
//     };
//   }
//   nextPage() {
//     this.setState({ page: this.state.page + 1 });
//   }

//   previousPage() {
//     this.setState({ page: this.state.page - 1 });
//   }

//   componentDidMount() {
//     const { code } = this.props;
//     this.props.GetVoting(code.code);
//   }

//   componentWillUnmount() {
//     this.props.resetData();
//   }

//   render() {
//     const { votingData, AddVotingInfo, successMessage } = this.props;
//     const { page } = this.state;
//     const code = this.props.code.code;
//     return (
//       <React.Fragment>
//         <div className="container-fluid">
//           <div className="d-sm-flex align-items-center justify-content-between mb-4">
//             <h1 className="h3 mb-0 text-gray-800">Create new election</h1>
//           </div>

//           <div className="row">
//             <div className="col-lg-12">
//               <div className="card shadow mb-4">
//                 <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
//                   <h6 className="m-0 font-weight-bold text-primary">
//                     Create election wizzard
//                   </h6>
//                   <div className="dropdown no-arrow">
//                     <a
//                       className="dropdown-toggle"
//                       href="#"
//                       role="button"
//                       id="dropdownMenuLink"
//                       data-toggle="dropdown"
//                       aria-haspopup="true"
//                       aria-expanded="false"
//                     >
//                       <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
//                     </a>
//                     <div
//                       className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
//                       aria-labelledby="dropdownMenuLink"
//                     >
//                       <div className="dropdown-header">Dropdown Header:</div>
//                       <a className="dropdown-item" href="#">
//                         Action
//                       </a>
//                       <a className="dropdown-item" href="#">
//                         Another action
//                       </a>
//                       <div className="dropdown-divider"></div>
//                       <a className="dropdown-item" href="#">
//                         Something else here
//                       </a>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="card-body">
//                   {successMessage && successMessage.id ? (
//                     <div>
//                       {' '}
//                       <div className="wizard-container">
//                         <div
//                           className="card wizard-card"
//                           data-color="rose"
//                           id="wizardProfile"
//                         >
//                           <div className="wizard-header">
//                             <div className="swal2-icon swal2-success animate">
//                               <span className="line tip animate-success-tip"></span>{' '}
//                               <span className="line long animate-success-long"></span>
//                               <div className="placeholder"></div>{' '}
//                               <div className="fix"></div>
//                             </div>
//                             <h3 className="wizard-title">
//                               {console.log(votingData)}
//                               {votingData && votingData.name.toUpperCase()} has
//                               been created successfully!
//                             </h3>
//                             <h3 className="wizard-title">
//                               CODE: <b>{votingData && votingData.votingCode}</b>
//                             </h3>
//                           </div>
//                           <div className="tab-content">
//                             <div className="row">
//                               <div className="center">
//                                 <div className="col-md-4">
//                                   <div
//                                     className="alert alert-warning alert-with-icon"
//                                     data-notify="container"
//                                   >
//                                     <i
//                                       className="material-icons"
//                                       data-notify="icon"
//                                     >
//                                       settings_applications
//                                     </i>

//                                     <span data-notify="message">
//                                       You can modify your voting
//                                     </span>
//                                   </div>
//                                 </div>

//                                 <div className="col-md-4">
//                                   <div
//                                     className="alert alert-info alert-with-icon"
//                                     data-notify="container"
//                                   >
//                                     <i
//                                       className="material-icons"
//                                       data-notify="icon"
//                                     >
//                                       present_to_all
//                                     </i>

//                                     <span data-notify="message">
//                                       Present this voting now
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="">
//                       <div className="">
//                         <div className="wizard-header">
//                           <h3 className="wizard-title">
//                             {/* {votingData && votingData.name} */}
//                           </h3>
//                           <h5>
//                             This information will let everyone know more about
//                             the voting
//                           </h5>
//                         </div>
//                         <div className="tab-content">
//                           <div className="row">
//                             <div className="col-lg-12">
//                               {page === 1 && (
//                                 <VotingDescriptionForm
//                                   onSubmit={this.nextPage}
//                                 />
//                               )}
//                               {page === 2 && (
//                                 <WizardFormSecondPage
//                                   previousPage={this.previousPage}
//                                   onSubmit={this.nextPage}
//                                 />
//                               )}
//                               {page === 3 && (
//                                 <WizardFormThirdPage
//                                   previousPage={this.previousPage}
//                                   onSubmit={values =>
//                                     AddVotingInfo({
//                                       votingCode: parseInt(code),
//                                       ...values
//                                     })
//                                   }
//                                 />
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <style jsx>{`
//           .material-icons {
//             left: 45%;
//           }
//           .card .tab-content {
//             margin-top: 0;
//           }
//           .center {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }
//         `}</style>
//       </React.Fragment>
//     );
//   }
// }

// WizardForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired
// };

// export default connectToRedux(WizardForm);
