// import React from 'react';
import Link from 'next/link';
// class EmptyPageLayout extends React.Component {
//   render() {
//     const { children, currentUser } = this.props;
//     return (
//       <React.Fragment>
//         <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
//           <div className="navbar-wrapper">
//             <div className="navbar-header ">
//               <ul className="nav navbar-nav ">
//                 <li className="nav-item">
//                   {currentUser && currentUser.role === 'ADMIN' ? (
//                     <Link href="/admin-dashboard">
//                       <a className="navbar-brand">
//                         <img
//                           className="brand-logo"
//                           alt="stack admin logo"
//                           src="/static/assets/images/e-voting-logo.png"
//                           width="30"
//                         />
//                         <h2 className="brand-text">AGU E-VOTING</h2>
//                       </a>
//                     </Link>
//                   ) : (
//                     <Link href="/user/dashboard">
//                       <a className="navbar-brand">
//                         <img
//                           className="brand-logo"
//                           alt="stack admin logo"
//                           src="/static/assets/images/e-voting-logo.png"
//                           width="30"
//                         />
//                         <h2 className="brand-text">AGU E-VOTING</h2>
//                       </a>
//                     </Link>
//                   )}
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//         {children}
//         <style jsx>{`
//           .content {
//             margin-left: 10px !important;
//           }
//           .navbar-header {
//             width: 100% !important;
//             display: flex !important;
//             justify-content: center !important;
//           }
//         `}</style>
//       </React.Fragment>
//     );
//   }
// }
// export default EmptyPageLayout;
import React from 'react';

class EmptyPageLayout extends React.Component {
  render() {
    const { children, currentUser } = this.props;
    return (
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow d-flex justify-content-center">
              <Link
                href={
                  currentUser && currentUser.role === 'ADMIN'
                    ? '/admin-dashboard'
                    : '/user/dashboard'
                }
              >
                <a className="navbar-brand">
                  <img
                    src="/static/assets/images/e-voting-logo.png"
                    width={50}
                    alt="logo"
                  />
                </a>
              </Link>
            </nav>
            <div className="container-fluid">{children}</div>
          </div>
        </div>
        <style jsx>{`
          #content-wrapper {
            min-height: 100vh;
          }
        `}</style>
      </div>
    );
  }
}

export default EmptyPageLayout;
