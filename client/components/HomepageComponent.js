import React from 'react';
const HomepageComponent = () => (
  <React.Fragment>
    <header className="header-area">
      <div className="navbar-area headroom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <img
                  src="/static/assets/images/e-voting-logo.png"
                  alt="Logo"
                  width="50"
                />
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                  <span className="toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarSupportedContent"
                >
                  <ul id="nav" className="navbar-nav m-auto">
                    <li className="nav-item active">
                      <a href="#home">Home</a>
                    </li>
                    <li className="nav-item">
                      <a href="#about">About </a>
                    </li>
                    <li className="nav-item">
                      <a href="#services">Why Us</a>
                    </li>

                    <li className="nav-item">
                      <a href="#contact">Contact</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div
        id="home"
        className="header-hero bg_cover d-lg-flex align-items-center"
        style={{
          backgroundImage: `url(/static/assets-homepage/images/header-hero.jpg`
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="header-hero-content">
                <h1
                  className="hero-title wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0.2s"
                >
                  <b>Online </b>
                  <span>Voting</span> For any candidate <b>You trust.</b>
                </h1>
                <div
                  className="wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="0.8s"
                >
                  <a href="/login" className="main-btn text-white">
                    Vote now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="header-hero-image d-flex align-items-center wow fadeInRightBig"
          data-wow-duration="1s"
          data-wow-delay="1.1s"
        >
          <div className="image">
            <img src="/static/assets-homepage/images/img1.svg" alt="Hero" />
          </div>
        </div>
      </div>
    </header>

    <section id="about" className="about-area pt-115">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div
              className="about-title text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <h6 className="welcome">WELCOME</h6>
              <h3 className="title">
                <span>Our has been working to create this system to </span> take
                care of your vote.
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div
              className="about-image mt-60 wow fadeIn text-center"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <img
                src="/static/assets-homepage/images/img2.svg"
                alt="about"
                className="w-50"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-content pt-45">
              <div className="about-counter pt-60">
                <div className="row">
                  <div className="col-sm-4">
                    <div
                      className="single-counter counter-color-1 mt-30 d-flex wow fadeInUp"
                      data-wow-duration="1s"
                      data-wow-delay="0.3s"
                    >
                      <div className="counter-shape">
                        <span className="shape-1"></span>
                        <span className="shape-2"></span>
                      </div>
                      <div className="counter-content media-body">
                        <span className="counter-count">
                          <span className="counter">22</span>
                        </span>
                        <p className="text">Elections</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div
                      className="single-counter counter-color-2 mt-30 d-flex wow fadeInUp"
                      data-wow-duration="1s"
                      data-wow-delay="0.6s"
                    >
                      <div className="counter-shape">
                        <span className="shape-1"></span>
                        <span className="shape-2"></span>
                      </div>
                      <div className="counter-content media-body">
                        <span className="counter-count">
                          <span className="counter">100</span>
                        </span>
                        <p className="text">Users</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div
                      className="single-counter counter-color-3 mt-30 d-flex wow fadeInUp"
                      data-wow-duration="1s"
                      data-wow-delay="0.9s"
                    >
                      <div className="counter-shape">
                        <span className="shape-1"></span>
                        <span className="shape-2"></span>
                      </div>
                      <div className="counter-content media-body">
                        <span className="counter-count">
                          <span className="counter">870</span>
                        </span>
                        <p className="text">Vote count</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="services" className="service-area pt-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-8">
            <div
              className="section-title wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.2s"
            >
              <h6 className="sub-title">Why Us</h6>
              <h4 className="title">
                The reasons to use this system{' '}
                <span>for your next elections</span>
              </h4>
            </div>
          </div>
        </div>
        <div
          className="service-wrapper mt-60 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay="0.6s"
        >
          <div className="row no-gutters justify-content-center pb-5">
            <div className="col-lg-4 col-md-7">
              <div className="single-service d-flex">
                <div className="service-icon">
                  <img
                    src="/static/assets-homepage/images/service-1.png"
                    alt="Icon"
                  />
                </div>
                <div className="service-content media-body">
                  <h4 className="service-title">Good experience</h4>
                  <p className="text">
                    To eliminate paper in the voting process. This involves
                    sending of notices and ballot papers and receiving the said
                    ballot votes. Increase people participation in any meetings.
                  </p>
                </div>
                <div className="shape shape-1">
                  <img
                    src="/static/assets-homepage/images/shape/shape-1.svg"
                    alt="shape"
                  />
                </div>
                <div className="shape shape-2">
                  <img
                    src="/static/assets-homepage/images/shape/shape-2.svg"
                    alt="shape"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-7">
              <div className="single-service service-border d-flex">
                <div className="service-icon">
                  <img
                    src="/static/assets-homepage/images/service-2.png"
                    alt="Icon"
                  />
                </div>
                <div className="service-content media-body">
                  <h4 className="service-title">Bunch of Services</h4>
                  <p className="text">
                    Facilitate electronic voting on resolutions of organizations
                    in a fair and transparent manner for all classes of
                    security/stakeholders, using blockchain.
                  </p>
                </div>
                <div className="shape shape-3">
                  <img
                    src="/static/assets-homepage/images/shape/shape-3.svg"
                    alt="shape"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-7">
              <div className="single-service d-flex">
                <div className="service-icon">
                  <img
                    src="/static/assets-homepage/images/service-3.png"
                    alt="Icon"
                  />
                </div>
                <div className="service-content media-body">
                  <h4 className="service-title">
                    Blockchain Ethereum platform
                  </h4>
                  <p className="text">
                    A blockchain is a good tool to make the tallying procedure
                    public, as long as the votes are recorded in
                    incontrovertible anonymity. This could be implemented
                    through a virtual ballot box, which should be kept secured
                    from possible attacks. Cryptographic tools may also be used
                    for this purpose.
                  </p>
                </div>
                <div className="shape shape-4">
                  <img
                    src="/static/assets-homepage/images/shape/shape-4.svg"
                    alt="shape"
                  />
                </div>
                <div className="shape shape-5">
                  <img
                    src="/static/assets-homepage/images/shape/shape-5.svg"
                    alt="shape"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="testimonial" className="testimonial-area pt-70 pb-120">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-xl-5 col-lg-6">
            <div
              className="testimonial-left-content mt-45 wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <div className="section-title">
                <h6 className="sub-title">Testimonials</h6>
                <h4 className="title">What Users Says, About Us</h4>
              </div>
              <ul className="testimonial-line">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p className="text">
                After experiencing the system trial, they have some comments as
                follows:
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="testimonial-right-content mt-50 wow fadeIn"
              data-wow-duration="1s"
              data-wow-delay="0.6s"
            >
              <div className="quota">
                <i className="lni-quotation"></i>
              </div>
              <div className="testimonial-content-wrapper testimonial-active">
                <div className="single-testimonial">
                  <div className="testimonial-text">
                    <p className="text">
                      “This application is easy to use, beautiful interface, and
                      easy to interact. I like it so much.”
                    </p>
                  </div>
                  <div className="testimonial-author d-sm-flex justify-content-between">
                    <div className="author-info d-flex align-items-center">
                      <div className="author-image">
                        <img
                          src="/static/assets-homepage/images/author-1.jpg"
                          alt="author"
                        />
                      </div>
                      <div className="author-name media-body">
                        <h5 className="name">Nam Nguyen</h5>
                        <span className="sub-title">Student, AGU</span>
                      </div>
                    </div>
                    <div className="author-review">
                      <ul className="star">
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                      </ul>
                      <span className="review">( 7 Reviews )</span>
                    </div>
                  </div>
                </div>
                <div className="single-testimonial">
                  <div className="testimonial-text">
                    <p className="text">
                      “I like the blockchain nature in this application   .”
                    </p>
                  </div>
                  <div className="testimonial-author d-sm-flex justify-content-between">
                    <div className="author-info d-flex align-items-center">
                      <div className="author-image">
                        <img
                          src="/static/assets-homepage/images/author-2.jpg"
                          alt="author"
                        />
                      </div>
                      <div className="author-name media-body">
                        <h5 className="name">Thai Nguyen</h5>
                        <span className="sub-title">Student, AGU</span>
                      </div>
                    </div>
                    <div className="author-review">
                      <ul className="star">
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                      </ul>
                      <span className="review">( 7 Reviews )</span>
                    </div>
                  </div>
                </div>
                <div className="single-testimonial">
                  <div className="testimonial-text">
                    <p className="text">
                      “It only takes me 1 minute to vote for a candidate I
                      trust, not a lot of time like the traditional voting
                      method.”
                    </p>
                  </div>
                  <div className="testimonial-author d-sm-flex justify-content-between">
                    <div className="author-info d-flex align-items-center">
                      <div className="author-image">
                        <img
                          src="/static/assets-homepage/images/author-3.jpg"
                          alt="author"
                        />
                      </div>
                      <div className="author-name media-body">
                        <h5 className="name">Nhut Le</h5>
                        <span className="sub-title">Student, AGU</span>
                      </div>
                    </div>
                    <div className="author-review">
                      <ul className="star">
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                        <li>
                          <i className="lni-star"></i>
                        </li>
                      </ul>
                      <span className="review">( 7 Reviews )</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" className="contact-area pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div
              className="section-title text-center pb-20 wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay="0.3s"
            >
              <h6 className="sub-title">Our Contact</h6>
              <h4 className="title">
                Get In <span>Touch.</span>
              </h4>
            </div>
          </div>
        </div>
        <div className="contact-info pt-30">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div
                className="single-contact-info contact-color-1 mt-30 d-flex  wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="0.3s"
              >
                <div className="contact-info-icon">
                  <i className="lni-map-marker"></i>
                </div>
                <div className="contact-info-content media-body">
                  <p className="text">
                    18 Ung Van Khiem, Dong Xuyen Ward
                    <br />
                    Long Xuyen City, An Giang.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="single-contact-info contact-color-2 mt-30 d-flex  wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="0.6s"
              >
                <div className="contact-info-icon">
                  <i className="lni-envelope"></i>
                </div>
                <div className="contact-info-content media-body">
                  <p className="text">agu@e-voting.tech</p>
                  <p className="text">vtquy98@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="single-contact-info contact-color-3 mt-30 d-flex  wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="0.9s"
              >
                <div className="contact-info-icon">
                  <i className="lni-phone"></i>
                </div>
                <div className="contact-info-content media-body">
                  <p className="text">+84 34 306 2244</p>
                  <p className="text">+84 34 306 2244</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div
              className="contact-wrapper-form pt-115  wow fadeInUpBig"
              data-wow-duration="1s"
              data-wow-delay="0.5s"
            >
              <h4 className="contact-title pb-10">
                <i className="lni-envelope"></i> Leave <span>A Message.</span>
              </h4>

              <form
                id="contact-form"
                action="/static/assets-homepage/contact.php"
                method="post"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="contact-form mt-45">
                      <label>Enter Your Name</label>
                      <input type="text" name="name" placeholder="Full Name" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="contact-form mt-45">
                      <label>Enter Your Email</label>
                      <input type="email" name="email" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="contact-form mt-45">
                      <label>Your Message</label>
                      <textarea
                        name="message"
                        placeholder="Enter your message..."
                      ></textarea>
                    </div>
                  </div>
                  <p className="form-message"></p>
                  <div className="col-md-12">
                    <div className="contact-form mt-45">
                      <button type="submit" className="main-btn">
                        Send Now
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer
      id="footer"
      className="footer-area bg_cover"
      style={{
        backgroundImage: 'url(/static/assets-homepage/images/footer-bg.jpg)'
      }}
    >
      <div className="container">
        <div className="footer-widget pt-30 pb-70">
          <div className="row">
            <div className="col-lg-3 col-sm-6 order-sm-1 order-lg-1">
              <div className="footer-about pt-40">
                <a href="#" className="ml-2">
                  <img
                    src="/static/assets/images/e-voting-logo.png"
                    alt="Logo"
                    width="50"
                  />
                </a>

                <p className="text">
                  Make your voting more easy <br /> More secure
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 order-sm-3 order-lg-2">
              <div className="footer-link pt-40">
                <div className="footer-title">
                  <h5 className="title">Services</h5>
                </div>
                <ul>
                  <li>
                    <a href="#">Elections</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 order-sm-4 order-lg-3">
              <div className="footer-link pt-40">
                <div className="footer-title">
                  <h5 className="title">About Us</h5>
                </div>
                <ul>
                  <li>
                    <a href="#">Overview</a>
                  </li>
                  <li>
                    <a href="#">Why us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 order-sm-2 order-lg-4">
              <div className="footer-contact pt-40">
                <div className="footer-title">
                  <h5 className="title">Contact Info</h5>
                </div>
                <div className="contact pt-10">
                  <p className="text">
                    18 Ung Van Khiem, Dong Xuyen Ward <br />
                    Long Xuyen City, An Giang.
                  </p>
                  <p className="text">agu@e-voting.tech</p>
                  <p className="text">+84 34 306 2244</p>

                  <ul className="social mt-40">
                    <li>
                      <a href="#">
                        <i className="lni-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="lni-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="lni-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="lni-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center">
          <p className="text">
            © 2020 Crafted by vtquy98@gmail.com All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>

    <a href="#" className="back-to-top">
      <i className="lni-chevron-up"></i>
    </a>
  </React.Fragment>
);

export default HomepageComponent;
