import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import CardModal from "../CardModal";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { toast } from "react-toastify";
import { useWeb3 } from "../../../contexts/Web3Provider/provider";
import { useLoading } from "../../../hooks/useLoading";
import { collectionAPI } from "../../../apis/collection";

const PopularCollection = (props) => {
  const { user } = useWeb3();
  const collections = props?.collections;
  const [modalShow, setModalShow] = useState(false);
  const { setLoading } = useLoading();

  async function onLoveNft(id) {
    try {
      if (!user?._id) {
        toast.warn(`Please login !`);
        return;
      }
      setLoading(true);
      const { data } = await collectionAPI.likes(id, user?._id);

      const newData = props.collections?.map((item) => {
        if (item.id === data._id) {
          return { ...item, likes: [...data.likes] };
        }
        return item;
      });
      props.setCollections(newData);

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
        className={`${
          props?.noSlider
            ? "tf-section popular-collection bg-home-3  noSlider"
            : "tf-section popular-collection bg-home-3 "
        }`}
        // "tf-section popular-collection bg-home-3 "
      >
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions mg-bt-21">
                <h2 className="tf-title pb-18">Popular Tribe</h2>
                <Link to="/search" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
            <div className="col-md-12">
              <div className="collection">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={30}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    767: {
                      slidesPerView: 2,
                    },
                    991: {
                      slidesPerView: 3,
                    },
                  }}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                >
                  {collections?.map((item, index) => {
                    if (item?.nfts.length > 0) {
                      return (
                        <SwiperSlide key={index}>
                          <PopularCollectionItem
                            onLoveNft={onLoveNft}
                            user={user}
                            item={item}
                          />
                        </SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};
// PopularCollection.propTypes = {
//   data: PropTypes.array.isRequired,
// };

const PopularCollectionItem = (props) => (
  <div className="swiper-container show-shadow carousel4 button-arow-style">
    <div className="swiper-wrapper">
      {" "}
      {/* new__collection */}
      <div className="swiper-slide">
        <div className="slider-item">
          <div className="sc-card-collection">
            <div className="card-bottom">
              <div className="author">
                <div className="sc-author-box style-2">
                  <div className="author-avatar">
                    <Link to={`/mining/collections/${props.item?.id}`}>
                      <img
                        src={
                          props.item?.image ||
                          "https://miro.medium.com/max/945/1*W35QUSvGpcLuxPo3SRTH4w.png"
                        }
                        alt="Axies"
                        className="avatar"
                        loading="lazy"
                      />
                    </Link>
                    <div className="badge">
                      <i className="ripple"></i>
                    </div>
                  </div>
                </div>
                <div className="content">
                  <h4>
                    <Link to={`/mining/collections/${props.item?.id}`}>
                      {props.item?.name}
                    </Link>
                  </h4>
                  <div className="infor">
                    <span>Created by</span>
                    <h5>
                      <Link to={`/mining/collections/${props.item?.id}`}>
                        {props.item?.creator?.displayName || "Corecave"}
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
              <div
                onClick={() => props.onLoveNft(props?.item?.id)}
                className="wishlist-button"
              >
                <FavoriteIcon
                  sx={{
                    color: `${
                      props?.item?.likes?.includes(props.user?._id)
                        ? "#FF0000"
                        : "#FFF"
                    }`,
                    fontSize: "24px",
                  }}
                />

                <p className="number-like">{props?.item?.likes?.length || 0}</p>
              </div>
            </div>

            <Link to={`/mining/collections/${props.item?.id}`}>
              <div className="media-images-box">
                {props.item?.nfts && props.item?.nfts?.length > 0 && (
                  <img
                    src={props.item?.nfts[0]?.media}
                    alt={props.item?.nfts[0]?.media}
                    loading="lazy"
                  />
                )}
                <div className="bottom-media">
                  {props.item?.nfts &&
                    props.item?.nfts.length > 0 &&
                    props.item?.nfts.slice(1, 4).map((nft, index) => {
                      return (
                        <img
                          key={index}
                          src={nft?.media}
                          alt={nft?.media}
                          loading="lazy"
                        />
                      );
                    })}

                  {props.item?.nfts.length < 2 && (
                    <div className="image-fake"></div>
                  )}
                </div>
                {/* {props.item?.nfts && props.item?.nfts?.length > 0 && (
                  <img
                    className="img__main"
                    src={props.item?.nfts[0]?.media}
                    alt={props.item?.nfts[0]?.media}
                    loading="lazy"
                  />
                )}

                <div className="right__img">
                  {props.item?.nfts &&
                    props.item?.nfts.length > 0 &&
                    props.item?.nfts.slice(1, 4).map((nft, index) => {
                      return (
                        <img
                          key={index}
                          src={nft?.media}
                          alt={nft?.media}
                          loading="lazy"
                        />
                      );
                    })}

                  
                </div> */}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PopularCollection;
