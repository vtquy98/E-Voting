import React from 'react';

const VerticalBarComponent = () => (
  <div
    className="main-menu menu-fixed menu-light menu-accordion"
    data-scroll-to-active="true"
  >
    <div className="main-menu-content">
      <ul
        className="navigation navigation-main"
        id="main-menu-navigation"
        data-menu="menu-navigation"
      >
        <li className=" navigation-header">
          <span>General</span>
          <i
            className=" ft-minus"
            data-toggle="tooltip"
            data-placement="right"
            data-original-title="General"
          ></i>
        </li>
        <li className=" nav-item">
          <a href="index.html">
            <i className="ft-home"></i>
            <span className="menu-title" data-i18n="">
              Dashboard
            </span>
            <span className="badge badge badge-primary badge-pill float-right mr-2">
              3
            </span>
          </a>
          <ul className="menu-content">
            <li>
              <a className="menu-item" href="dashboard-ecommerce.html">
                eCommerce
              </a>
            </li>
            <li>
              <a className="menu-item" href="dashboard-analytics.html">
                Analytics
              </a>
            </li>
            <li>
              <a className="menu-item" href="dashboard-fitness.html">
                Fitness
              </a>
            </li>
          </ul>
        </li>
        <li className=" nav-item">
          <a href="#">
            <i className="ft-monitor"></i>
            <span className="menu-title" data-i18n="">
              Templates
            </span>
          </a>
          <ul className="menu-content">
            <li>
              <a className="menu-item" href="#">
                Vertical
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="../vertical-modern-menu-template"
                  >
                    Modern Menu
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="../vertical-menu-template">
                    Semi Light
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../vertical-menu-template-semi-dark"
                  >
                    Semi Dark
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../vertical-menu-template-nav-dark"
                  >
                    Nav Dark
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../vertical-menu-template-light"
                  >
                    Light
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../vertical-overlay-menu-template"
                  >
                    Overlay Menu
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="menu-item" href="#">
                Horizontal
              </a>
              <ul className="menu-content">
                <li>
                  <a className="menu-item" href="../horizontal-menu-template">
                    classNameic
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../horizontal-menu-template-nav"
                  >
                    Nav Dark
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className=" nav-item">
          <a href="#">
            <i className="ft-layout"></i>
            <span className="menu-title" data-i18n="">
              Layouts
            </span>
          </a>
          <ul className="menu-content">
            <li>
              <a className="menu-item" href="#">
                Page Layouts
              </a>
              <ul className="menu-content">
                <li>
                  <a className="menu-item" href="layout-1-column.html">
                    1 column
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="layout-2-columns.html">
                    2 columns
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="#">
                    Content Det. Sidebar
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="layout-content-detached-left-sidebar.html"
                      >
                        Detached left sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-content-detached-left-sticky-sidebar.html"
                      >
                        Detached sticky left sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-content-detached-right-sidebar.html"
                      >
                        Detached right sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="layout-content-detached-right-sticky-sidebar.html"
                      >
                        Detached sticky right sidebar
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="navigation-divider"></li>
                <li>
                  <a className="menu-item" href="layout-fixed-navbar.html">
                    Fixed navbar
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="layout-fixed-navigation.html">
                    Fixed navigation
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="layout-fixed-navbar-navigation.html"
                  >
                    Fixed navbar &amp; navigation
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="layout-fixed-navbar-footer.html"
                  >
                    Fixed navbar &amp; footer
                  </a>
                </li>
                <li className="navigation-divider"></li>
                <li>
                  <a className="menu-item" href="layout-fixed.html">
                    Fixed layout
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="layout-boxed.html">
                    Boxed layout
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="layout-static.html">
                    Static layout
                  </a>
                </li>
                <li className="navigation-divider"></li>
                <li>
                  <a className="menu-item" href="layout-light.html">
                    Light layout
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="layout-dark.html">
                    Dark layout
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="layout-semi-dark.html">
                    Semi dark layout
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="menu-item" href="#">
                Navbars
              </a>
              <ul className="menu-content">
                <li>
                  <a className="menu-item" href="navbar-light.html">
                    Navbar Light
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="navbar-dark.html">
                    Navbar Dark
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="navbar-semi-dark.html">
                    Navbar Semi Dark
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="navbar-brand-center.html">
                    Brand Center
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="navbar-fixed-top.html">
                    Fixed Top
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="#">
                    Hide on Scroll
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="navbar-hide-on-scroll-top.html"
                      >
                        Hide on Scroll Top
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="navbar-hide-on-scroll-bottom.html"
                      >
                        Hide on Scroll Bottom
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a className="menu-item" href="navbar-components.html">
                    Navbar Components
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="navbar-styling.html">
                    Navbar Styling
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="menu-item" href="#">
                Vertical Nav
              </a>
              <ul className="menu-content">
                <li>
                  <a className="menu-item" href="#">
                    Navigation Types
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a className="menu-item" href="../vertical-menu-template">
                        Vertical Menu
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../vertical-overlay-menu-template"
                      >
                        Vertical Overlay
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="vertical-nav-compact-menu.html"
                  >
                    Compact Menu
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="vertical-nav-fixed.html">
                    Fixed Navigation
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="vertical-nav-static.html">
                    Static Navigation
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="vertical-nav-light.html">
                    Navigation Light
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="vertical-nav-dark.html">
                    Navigation Dark
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="vertical-nav-accordion.html">
                    Accordion Navigation
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="vertical-nav-collapsible.html">
                    Collapsible Navigation
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="vertical-nav-flipped.html">
                    Flipped Navigation
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="vertical-nav-native-scroll.html"
                  >
                    Native scroll
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="vertical-nav-right-side-icon.html"
                  >
                    Right side icons
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="vertical-nav-bordered.html">
                    Bordered Navigation
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="vertical-nav-disabled-link.html"
                  >
                    Disabled Navigation
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="vertical-nav-styling.html">
                    Navigation Styling
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="vertical-nav-tags-pills.html">
                    Tags &amp; Pills
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="menu-item" href="#">
                Horizontal Nav
              </a>
              <ul className="menu-content">
                <li>
                  <a className="menu-item" href="#">
                    Navigation Types
                  </a>
                  <ul className="menu-content">
                    <li>
                      <a
                        className="menu-item"
                        href="../horizontal-menu-template"
                      >
                        classNameic
                      </a>
                    </li>
                    <li>
                      <a
                        className="menu-item"
                        href="../horizontal-menu-template-nav"
                      >
                        Nav Dark
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a className="menu-item" href="#">
                Page Headers
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="headers-breadcrumbs-basic.html"
                  >
                    Breadcrumbs basic
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="headers-breadcrumbs-top.html">
                    Breadcrumbs top
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="headers-breadcrumbs-bottom.html"
                  >
                    Breadcrumbs bottom
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="headers-breadcrumbs-with-button.html"
                  >
                    Breadcrumbs with button
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="headers-breadcrumbs-with-round-button.html"
                  >
                    Breadcrumbs with round button 2
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="headers-breadcrumbs-with-stats.html"
                  >
                    Breadcrumbs with stats
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a className="menu-item" href="#">
                Footers
              </a>
              <ul className="menu-content">
                <li>
                  <a className="menu-item" href="footer-light.html">
                    Footer Light
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="footer-dark.html">
                    Footer Dark
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="footer-transparent.html">
                    Footer Transparent
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="footer-fixed.html">
                    Footer Fixed
                  </a>
                </li>
                <li>
                  <a className="menu-item" href="footer-components.html">
                    Footer Components
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className=" nav-item">
          <a href="#">
            <i className="ft-zap"></i>
            <span className="menu-title" data-i18n="">
              Starter kit
            </span>
            <span className="badge badge badge-danger badge-pill float-right mr-2">
              New
            </span>
          </a>
          <ul className="menu-content">
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-1-column.html"
              >
                1 column
              </a>
            </li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-2-columns.html"
              >
                2 columns
              </a>
            </li>
            <li>
              <a className="menu-item" href="#">
                Content Det. Sidebar
              </a>
              <ul className="menu-content">
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-content-detached-left-sidebar.html"
                  >
                    Detached left sidebar
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-content-detached-left-sticky-sidebar.html"
                  >
                    Detached sticky left sidebar
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-content-detached-right-sidebar.html"
                  >
                    Detached right sidebar
                  </a>
                </li>
                <li>
                  <a
                    className="menu-item"
                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-content-detached-right-sticky-sidebar.html"
                  >
                    Detached sticky right sidebar
                  </a>
                </li>
              </ul>
            </li>
            <li className="navigation-divider"></li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-fixed-navbar.html"
              >
                Fixed navbar
              </a>
            </li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-fixed-navigation.html"
              >
                Fixed navigation
              </a>
            </li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-fixed-navbar-navigation.html"
              >
                Fixed navbar &amp; navigation
              </a>
            </li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-fixed-navbar-footer.html"
              >
                Fixed navbar &amp; footer
              </a>
            </li>
            <li className="navigation-divider"></li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-fixed.html"
              >
                Fixed layout
              </a>
            </li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-boxed.html"
              >
                Boxed layout
              </a>
            </li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-static.html"
              >
                Static layout
              </a>
            </li>
            <li className="navigation-divider"></li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-light.html"
              >
                Light layout
              </a>
            </li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-dark.html"
              >
                Dark layout
              </a>
            </li>
            <li>
              <a
                className="menu-item"
                href="../../../starter-kit/ltr/vertical-menu-template-light/layout-semi-dark.html"
              >
                Semi dark layout
              </a>
            </li>
          </ul>
        </li>
        <li className=" navigation-header">
          <span>Apps</span>
          <i
            className=" ft-minus"
            data-toggle="tooltip"
            data-placement="right"
            data-original-title="Apps"
          ></i>
        </li>
        <li className=" nav-item">
          <a href="email-application.html">
            <i className="ft-mail"></i>
            <span className="menu-title" data-i18n="">
              Email Application
            </span>
          </a>
        </li>
        <li className=" nav-item">
          <a href="chat-application.html">
            <i className="ft-message-square"></i>
            <span className="menu-title" data-i18n="">
              Chat Application
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default VerticalBarComponent;
