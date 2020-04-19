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
              <meta charSet="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <meta name="description" content="" />
              <meta name="author" content="" />

              <link
                href="/static/assets/vendor/fontawesome-free/css/all.min.css"
                rel="stylesheet"
                type="text/css"
              />
              <link
                href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                rel="stylesheet"
              />
              <link
                href="/static/assets/css/sb-admin-2.min.css"
                rel="stylesheet"
              />

              <link
                rel="icon"
                href="/static/assets/images/e-voting-logo.png"
                type="image/png"
                sizes="16x16"
              />

              <link href="/static/assets/custom/font.css" rel="stylesheet" />

              <link
                rel="stylesheet"
                type="text/css"
                href="/static/assets/custom/ReactToastify.css"
              />
            </Head>
            <body id="page-top">
              <Main {...rootProps} />
              <NextScript />

              <script src="/static/assets/vendor/jquery/jquery.min.js" />
              <script src="/static/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" />

              <script src="/static/assets/vendor/jquery-easing/jquery.easing.min.js" />

              <script src="/static/assets/js/sb-admin-2.min.js" />
            </body>
          </React.Fragment>
        )}
      </html>
    );
  }
}
