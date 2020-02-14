// import React from 'react';
// // const withInputState = withState('stateInput', 'setStateInput', true);
// import { connect } from 'react-redux';
// import { compose } from 'recompose';
// import { createStructuredSelector } from 'reselect';
// import { Field, reduxForm } from 'redux-form';
// import {
//   getVoting,
//   getVotingDataSelector,
//   resetDataGetVoting,
//   getVotingData,
//   getVotingDataDataSelector,
//   resetDataGetVotingData
// } from '../stores/VotingState';
// import TestComponent from './TestComponent';
// import RenderCheckboxCandidateFieldComponent from './FormField/RenderCheckboxCandidateFieldComponent';
// const connectToRedux = connect(
//   createStructuredSelector({
//     voting: getVotingDataSelector,
//     votingData: getVotingDataDataSelector
//   }),
//   dispatch => ({
//     GetVoting: votingCode => dispatch(getVoting(votingCode)),
//     GetVotingData: votingCode => dispatch(getVotingData(votingCode)),
//     resetData: () => {
//       resetDataGetVotingData(dispatch);
//       resetDataGetVoting(dispatch);
//     }
//   })
// );
// const withForm = reduxForm({ form: 'test' });

// const enhance = compose(
//   connectToRedux,
//   withForm
// );

// class VotingComponent extends React.Component {
//   componentDidMount() {
//     const { code } = this.props;
//     this.props.GetVoting(parseInt(code.code));
//     this.props.GetVotingData(parseInt(code.code));
//   }

//   componentWillUnmount() {
//     this.props.resetData();
//   }
//   render() {
//     const {
//       voting,
//       votingData,
//       handleSubmit,
//       pristine,
//       reset,
//       submitting
//     } = this.props;
//     return (
//       <div className="main-panel-custom">
//         <link
//           rel="stylesheet"
//           type="text/css"
//           href="/static/customs/custom.css"
//         />
//         <div className="content">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="card card-profile">
//                   <div className="card-avatar">
//                     <img
//                       className="img"
//                       src={
//                         votingData
//                           ? votingData.imageDescription
//                           : 'static/assets/img/voting.jpg'
//                       }
//                       alt=""
//                     />
//                   </div>
//                   <div className="card-content">
//                     <h2 className="card-title">{voting && voting.name}</h2>
//                     <div className="row">
//                       {/* <TestComponent /> */}
//                       <form onSubmit={handleSubmit(e => console.log(e))}>
//                         <div>
//                           <div className="col-md-6 col-md-offset-3">
//                             <ul className="list-custom">
//                               {votingData &&
//                                 votingData.candidates.map(
//                                   (candidate, index) => (
//                                     <li className="list-item-custom">
//                                       <Field
//                                         name={candidate.candidateName}
//                                         component={
//                                           RenderCheckboxCandidateFieldComponent
//                                         }
//                                         candidate={candidate.candidateName}
//                                         label={candidate.candidateName}
//                                       />
//                                     </li>
//                                   )
//                                 )}
//                             </ul>
//                           </div>
//                         </div>
//                         <div>
//                           <div className="col-md-6 col-md-offset-3">
//                             <button
//                               className="btn btn-success"
//                               type="submit"
//                               disabled={pristine || submitting}
//                             >
//                               <span className="btn-label">
//                                 <i className="material-icons">check</i>
//                               </span>
//                               Submit
//                               <div className="ripple-container"></div>
//                             </button>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <style jsx>{`
//           .main-panel-custom {
//             padding-top: 32px;
//             position: relative;
//             overflow: auto;
//             min-height: 100%;
//             -webkit-transform: translate3d(0px, 0, 0);
//             -moz-transform: translate3d(0px, 0, 0);
//             -o-transform: translate3d(0px, 0, 0);
//             -ms-transform: translate3d(0px, 0, 0);
//             transform: translate3d(0px, 0, 0);
//             -webkit-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
//             -moz-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
//             -o-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
//             -ms-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
//             transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
//           }
//           .card-profile .card-avatar,
//           .card-testimonial .card-avatar {
//             max-width: 130px;
//             max-height: 130px;
//             margin: -50px auto 0;
//             border-radius: 8%;
//             overflow: hidden;
//             box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42),
//               0 4px 25px 0px rgba(0, 0, 0, 0.12),
//               0 8px 10px -5px rgba(0, 0, 0, 0.2);
//           }
//           .center {
//             display: flex;
//             justify-content: center;
//           }
//         `}</style>
//       </div>
//     );
//   }
// }

// export default enhance(VotingComponent);

// // ul {
// //   margin: 0;
// //   padding: 0;
// // }
// // ul li {
// //   cursor: pointer;
// //   position: relative;
// //   padding: 12px 8px 12px 40px;
// //   background: #eee;
// //   font-size: 18px;
// //   transition: 0.2s;

// //   /* make the list items unselectable */
// //   -webkit-user-select: none;
// //   -moz-user-select: none;
// //   -ms-user-select: none;
// //   user-select: none;
// //   list-style-type: none;
// //   text-align: left;
// // }
// // ul li:nth-child(odd) {
// //   background: #f9f9f9;
// // }
// // ul li:hover {
// //   background: #ddd;
// // }
