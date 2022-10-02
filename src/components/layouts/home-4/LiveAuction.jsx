import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Countdown from "react-countdown";
import CardModal from "../CardModal";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { toast } from "react-toastify";
import { nftAPI } from "../../../apis/nft";
import { useWeb3 } from "../../../contexts/Web3Provider/provider";
import { useLoading } from "../../../hooks/useLoading";
import { useNavigate } from "react-router-dom";
import { BagWIcon } from "../../../assets/icons";

const avatarFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
const imageFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";

// 123
const LiveAuction = (props) => {
  const data = props.data;

  const [modalShow, setModalShow] = useState(false);
  const { user } = useWeb3();
  const { setLoading } = useLoading();
  let navigate = useNavigate();

  async function onLoveNft(id) {
    try {
      if (!user?._id) {
        toast.warn(`Please login !`);
        return;
      }
      setLoading(true);
      await nftAPI.likes(id, user?._id);
      props.setReload((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (typeof error.response.data.message === "string") {
          toast.error(error.response.data.message);
        } else {
          error.response.data.message.forEach((item) => {
            toast.error(item);
          });
        }
      }
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Fragment>
      <section
        // className={`${
        //   props.noSlider
        //     ? "tf-section live-auctions noSlider"
        //     : "tf-section live-auctions"
        // }`}
        className="tf-section today-pick"
      >
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions mg-bt-21">
                <h2 className="tf-title pb-18 tf-title style2">
                  Ready To Complete Mine
                </h2>
                <Link to="/search" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
            <div className="col-md-12">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                  1300: {
                    slidesPerView: 4,
                  },
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
                    {/* <div className="swiper-container show-shadow carousel auctions">
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide">
                                                    <div className="slider-item">
                                                      
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                    <>
                      <div className="sc-card-product explode ">
                        <div className="card-media">
                          <Link to={`/mining/nft-profile/${item?._id}`}>
                            <img
                              src={
                                item?.media ||
                                "https://miro.medium.com/max/945/1*W35QUSvGpcLuxPo3SRTH4w.png"
                              }
                              alt={item.name}
                            />
                            {/* <div className="featured-countdown">
                              <span className="slogan"></span>
                              <Countdown date={item.endTime}>
                                <span
                                  style={{
                                    fontSize: 8,
                                  }}
                                >
                                  You are good to go!
                                </span>
                              </Countdown>
                            </div> */}
                            {/* <div className="button-place-bid">
                              <button
                                // onClick={() => setModalShow(true)}
                                data-toggle="modal"
                                data-target="#popup_bid"
                                className="sc-button style-place-bid style bag fl-button pri-3"
                              >
                                <span>Place Bid</span>
                              </button>
                            </div> */}
                          </Link>

                          <div
                            onClick={() => onLoveNft(item?._id)}
                            className="wishlist-button"
                          >
                            <FavoriteIcon
                              sx={{
                                color: `${
                                  item?.likes?.includes(user?._id)
                                    ? "#FF0000"
                                    : "#FFF"
                                }`,
                                fontSize: "24px",
                              }}
                            />

                            <p className="number-like">
                              {item?.likes?.length || 0}
                            </p>
                          </div>

                          {item?.endTime > Date.now() && (
                            <div className="featured-countdown">
                              <span className="slogan"></span>
                              <Countdown date={item?.endTime}>
                                <span>You are good to go!</span>
                              </Countdown>
                            </div>
                          )}
                        </div>
                        <div className="card-title mg-bt-16">
                          <h5>
                            <Link to={`/mining/nft-profile/${item?._id}`}>
                              {item?.name}
                            </Link>
                          </h5>
                          <div className="tags">PN</div>
                        </div>
                        <div className="meta-info">
                          <div className="author">
                            <div className="avatar">
                              <Link
                                to={`/mining/collections/${item?.collectionNft?._id}`}
                              >
                                <img
                                  src={item?.collectionNft?.image}
                                  alt={item?.collectionNft?.name}
                                />
                              </Link>
                            </div>
                            <div className="info">
                              <span>{item?.mining?.levelName}</span>
                              <h6>
                                <Link
                                  to={`/mining/collections/${item?.collectionNft?._id}`}
                                >
                                  {item?.collectionNft?.name}
                                </Link>
                              </h6>
                            </div>
                          </div>
                          <div className="price">
                            <span>Mining Value</span>
                            <h5>{item?.mining?.price} USDC</h5>
                          </div>
                        </div>
                        <div className="card-bottom style-explode">
                          {item?.mint !== true ? (
                            <div className="button-place-bid btn-style ready-mines">
                              <button
                                onClick={() =>
                                  navigate(`/mining/nft-profile/${item?._id}`)
                                }
                                className={
                                  item?.endTime > new Date().getTime() &&
                                  item?.level < 6
                                    ? "custom_button w-100"
                                    : "custom_button w-100 primary"
                                }
                              >
                                <BagWIcon />
                                {item?.endTime < new Date().getTime() &&
                                  item?.mint === false &&
                                  item?.level < 6 && <span>Mine</span>}
                                {item?.endTime > new Date().getTime() &&
                                  item?.level < 6 && <span>Mining</span>}
                                {item?.level === 6 && item?.mint === false && (
                                  <span>Complete Mine</span>
                                )}
                              </button>
                            </div>
                          ) : (
                            <div></div>
                          )}
                          <Link
                            to={`/mining/nft-profile/${item?._id}`}
                            className="view-history reload"
                          >
                            <span>Mine History</span>
                          </Link>
                        </div>
                      </div>
                    </>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

LiveAuction.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LiveAuction;
