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
          <meta name="apple-mobile-web-app-status-bar-style" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="QR Scanner" />
          <meta name="msapplication-TileColor" />
          {/* <meta
            name="msapplication-TileImage"
            content="/static/kosmo/assets/img/icon-150.png"
          />
          <meta name="theme-color" content="#fff" /> */}

          <link
            href="static/assets/vendor/fontawesome-free/css/all.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
            rel="stylesheet"
          />
          <link href="static/assets/css/sb-admin-2.min.css" rel="stylesheet" />
        </Head>
        <body className="">
          <div id="mobile-overlay" className="ks-mobile-overlay" />
          <Main {...rootProps} />
          <NextScript />

          <script src="static/assets/vendor/jquery/jquery.min.js"></script>
          <script src="static/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
          <script src="static/assets/vendor/jquery-easing/jquery.easing.min.js"></script>
          <script src="static/assets/js/sb-admin-2.min.js"></script>
          <script src="static/assets/vendor/chart.js/Chart.min.js"></script>
          <script src="static/assets/js/demo/chart-area-demo.js"></script>
          <script src="static/assets/js/demo/chart-pie-demo.js"></script>
        </body>
      </html>
    );
  }
}
