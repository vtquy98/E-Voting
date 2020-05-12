/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import store from '../stores/store';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { appWithTranslation } from '../i18n';

class AppRedux extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    const { store } = ctx || {};
    return { pageProps, store };
  }

  // componentDidMount() {
  //   // An array of assets
  //   const scripts = [
  //     { src: '/static/assets/vendor/jquery/jquery.min.js' },
  //     { src: '/static/assets/vendor/bootstrap/js/bootstrap.bundle.min.js' },
  //     { src: '/static/assets/vendor/jquery-easing/jquery.easing.min.js' },
  //     { src: '/static/assets/js/sb-admin-2.min.js' }
  //   ];
  //   //Append the script element on each iteration

  //   scripts.map(item => {
  //     const script = document.createElement('script');
  //     script.src = item.src;
  //     script.async = false;
  //     document.getElementById('__next').appendChild(script);
  //     return true;
  //   });
  // }

  render() {
    const { Component, store, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>{pageProps.title || 'AGU E-Voting System'}</title>
        </Head>
        <Provider store={store}>
          <ToastContainer autoClose={5000} />
          <Component {...pageProps} />
        </Provider>
      </React.Fragment>
    );
  }
}

export default withRedux(store)(appWithTranslation(AppRedux));
