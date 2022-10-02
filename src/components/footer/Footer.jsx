import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logodark from "../../assets/images/logo/logo_dark.png";
import logofooter from "../../assets/images/logo/logo2.png";
import hoaki from "../../assets/images/logo/logo-url-removebg.png";

const Footer = () => {
  const accountList = [
    {
      title: "Cause",
      link: "/mining/miningpage",
    },
    {
      title: "CoreChangers",
      link: "/mining/corechangeraking",
    },
    {
      title: "Squad",
      link: "/mining/teamrating",
    },
    // {
    //   title: "Create Item",
    //   link: "/create-item",
    // },
  ];
  const resourcesList = [
    // {
    //   title: "Lite Paper",
    //   link: "https://periwinkle-orchid-543.notion.site/CoreCave-LitePaper-V1-0-9cb24cd658944f928c3c1a1e1faebf0c",
    // },
    {
      title: "Activity",
      link: "#",
    },
    // {
    //   title: "Item Details",
    //   link: "/item-details",
    // },
    // {
    //   title: "Activity",
    //   link: "/activity",
    // },
  ];
  const companyList = [
    {
      title: "Explore",
      link: "/explore",
    },
    {
      title: "Contact Us",
      link: "/contact",
    },
    {
      title: "Our Blog",
      link: "/blog",
    },
    {
      title: "FAQ",
      link: "/faq",
    },
  ];
  const socialList = [
    {
      icon: "fab fa-facebook",
      link: "#",
    },
    {
      icon: "fab fa-telegram-plane",
      link: "#",
    },
    {
      icon: "fab fa-twitter",
      link: "#",
    },
    // {
    //   icon: "fab fa-discord",
    //   link: "#",
    // },
    // {
    //   icon: "fab fa-youtube",
    //   link: "#",
    // },
    // {
    //   icon: "icon-fl-tik-tok-2",
    //   link: "#",
    // },
    // {
    //   icon: "icon-fl-vt",
    //   link: "#",
    // },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      <footer id="footer" className="footer-light-style clearfix bg-style">
        <div className="themesflat-container footer__responsive">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12">
              <div className="widget widget-logo">
                <div className="logo-footer" id="logo-footer">
                  <Link to="/">
                    <img
                      // style={{ width: "100px", height: "65px" }}
                      className="logo-dark logofooter-beta"
                      id="logo_footer"
                      src={hoaki}
                      alt="nft-gaming"
                    />
                  </Link>
                </div>
                <p className="sub-widget-logo">
                  <div className="widget-social style-1 mg-t32">
                    <ul>
                      {/* <li>
                        <a href="#" target={"_blank"}>
                          <i className="fab fa-facebook"></i>
                        </a>
                      </li> */}
                      <li>
                        <a
                          href="https://twitter.com/corecave"
                          target={"_blank"}
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/corecave.io"
                          target={"_blank"}
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://t.me/+y22eS7e8bps2NjQ1"
                          target={"_blank"}
                        >
                          <i className="fab fa-telegram"></i>
                        </a>
                      </li>
                      {/* {socialList.map((item, index) => (
                        <li key={index}>
                          <Link to={item.link}>
                            <i className={item.icon}></i>
                          </Link>
                        </li>
                      ))} */}
                      {/* <li>
                        <Link to="#">
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                          >
                            <path
                              d="M18 0.5V12.3756L13.304 17.1249H9.391L6.954 19.5H3.913V17.1249H0V3.66616L1.227 0.5H18ZM16.435 2.08308H3.13V13.9587H6.26V16.3328L8.609 13.9577H13.304L16.434 10.7915V2.08308H16.435ZM13.305 5.24924V9.99949H11.739V5.25025H13.304L13.305 5.24924ZM9.391 5.24924V9.99949H7.826V5.25025H9.391V5.24924Z"
                              fill="#FFFFFF"
                            />
                          </svg>
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu style-1">
                <h5 className="title-widget">Core</h5>
                <ul>
                  {accountList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-7 col-7">
              <div className="widget widget-menu style-2">
                <h5 className="title-widget">Resources</h5>
                <ul>
                  <li>
                    <a
                      href="https://corecave.notion.site/CoreCave-LitePaper-V1-0-9cb24cd658944f928c3c1a1e1faebf0c"
                      target={"_blank"}
                    >
                      Lite Paper
                    </a>
                  </li>
                  {resourcesList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* none display */}
            <div
              className="col-lg-2 col-md-4 col-sm-5 col-5"
              style={{ opacity: 0 }}
            ></div>
            {/* <div className="col-lg-2 col-md-4 col-sm-5 col-5">
              <div className="widget widget-menu fl-st-3">
                <h5 className="title-widget">Company</h5>
                <ul>
                  {companyList.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
            {/* <div className="col-lg-3 col-md-6 col-sm-7 col-12">
              <div className="widget widget-subcribe">
                <h5 className="title-widget">Subscribe Us</h5>
                <div className="form-subcribe">
                  <form
                    id="subscribe-form"
                    action="#"
                    method="GET"
                    acceptCharset="utf-8"
                    className="form-submit"
                  >
                    <input
                      name="email"
                      className="email"
                      type="email"
                      placeholder="info@yourgmail.com"
                      required
                    />
                    <button id="submit" name="submit" type="submit">
                      <i className="icon-fl-send"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </footer>
      {isVisible && <Link onClick={scrollToTop} to="#" id="scroll-top"></Link>}

      <div
        className="modal fade popup"
        id="popup_bid"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body space-y-20 pd-40">
              <h3>Place a Bid</h3>
              <p className="text-center">
                You must bid at least{" "}
                <span className="price color-popup">4.89 ETH</span>
              </p>
              <input
                type="text"
                className="form-control"
                placeholder="00.00 ETH"
              />
              <p>
                Enter quantity. <span className="color-popup">5 available</span>
              </p>
              <input type="number" className="form-control" placeholder="1" />
              <div className="hr"></div>
              <div className="d-flex justify-content-between">
                <p> You must bid at least:</p>
                <p className="text-right price color-popup"> 4.89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Service free:</p>
                <p className="text-right price color-popup"> 0,89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Total bid amount:</p>
                <p className="text-right price color-popup"> 4 ETH </p>
              </div>
              <Link
                to="#"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"
                aria-label="Close"
              >
                {" "}
                Place a bid
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
