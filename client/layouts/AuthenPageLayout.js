import React from 'react';

class EmptyPageLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <div className="bg-gradient-primary">
          <div className="container">{children}</div>
        </div>

        <style jsx>{`
          .bg-gradient-primary {
            height: 100vh;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default EmptyPageLayout;
