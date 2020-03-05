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
    const path = this.props.__NEXT_DATA__.page;

    return (
      <html>
        {path === '/' ? (
          <React.Fragment>
            <Head>
              <link
                rel="stylesheet"
                href="/static/assets-homepage/css/style.css"
              />

              <link
                rel="shortcut icon"
                href="/static/assets-homepage/images/favicon.png"
                type="image/png"
              />

              <link
                rel="stylesheet"
                href="/static/assets-homepage/css/slick.css"
              />

              <link
                rel="stylesheet"
                href="/static/assets-homepage/css/font-awesome.min.css"
              />

              <link
                rel="stylesheet"
                href="/static/assets-homepage/css/LineIcons.css"
              />

              <link
                rel="stylesheet"
                href="/static/assets-homepage/css/animate.css"
              />

              <link
                rel="stylesheet"
                href="/static/assets-homepage/css/magnific-popup.css"
              />

              <link
                rel="stylesheet"
                href="/static/assets-homepage/css/bootstrap.min.css"
              />

              <link
                rel="stylesheet"
                href="/static/assets-homepage/css/default.css"
              />
            </Head>

            <body>
              <Main {...rootProps} />
              <NextScript />

              <script src="/static/assets-homepage/js/vendor/jquery-1.12.4.min.js" />
              <script src="/static/assets-homepage/js/vendor/modernizr-3.7.1.min.js" />

              <script src="/static/assets-homepage/js/popper.min.js" />
              <script src="/static/assets-homepage/js/bootstrap.min.js" />

              <script src="/static/assets-homepage/js/imagesloaded.pkgd.min.js" />
              <script src="/static/assets-homepage/js/isotope.pkgd.min.js" />

              <script src="/static/assets-homepage/js/waypoints.min.js" />
              <script src="/static/assets-homepage/js/jquery.counterup.min.js" />

              <script src="/static/assets-homepage/js/circles.min.js" />

              <script src="/static/assets-homepage/js/jquery.appear.min.js" />

              <script src="/static/assets-homepage/js/wow.min.js" />

              <script src="/static/assets-homepage/js/headroom.min.js" />

              <script src="/static/assets-homepage/js/jquery.nav.js" />

              <script src="/static/assets-homepage/js/scrollIt.min.js" />

              <script src="/static/assets-homepage/js/jquery.magnific-popup.min.js" />

              <script src="/static/assets-homepage/js/slick.min.js" />

              <script src="/static/assets-homepage/js/main.js" />
            </body>
          </React.Fragment>
        ) : (
          <React.Fragment>
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

              <link href="/static/assets/css/font.css" rel="stylesheet" />
              <link
                rel="stylesheet"
                type="text/css"
                href="/static/assets/css/vendors.css"
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
                src="/static/assets/js/core/app-menu.js"
                type="text/javascript"
              ></script>
              <script
                src="/static/assets/js/core/app.js"
                type="text/javascript"
              ></script>
            </body>
          </React.Fragment>
        )}
      </html>
    );
  }
}
