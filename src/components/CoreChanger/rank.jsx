import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { badgesAPI } from "../../apis/badges";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
export default function Rank({ setBadgedId }) {
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

  return (
    <>
      <div>
        <section className="tf-section top-seller home5 s2 topcore ">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="topcore-header">
                  <h2 className="tf-title style2 stylealight mb-25 text-left">
                    Core Changer's Rank
                  </h2>
                </div>
                <Swiper
                  // _slideClass="layout-swiper"
                  modules={[Navigation, Scrollbar, A11y]}
                  spaceBetween={30}
                  centerInsufficientSlides={true}
                  draggable={false}
                  allowTouchMove={true}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    440: {
                      slidesPerView: 2,
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
                  <div className="flat-tabs seller-tab tablet-30">
                    <div className="content-tab mg-t-24 tab-core">
                      {badgess.map((item, index) => (
                        <SwiperSlide key={index}>
                          <SliderItem item={item} setBadgedId={setBadgedId} />
                        </SwiperSlide>
                      ))}
                    </div>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
const avatarFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
const SliderItem = (props) => (
  <div className="sc-author-box style-2">
    <div
      className="author-avatar"
      onClick={() => props?.setBadgedId(props?.item?._id)}
      style={{ justifyContent: "center" }}
    >
      <img
        src={props?.item?.image || avatarFake}
        alt={props?.item?.name}
        className="avatar"
      />
      <div className="badge"></div>
    </div>
    <div className="author-infor">
      <h5>
        <Link to="#" onClick={() => props?.setBadgedId(props?.item?._id)}>
          {props?.item?.name}
        </Link>
      </h5>
    </div>
  </div>
);
