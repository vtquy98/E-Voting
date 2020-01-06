import React from 'react';
import Link from 'next/link';

class NormalLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <nav className="navbar navbar-transparent">
          <div className="container-fluid">
            <button className="btn btn-round btn-white btn-just-icon">
              <i className="material-icons">keyboard_arrow_left</i>
            </button>
            <Link href="/user-dashboard">
              <a className="back-btn">Back to the previous page</a>
            </Link>
          </div>
        </nav>
        {children}
        <style jsx>
          {`
            .back-btn {
              position: relative;
              height: 50px;
              line-height: 30px;
              color: inherit;
              padding: 10px 15px;
              font-size: 18px;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default NormalLayout;
