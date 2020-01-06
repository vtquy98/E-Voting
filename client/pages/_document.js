import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

//theme by user info or server config
// const THEME = 'royal-blue';

// const getThemeUrl = (themeUI = 'bermuda-gray') =>
//   `/static/kosmo/assets/styles/themes/${themeUI}.min.css`;

export default class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   const themeName = THEME;
  //   return { ...initialProps, themeName };
  // }

  render() {
    const rootProps = this.props;

    return (
      <html>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="React-Voting" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#466bde"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="QR Scanner" />
          <meta name="msapplication-TileColor" content="#466bde" />
          {/* <meta
            name="msapplication-TileImage"
            content="/static/kosmo/assets/img/icon-150.png"
          />
          <meta name="theme-color" content="#fff" /> */}
          <link href="/static/assets/css/bootstrap.min.css" rel="stylesheet" />
          <link
            href="/static/assets/css/material-dashboard.css"
            rel="stylesheet"
          />
          <link
            href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
          />
        </Head>
        <body className="">
          <div id="mobile-overlay" className="ks-mobile-overlay" />
          <Main {...rootProps} />
          <NextScript />

          {/* <script src="/static/assets/js/jquery-3.1.1.min.js" />
          <script src="/static/assets/js/jquery-ui.min.js" />
          <script src="/static/assets/js/bootstrap.min.js" />
          <script src="/static/assets/js/material.min.js" />
          <script src="/static/assets/js/perfect-scrollbar.jquery.min.js" /> */}
          <script src="/static/assets/js/jquery-3.1.1.min.js" />
          <script src="/static/assets/js/jquery-ui.min.js" />
          <script src="/static/assets/js/bootstrap.min.js" />
          <script src="/static/assets/js/material.min.js" />
          <script src="/static/assets/js/perfect-scrollbar.jquery.min.js" />
          <script src="/static/assets/js/material-dashboard.js" />
          <script src="/static/assets/js/jquery.bootstrap-wizard.js" />
          <script src="/static/assets/js/bootstrap-tagsinput.js" />

          {/* <script type="text/javascript">
            $().ready(function() {demo.initMaterialWizard()})
          </script> */}
        </body>
      </html>
    );
  }
}
