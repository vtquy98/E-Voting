import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  // /static async getInitialProps(ctx) {
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

          {/* test */}

          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i%7COpen+Sans:300,300i,400,400i,600,600i,700,700i"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/vendors.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/vendors/css/forms/icheck/icheck.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/vendors/css/forms/icheck/custom.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/vendors/css/charts/morris.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/vendors/css/extensions/unslider.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/vendors/css/weather-icons/climacons.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/app.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/core/menu/menu-types/vertical-menu.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/core/colors/palette-climacon.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/core/colors/palette-gradient.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/fonts/simple-line-icons/style.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/fonts/meteocons/style.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/pages/users.css"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/pages/project.css"
          />

          {/* custom css */}
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/custom.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/assets/css/nprogress.css"
          />

          {/* end custom */}
        </Head>
        <body
          className="vertical-layout vertical-menu 2-columns   menu-expanded fixed-navbar"
          data-open="click"
          data-menu="vertical-menu"
          data-col="2-columns"
        >
          <Main {...rootProps} />
          <NextScript />

          <script
            src="/static/assets/vendors/js/vendors.min.js"
            type="text/javascript"
          ></script>

          <script
            src="//maps.googleapis.com/maps/api/js?key=AIzaSyBDkKetQwosod2SZ7ZGCpxuJdxY3kxo5Po"
            type="text/javascript"
          ></script>
          <script
            src="/static/assets/vendors/js/charts/gmaps.min.js"
            type="text/javascript"
          ></script>
          <script
            src="/static/assets/vendors/js/forms/icheck/icheck.min.js"
            type="text/javascript"
          ></script>
          <script
            src="/static/assets/vendors/js/extensions/jquery.knob.min.js"
            type="text/javascript"
          ></script>
          <script
            src="/static/assets/vendors/js/charts/raphael-min.js"
            type="text/javascript"
          ></script>
          <script
            src="/static/assets/vendors/js/charts/morris.min.js"
            type="text/javascript"
          ></script>
          <script
            src="/static/assets/vendors/js/charts/jquery.sparkline.min.js"
            type="text/javascript"
          ></script>
          <script
            src="/static/assets/vendors/js/extensions/unslider-min.js"
            type="text/javascript"
          ></script>
          <script
            src="/static/assets/vendors/js/charts/echarts/echarts.js"
            type="text/javascript"
          ></script>

          <script
            src="/static/assets/js/core/app-menu.js"
            type="text/javascript"
          ></script>
          <script
            src="/static/assets/js/core/app.js"
            type="text/javascript"
          ></script>
          <script
            src="/static/assets/js/scripts/customizer.js"
            type="text/javascript"
          ></script>

          <script
            src="/static/assets/js/scripts/pages/dashboard-fitness.js"
            type="text/javascript"
          ></script>
        </body>
      </html>
    );
  }
}
