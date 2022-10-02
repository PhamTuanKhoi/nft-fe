import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { badgesAPI } from "../../apis/badges";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// import Slider from "react-slick";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const TopCore = ({ setBadgesId }) => {
  const [badgess, setBadgess] = useState([]);

  useEffect(() => {
    fetchBadges();
  }, []);

  async function fetchBadges() {
    try {
      const { data } = await badgesAPI.get();
      setBadgess(
        data.items
          ?.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          ?.slice(0, 6)
      );
    } catch (error) {
      console.log(error);
    }
  }

  // const [swiper, setSwiper] = useState(null);

  // const slideTo = (index) => {
  //   console.log({ index });
  //   swiper.slideTo(index);
  // };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  // console.log(windowDimensions.width);
  return (
    <div>
      <section className="tf-section top-seller home5 s2 topcore ">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              {/* <div className="heading-live-auctions exp-core">
                <Link to="/search" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div> */}
              <div className="topcore-header">
                <h2 className="tf-title style2 stylealight mb-25 text-left hd-code">
                  Core Changer's Rank
                </h2>
              </div>
              <div
                className="flat-tabs seller-tab tablet-30"
                id="collection_title"
              >
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={30}
                  centerInsufficientSlides={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    440: {
                      slidesPerView: 1,
                    },
                    573: {
                      slidesPerView: 3,
                    },
                    767: {
                      slidesPerView: 4,
                    },
                    991: {
                      slidesPerView: 6,
                    },
                    1300: {
                      slidesPerView: 9,
                    },
                  }}
                  navigation
                  // pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                >
                  {badgess.map((item, index) => (
                    <SwiperSlide key={index}>
                      {({ isActive }) => (
                        <SliderItem
                          item={item}
                          isActive={isActive}
                          index={index}
                          setBadgesId={setBadgesId}
                        />
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const avatarFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
const SliderItem = (props) => {
  return (
    <div className="sc-author-box style-2">
      <div className="author-avatar">
        <img
          onClick={() => props.setBadgesId(props?.item?._id)}
          src={props?.item?.image}
          alt={props?.item?.name}
          className="avatar"
        />
        <div className="badge"></div>
      </div>
      <div className="author-infor">
        <h5>
          <Link onClick={() => props.setBadgesId(props?.item?._id)} to="#">
            {props?.item?.name}
          </Link>
        </h5>
        {/* <span className="price">{props.item.price}</span> */}
      </div>
    </div>
  );
};

export default TopCore;
