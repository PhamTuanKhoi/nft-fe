import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import img1 from "../assets/images/box-item/card-item-10.jpg";
import img2 from "../assets/images/box-item/image-box-10.jpg";
import img3 from "../assets/images/box-item/image-box-11.jpg";
import img4 from "../assets/images/box-item/image-box-21.jpg";
import img5 from "../assets/images/box-item/image-box-6.jpg";
import { transactionAPI } from "../apis/transaction";
import moment from "moment";
import { useWeb3 } from "../contexts/Web3Provider/provider";
import HeaderMining from "../components/headerMining/HeaderMining";
import { getHistory } from "../apis/history";
let imageFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";

const Activity01 = () => {
  const [historys, setHistorys] = useState([]);
  const { id } = useParams();
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [name, setName] = useState("");
  const { UNIT } = useWeb3();
  const [dataFilter] = useState([
    {
      icon: "icon-fl-sort-filled",
      name: "Listings",
    },
    {
      icon: "icon-fl-heart-filled",
      name: "Like",
    },
    {
      icon: "icon-fl-buy",
      name: "Purchases",
    },
    {
      icon: "icon-fl-discount",
      name: "Sales",
    },
    {
      icon: "icon-fl-logout",
      name: "Transfer",
    },
    {
      icon: "icon-fl-star",
      name: "Burns",
    },
    {
      icon: "icon-fl-credit-card",
      name: "Bids",
    },
    {
      icon: "icon-fl-users-filled",
      name: "Followings",
    },
  ]);

  const showMoreItems = () => {
    setLimit(limit + 5);
  };

  useEffect(() => {
    fetchHistory();
  }, [id, name]);

  async function fetchHistory() {
    const { data } = await getHistory({ nft: id, name });
    setHistorys(data.items);
  }

  const switchName = (name, type, item) => {
    try {
      switch (name) {
        case "ItemUpdated":
          if (type === 0) {
            return `List sale ${item?.args?._price / 1e18} ${UNIT} by`;
          }
          if (type === 1) {
            return `List for auction ${item?.args?._price / 1e18} ${UNIT} by`;
          }
          return name;
        case "Bought":
          return "Bounght by";
        case "BidAdded":
          return `Bidded ${item?.sale?.unitPrice} ${UNIT} by`;
        default:
          return name;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const switchIcon = (name, type) => {
    switch (name) {
      case "ItemUpdated":
        // fixed
        if (type === 0) {
          return "icon-1";
        }
        // auction
        if (type === 1) {
          return "icon-2";
        }
        return "icon-1";
      case "Bought":
        return "icon-3";
      case "BidAdded":
        return "icon-5";
      default:
        return "icon-5";
    }
  };
  const onClickFilter = (name) => {
    setTypeFilter(name);
  };
  const handleAuthor = (item) => {
    return item?.seller?.length > 0 ? item?.seller[0]?.title : "here";
  };
  return (
    <div>
      {/* <Header /> */}
      <HeaderMining />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Activity 1</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Activity</Link>
                  </li>
                  <li>Activity 1</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-activity s1 tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-12">
              {/* {historys.slice(0, limit).map((item, index) => ( */}
              {historys?.map((item, index) => (
                <div className="sc-card-activity style1" key={index}>
                  <div className="content">
                    <div className="media">
                      <img src={item?.users?.avatar || imageFake} alt="" />
                    </div>
                    <div className="infor">
                      <h3>
                        <Link to={"/item-details/" + item?.nft?._id}>
                          {item?.nft?.name}
                        </Link>
                      </h3>
                      <div className="status">
                        {/* <span className="author">
                          {item?.users?.displayName}
                        </span> */}
                        {switchName(
                          item?.users?.displayName,
                          item?.args?._type,
                          item
                        )}{" "}
                        <span className="author">{handleAuthor(item)}</span>
                      </div>
                      <div className="time">
                        At {moment(item?.createdAt).format("h:mm A")} on{" "}
                        {moment(item?.createdAt).format("Do on MMMM, YYYY")}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`button-active icon ${switchIcon(
                      item?.name,
                      item?.args?._type
                    )}`}
                  ></div>
                </div>
              ))}
              {limit < count && (
                <div className="col-md-12 wrap-inner load-more text-center">
                  <Link
                    to="#"
                    id="load-more"
                    className="sc-button loadmore fl-button pri-3 mt-10"
                    onClick={showMoreItems}
                  >
                    <span>Load More</span>
                  </Link>
                </div>
              )}
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <div id="side-bar" className="side-bar style-2">
                <div className="widget widget-search mgbt-24">
                  <form action="#">
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Enter your word art"
                      required
                    />
                    <button>
                      <i className="icon-fl-search-filled"></i>
                    </button>
                  </form>
                </div>

                <div className="widget widget-filter style-2 mgbt-0">
                  <h3 className="title-widget">Filter</h3>
                  <ul className="box-check">
                    {dataFilter.map((item, index) => (
                      <li key={index}>
                        <Link
                          to="#"
                          onClick={() => onClickFilter(item?.name)}
                          className="box-widget-filter"
                        >
                          <i className={item.icon}></i>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="#"
                    className="clear-check btn-filter style-2"
                    onClick={() => setTypeFilter("")}
                  >
                    Clear All Filters
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Activity01;
