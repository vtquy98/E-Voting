import { ACTIONS } from 'redux-api-call';
import { isServer } from '../libs';
import NProgress from 'nprogress';
import Router from 'next/router';

// NProgress.configure({ showSpinner: false });

NProgress.configure({
  template: ` <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="loading">
  <div class="spinner-wrapper">
    <span class="spinner-text">Loading...</span>
    <span class="spinner"></span>
  </div>
</div>`
});

const nprogress = () => {
  //set variable to count number of calling API;
  let callingAPIs = 0;

  const startProgress = path => {
    if (path && path === Router.route) {
      return;
    }
    NProgress.start();
    callingAPIs++;
  };

  const stopProgress = () => {
    callingAPIs--;
    if (callingAPIs <= 0) {
      NProgress.done();
      callingAPIs = 0;
    }
  };

  if (!isServer) {
    Router.events.on('routeChangeStart', startProgress);
    Router.events.on('routeChangeComplete', stopProgress);
    Router.events.on('routeChangeError', stopProgress);
  }

  return next => action => {
    if (!isServer) {
      if (action.type === ACTIONS.START) {
        startProgress();
      }

      if (action.type === ACTIONS.COMPLETE || action.type === ACTIONS.FAILURE) {
        stopProgress();
      }
    }

    return next(action);
  };
};

export default nprogress;
