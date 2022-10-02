import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import shape1 from "../../assets/images/backgroup-secsion/bg-gradient1.png";
import shape2 from "../../assets/images/backgroup-secsion/bg-gradient2.png";
import shape3 from "../../assets/images/backgroup-secsion/bg-gradient3.png";
import imgbg from "../../assets/images/backgroup-secsion/img_bg_page_title.jpg";
import slider from "../../assets/images/slider/VNU_M622_08.png";

const SliderStyle1 = (props) => {
  const data = props.data;
  return (
    <div className="mainslider">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: false }}
        allowTouchMove={false}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className={item.class}>
            <SliderItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

SliderStyle1.propTypes = {
  data: PropTypes.array.isRequired,
};
const SliderItem = (props) => (
  // <div className="flat-title-page" style={{ backgroundImage: `url(${imgbg})` }}>
  <div className="flat-title-page">
    {/* <img className="bgr-gradient gradient1" src={shape1} alt="Axies" />
    <img className="bgr-gradient gradient2" src={shape2} alt="Axies" />
    <img className="bgr-gradient gradient3" src={shape3} alt="Axies" /> */}
    {/* <div className="shape item-w-16"></div>
    <div className="shape item-w-22"></div>
    <div className="shape item-w-32"></div>
    <div className="shape item-w-48"></div>
    <div className="shape style2 item-w-51"></div>
    <div className="shape style2 item-w-51 position2"></div>
    <div className="shape item-w-68"></div> */}
    <div className="overlay"></div>
    <div className="swiper-container mainslider home">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="slider-item">
            <div className="themesflat-container ">
              <div className="wrap-heading flat-slider flex">
                <div className="content mobie-slider">
                  <div className="heading header1">
                    It’s A <span className="color-header">Decentralized</span>{" "}
                    Cave
                  </div>
                  <div className="heading header1">
                    Where <span className="color-header">CoreChangers</span> Are{" "}
                    <span className="color-header">Mining Values</span>
                  </div>
                  <div className="heading header1">
                    To <span className="color-header">boost Up Solutions</span>{" "}
                    Those Help Us
                  </div>
                  <div className="heading header1">
                    To Solve{" "}
                    <span className="color-header">Climate Change</span>{" "}
                    Problems.
                  </div>

                  <div className="margin-slider"></div>
                  <div className="flat-bt-slider flex style2">
                    <Link
                      to="/mining/miningpage"
                      className="sc-button header-slider style style-1 rocket fl-button pri-1"
                    >
                      <span>Explore Cause</span>
                    </Link>
                    {/* <Link
                      to="https://www.notion.so/CoreCave-LitePaper-V1-0-9cb24cd658944f928c3c1a1e1faebf0c"
                      className="sc-button header-slider style style-1 note fl-button pri-1 btn-create"
                    >
                      <span>Cause</span>
                    </Link> */}
                    <a
                      href="https://corecave.notion.site/CoreCave-LitePaper-V1-0-9cb24cd658944f928c3c1a1e1faebf0c"
                      className="sc-button header-slider style style-1 note fl-button pri-1 btn-create"
                      target={"_blank"}
                    >
                      <span>Lite Paper</span>
                    </a>
                  </div>
                </div>
                <div className="image">
                  <img className="slider-custom" src={slider} alt="axies" />
                  {/* <img src={props.item.img} alt="axies" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default SliderStyle1;
