/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import store from '../stores/store';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// library.add(fas);

class AppRedux extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    const { store } = ctx || {};
    return { pageProps, store };
  }

  render() {
    const { Component, store, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>{pageProps.title || 'Young Radio'}</title>
        </Head>
        <Provider store={store}>
          <ToastContainer autoClose={5000} />
          <Component {...pageProps} />
        </Provider>
      </React.Fragment>
    );
  }
}

export default withRedux(store)(AppRedux);
