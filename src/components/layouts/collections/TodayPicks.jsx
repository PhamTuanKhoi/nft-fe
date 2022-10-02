import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import CardModal from "../CardModal";
import { nftAPI } from "../../../apis/nft";

const avatarFake =
  "https://th.bing.com/th/id/R.41a38b3ba31d2b29087c0f4301d64727?rik=qXj%2fEqlMUZ1bTw&pid=ImgRaw&r=0";

const TodayPicks = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const [modalShow, setModalShow] = useState(false);

  const getCollections = async () => {
    try {
      const { data } = await nftAPI.get();
      setData(data.items.reverse());
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCollections();
  }, []);

  const [title, setTitle] = useState("All categories");
  const typeNFT = [
    {
      key: "all",
      value: "All categories",
    },
    {
      key: "image",
      value: "Art",
    },
    {
      key: "audio",
      value: "Music",
    },
    {
      key: "video",
      value: "Video",
    },
  ];

  const [saleTypeTitle, setSaleTypeTitle] = useState();
  const [saleType, setSaleType] = useState("ALL");
  const salesType = [
    {
      key: "ALL",
      value: "All",
    },
    {
      key: 0,
      value: "Buy Now",
    },
    {
      key: 1,
      value: "On Auction",
    },
  ];

  return (
    <Fragment>
      <section className="tf-section sc-explore-1">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions">
                <h2 className="tf-title pb-24">Today's Picks</h2>
                <Link to="/explore" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
            {data?.length > 0 &&
              data.slice(0, visible).map((item) => (
                <div
                  key={item._id}
                  className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <div
                    className={`sc-card-product ${
                      item.feature ? "comingsoon" : ""
                    } `}
                  >
                    <div className="card-media">
                      <Link to={`/mining/nft-profile/${item?._id}`}>
                        <img src={item?.media} alt="axies" />
                      </Link>
                      <Link to="/login" className="wishlist-button heart">
                        <span className="number-like"></span>
                      </Link>
                      <div className="coming-soon"></div>
                    </div>
                    <div className="card-title">
                      <h5 className="style2">
                        <Link to="/item-details-01">"{item?.name}"</Link>
                      </h5>
                      <div className="tags"></div>
                    </div>
                    <div className="meta-info">
                      <div className="author">
                        <div className="avatar">
                          <img src={item?.image || avatarFake} alt="axies" />
                        </div>
                        <div className="info">
                          <span>Owned By</span>
                          <h6>
                            <Link to="/authors-02"></Link>
                          </h6>
                        </div>
                      </div>
                      <div className="price">
                        <span>Current Bid</span>
                        <h5> ETH</h5>
                      </div>
                    </div>
                    <div className="card-bottom">
                      <button
                        onClick={() => setModalShow(true)}
                        className="sc-button style bag fl-button pri-3 no-bg"
                      >
                        <span>Place Bid</span>
                      </button>
                      <Link to="/activity" className="view-history reload">
                        View History
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            {visible < data.length && (
              <div className="col-md-12 wrap-inner load-more text-center">
                <Link
                  to="#"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={showMoreItems}
                >
                  <span>Load More</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

export default TodayPicks;
