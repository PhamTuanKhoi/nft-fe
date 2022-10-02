import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  // useLocation,
  // useParams,
  // useSearchParams,
} from "react-router-dom";
// import avt from "../../assets/images/avatar/avt-2.jpg";
// import imgsun from "../../assets/images/icon/sun.png";
import hoaki from "../../assets/images/logo/cut-headeri-removebg.png";
import { useWeb3 } from "../../contexts/Web3Provider/provider";
// import menuMining from "../../pages/menu-mining";
import menuCollection from "../../pages/collection-menu";
import DarkMode from "./DarkMode";
import logominingdark from "../../assets/images/logo/logo_dark.png";
import ItemCart from "../miningPage/itemcart";
import { useLoading } from "../../hooks/useLoading";
import { IconLogin } from "../../assets/icons";
// import logominingwhite from "../../assets/images/logo/logo-mining.png";
// import logoicon from "../../assets/images/logo/Favicon.png";
// import { shallowCopy } from "ethers/lib/utils";

const HeaderMining = () => {
  const [show, setShow] = useState(false);
  const { login, user, logout } = useWeb3();
  const [showmenu, setShowmenu] = useState(false);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const profileRef = useRef();
  const location = useLocation();
  const { setLoading } = useLoading();

  function showmenuReponsive() {
    showmenu === true ? setShowmenu(false) : setShowmenu(true);
  }

  const headerRef = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const isSticky = (e) => {
    const header = document.querySelector(".js-header");
    const scrollTop = window.scrollY;
    scrollTop >= 300
      ? header.classList.add("is-fixed")
      : header.classList.remove("is-fixed");
    scrollTop >= 400
      ? header.classList.add("is-small")
      : header.classList.remove("is-small");
  };

  // const menuLeft = useRef(null);
  // const btnToggle = useRef(null);
  const btnSearch = useRef(null);

  // const menuToggle = () => {
  //   menuLeft.current.classList.toggle("active");
  //   btnToggle.current.classList.toggle("active");
  // };

  const searchBtn = () => {
    btnSearch.current.classList.toggle("active");
  };
  /* useEffect(() => {

    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        // setShow(!true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]); */

  useEffect(() => {
    document.addEventListener("mousedown", () => {
      setShow(false);
    });
  }, []);

  // const [activeIndex, setActiveIndex] = useState(null);
  // const handleOnClick = (index) => {
  //   setActiveIndex(index);
  // };

  //-------------------dialog----------------
  // const [open, setOpen] = useState(false);

  // const styles = {
  //   dialogPaper: {
  //     minHeight: "80vh",
  //     maxHeight: "80vh",
  //   },
  // };

  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }

      if (showMenuMobile && ref.current && !ref.current.contains(e.target)) {
        setShowMenuMobile(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen, showMenuMobile]);

  return (
    <header
      id="header_main header__responsive"
      className="header_1 js-header mining"
      ref={headerRef}
    >
      <div className={"themesflat-container "}>
        <div className="row">
          <div className="col-md-12">
            <div id="site-header-inner">
              <div className="wrap-box flex">
                <div id="site-logo" className="clearfix">
                  <div id="site-logo-inner">
                    <Link to="/" rel="home" className="main-logo">
                      <div>
                        <img
                          // width="645.73px"
                          className="logo-dark logo-beta"
                          id="logo_footer"
                          src={hoaki}
                          alt="nft-gaming"
                        />
                        <img
                          className="logo-light"
                          id="logo_footer"
                          src={hoaki}
                          alt="nft-gaming"
                        />
                      </div>
                      <img
                        className="logo-light"
                        id="logo_header"
                        src={logominingdark}
                        srcSet={`${logominingdark}`}
                        alt="nft-gaming"
                      />
                    </Link>
                  </div>
                </div>

                <div
                  className="mobile-user"
                  onClick={() => {
                    setShowMenuMobile((prev) => !prev);
                  }}
                  ref={ref}
                >
                  {user ? (
                    <div className="in4-profile">
                      <img
                        className="img-user gapUser"
                        src={user?.avatar || "/user.png"}
                        alt=""
                      />

                      {showMenuMobile && (
                        <ul className={"menu-profile show"} ref={profileRef}>
                          <li>
                            <Link to="/mining/nft-collections-profile">
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link to="/edit-profile">Edit Profile</Link>
                          </li>
                          <li onClick={() => logout()}>
                            <Link to="#">Log out</Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  ) : (
                    <span
                      className="pointer gap"
                      onClick={() => {
                        if (!user) {
                          setLoading(true);
                          setTimeout(() => {
                            login();
                            setLoading(false);
                          }, 2000);
                        }
                      }}
                    >
                      {/* <img src="/Wallet.png" className="icon-wallet" /> */}
                      <IconLogin />
                      {/* <span>Walletconnect</span> */}
                    </span>
                  )}
                </div>

                <div
                  className="mobile-button"
                  // ref={btnToggle}
                  // onClick={menuToggle}
                  // onClick={showmenuReponsive}
                  onClick={() => setIsMenuOpen((oldState) => !oldState)}
                >
                  <span></span>
                </div>
                <div
                  className={
                    "flat-search-btn-mining flex " +
                    (isMenuOpen ? "menu-reponsive" : "")
                  }
                  ref={ref}
                >
                  <div className="menu-box">
                    <ul className="mining">
                      {menuCollection.map((item) => {
                        return (
                          <Link
                            to={item.links}
                            key={item.id}
                            className={
                              location.pathname === item.links
                                ? "actionmenu"
                                : ""
                            }
                          >
                            <li>{item.name}</li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="header-search flat-show-search" id="s1">
                    {/* <Link
                      to="#"
                      className="show-search header-search-trigger"
                      onClick={searchBtn}
                    >
                      <i className="far fa-search"></i>
                    </Link> */}
                    {/* <div className="top-search" ref={btnSearch}>
                      <form
                        action="/search"
                        method="get"
                        role="search"
                        className="search-form"
                      >
                        <input
                          type="search"
                          id="s"
                          className="search-field"
                          placeholder="Search..."
                          name="name"
                          title="Search for"
                          required=""
                        />
                        <button
                          className="search search-submit"
                          type="submit"
                          title="Search"
                        >
                          <i className="icon-fl-search-filled"></i>
                        </button>
                      </form>
                    </div> */}
                  </div>
                  <div
                    className="sc-btn-top mg-r-12"
                    id="site-header"
                    onClick={() => {
                      setShowMenuMobile((prev) => !prev);
                    }}
                  >
                    <div
                      onClick={() => {
                        if (!user) {
                          setLoading(true);
                          setTimeout(() => {
                            login();
                            setLoading(false);
                          }, 2000);
                        }
                      }}
                      className="sc-button header-slider style style-1 wallet fl-button pri-1"
                    >
                      {user ? (
                        <div className="in4-profile">
                          <img
                            className="img-user gapUser"
                            src={user?.avatar || "/user.png"}
                            alt=""
                          />
                          <span className="pointer ">
                            {user?.displayName.length > 15
                              ? user?.displayName.substr(0, 15) + "..."
                              : user?.displayName || "unnamed"}
                          </span>
                        </div>
                      ) : (
                        <span
                          className="pointer gap"
                          onClick={() => {
                            if (!user) {
                              setLoading(true);
                              setTimeout(() => {
                                login();
                                setLoading(false);
                              }, 2000);
                            }
                          }}
                        >
                          {/* <img src="/Wallet.png" className="icon-wallet" /> */}
                          <IconLogin />
                          {/* <span>Walletconnect</span> */}
                        </span>
                      )}
                    </div>

                    {user && showMenuMobile && (
                      <ul className="menu-profile" ref={profileRef}>
                        <li>
                          <Link to="/mining/nft-collections-profile">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/edit-profile">Edit Profile</Link>
                        </li>
                        <li onClick={() => logout()}>
                          <Link to="#">Log out</Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DarkMode />
    </header>
  );
};

export default HeaderMining;
