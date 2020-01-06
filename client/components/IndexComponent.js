import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getTypycalUsers,
  getTypycalUsersDataSelector
} from '../stores/UserState';

// const connectToRedux = connect(
//   createStructuredSelector({
//     mostViewArticles: mostViewArticlesDataSelector,
//     lastedArticles: lastedArticlesDataSelector,
//     typycalUsers: getTypycalUsersDataSelector
//   }),
//   dispatch => ({
//     GetMostViewArticles: amount => {
//       dispatch(getMostViewArticles(amount));
//     },
//     GetLastedArticles: amount => {
//       dispatch(getLastedArticles(amount));
//     },
//     GetTypycalUsers: () => {
//       dispatch(getTypycalUsers());
//     }
//   })
// );
const MOST_VIEW_ARTICLES = 3;
const LASTED_ARTICLES = 3;

class IndexBodyComponent extends React.Component {
  componentDidMount() {}

  render() {
    // const {
    //   mostViewArticles = [],
    //   lastedArticles = [],
    //   typycalUsers = []
    // } = this.props;
    return (
      <div className="header-3">
        <nav className="navbar navbar-transparent navbar-absolute navbar-expand-lg">
          <div className="container">
            <div className="navbar-translate">
              <a className="navbar-brand" href="/">
                Creative Tim
              </a>
              <button
                type="button"
                className="ml-auto navbar-toggler"
                data-toggle="collapse"
                data-target="#navigation-example3"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navigation-example3">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#pablo" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#pablo" className="nav-link">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#pablo" className="nav-link">
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#pablo" className="nav-link">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="page-header header-filter bg-1">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 text-left">
                      <h1 className="title">Material Kit PRO</h1>
                      <h4>
                        Dolce &amp; Gabbana is a luxury Italian fashion house
                        founded in 1985 in Legnano by Italian designers Domenico
                        Dolce and Stefano Gabbana. The two met in Milan in 1980
                        and designed for the same fashion house.
                      </h4>
                      <br />
                      <div className="buttons">
                        <a href="#pablo" className="btn btn-danger btn-lg">
                          Read More
                        </a>
                        <a
                          href="#pablo"
                          className="btn btn-just-icon btn-white btn-link"
                        >
                          <i className="fa fa-twitter"></i>
                        </a>
                        <a
                          href="#pablo"
                          className="btn btn-just-icon btn-white btn-link"
                        >
                          <i className="fa fa-facebook-square"></i>
                        </a>
                        <a
                          href="#pablo"
                          className="btn btn-just-icon btn-white btn-link"
                        >
                          <i className="fa fa-get-pocket"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="page-header header-filter bg-2">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 ml-auto mr-auto text-center">
                      <h1 className="title">Material Kit PRO</h1>
                      <h4>
                        Dolce &amp; Gabbana is a luxury Italian fashion house
                        founded in 1985 in Legnano by Italian designers Domenico
                        Dolce and Stefano Gabbana. The two met in Milan in 1980
                        and designed for the same fashion house.
                      </h4>
                      <br />
                      <h6>Connect with us on:</h6>
                      <div className="buttons">
                        <a
                          href="#pablo"
                          className="btn btn-just-icon btn-white btn-link btn-lg"
                        >
                          <i className="fa fa-twitter"></i>
                        </a>
                        <a
                          href="#pablo"
                          className="btn btn-just-icon btn-white btn-link btn-lg"
                        >
                          <i className="fa fa-facebook-square"></i>
                        </a>
                        <a
                          href="#pablo"
                          className="btn btn-just-icon btn-white btn-link btn-lg"
                        >
                          <i className="fa fa-google-plus"></i>
                        </a>
                        <a
                          href="#pablo"
                          className="btn btn-just-icon btn-white btn-link btn-lg"
                        >
                          <i className="fa fa-instagram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="page-header header-filter bg-3">
                <div className="container">
                  <div className="row">
                    <div className="col-md-7 ml-auto text-right">
                      <h1 className="title">New Collection 50% Off</h1>
                      <h4>
                        There&apos;s no doubt that Tesla is delighted with the
                        interest, but the data also raises a few questions. How
                        long will it take for Tesla to fulfill all those extra
                        orders?
                      </h4>
                      <br />
                      <div className="buttons">
                        <a
                          href="#pablo"
                          className="btn btn-white btn-link btn-lg"
                        >
                          <i className="material-icons">share</i> Share Offer
                        </a>
                        <a href="#pablo" className="btn btn-danger btn-lg">
                          <i className="material-icons">shopping_cart</i> Shop
                          Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <i className="material-icons">keyboard_arrow_left</i>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <i className="material-icons">keyboard_arrow_right</i>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <style jsx>{`
          .bg-1 {
            background-image: url('static/images/bg-1.jpg');
            background-size: cover;
            background-position: top center;
          }
          .bg-2 {
            background-image: url('static/images/bg-2.jpg');
            background-size: cover;
            background-position: top center;
          }
          .bg-3 {
            background-image: url('static/images/bg-3.jpg');
            background-size: cover;
            background-position: top center;
          }
        `}</style>
      </div>
    );
  }
}

export default IndexBodyComponent;
