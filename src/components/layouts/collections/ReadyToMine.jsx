import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import Countdown from "react-countdown";
import CardModal from "../CardModal";
import img1 from "../../../assets/images/avatar/avt-1.jpg";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { likeProject, loadItemMiningpage } from "../../../apis/projectService";
import { useWeb3 } from "../../../contexts/Web3Provider/provider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLoading } from "../../../hooks/useLoading";
import { toast } from "react-toastify";

const ReadyToMine = () => {
  const [readyToMine, setReadyToMine] = useState([]);
  const { user } = useWeb3();
  const { setLoading } = useLoading();

  useEffect(() => {
    getNft();
  }, []);

  const getNft = async () => {
    const { data } = await loadItemMiningpage();
    setReadyToMine(data.items);
  };

  const [modalShow, setModalShow] = useState(false);

  async function onLoveProject(id) {
    try {
      if (!user?._id) {
        toast.warn(`Please login !`);
        return;
      }
      setLoading(true);
      const { data } = await likeProject(user?._id, id);

      const newData = readyToMine?.map((item) => {
        if (item._id === data._id) {
          return { ...item, likes: [...data.likes] };
        }
        return item;
      });
      setReadyToMine(newData);

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
      <section className="tf-section live-auctions">
        <div className="themesflat-container ready-mine">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions">
                <h2 className="tf-title pb-24">Mined Projects</h2>
                <Link to="/search" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
            <div className="col-md-12">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
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
                  1300: {
                    slidesPerView: 4,
                  },
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {readyToMine?.map((itemproject, index) => {
                  return (
                    <>
                      {itemproject.status === 1 && (
                        <div
                          key={index}
                          className="col-xl-3 col-lg-4 col-md-6 col-12 flex"
                        >
                          <div className="sc-card-product sc-card-product-mining explode width-card">
                            <div className="card-media heigth">
                              <Link to="#">
                                <img src={itemproject?.image} alt="Axies" />
                              </Link>
                              <div
                                onClick={() => onLoveProject(itemproject?._id)}
                                className="wishlist-button"
                              >
                                <FavoriteIcon
                                  sx={{
                                    color: `${
                                      itemproject?.likes?.includes(user?._id)
                                        ? "#FF0000"
                                        : "#FFF"
                                    }`,
                                    fontSize: "24px",
                                  }}
                                />

                                <p className="number-like">
                                  {itemproject?.likes?.length || 0}
                                </p>
                              </div>
                            </div>
                            <div className="card-title mg-bt-16">
                              <h5>
                                <Link to="#">
                                  {itemproject?.name || "unnamed"}
                                </Link>
                              </h5>
                            </div>
                            <div className="meta-info">
                              <div className="author">
                                <div className="avatar">
                                  <img src={itemproject?.image} alt="Axies" />
                                </div>
                                <div className="info">
                                  <span>Organization</span>
                                  <h6>
                                    <Link to="#">{itemproject?.address}</Link>
                                  </h6>
                                </div>
                              </div>
                              <div className="price text-left">
                                <span>Mining Cost</span>
                                <div className="price-details">
                                  <h5>{itemproject?.mintCost} USDC</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

export default ReadyToMine;
