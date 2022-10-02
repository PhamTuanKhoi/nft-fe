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

const SliderStyle5 = (props) => {
    const data = props.data;
    return (
        <div className="mainslider">
            <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                scrollbar={{ draggable: true }}
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

SliderStyle5.propTypes = {
    data: PropTypes.array.isRequired,
};
const SliderItem = (props) => (
    <div className="flat-title-page" style={{ backgroundImage: `url(${imgbg})` }}>
        <img className="bgr-gradient gradient1" src={shape1} alt="Axies" />
        <img className="bgr-gradient gradient2" src={shape2} alt="Axies" />
        <img className="bgr-gradient gradient3" src={shape3} alt="Axies" />
        <div className="shape item-w-16"></div>
        <div className="shape item-w-22"></div>
        <div className="shape item-w-32"></div>
        <div className="shape item-w-48"></div>
        <div className="shape style2 item-w-51"></div>
        <div className="shape style2 item-w-51 position2"></div>
        <div className="shape item-w-68"></div>
        <div className="overlay"></div>
        <div className="swiper-container mainslider home">
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <div className="slider-item">
                        <div className="themesflat-container ">
                            <div className="wrap-heading flat-slider flex">
                                <div className="content">
                                    <h2 className="heading mb-style">
                                        <span className="tf-text s2">{props.item.title_1}</span>
                                    </h2>
                                    <p className="sub-heading mt-2 mb-6">
                                        {props.item.description}
                                    </p>
                                    <div className="flat-bt-slider flex style2">
                                        <Link
                                            to="/explore"
                                            className="sc-button header-slider style style-1 rocket fl-button pri-1"
                                        >
                                            <span>Explore</span>
                                        </Link>
                                        <Link
                                            to="/create-item"
                                            className="sc-button header-slider style style-1 note fl-button pri-1"
                                        >
                                            <span>Join Now</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="image">
                                    <img className="img-bg" src={props.item.imgbg} alt="axies" />
                                    {/* <img src={props.item.img} alt="axies" /> */}
                                </div>
                            </div>
                            {/* <div className="themesflat-container ">
                                <div className="wrap-heading flat-slider">
                                    <div className="bottom-content">
                                        <div className="bt-content-left">
                                            <h2 className="bottom-title ">
                                                Change The World for Better Futures
                                            </h2>
                                            <p className="sub-bottom-desc">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua. Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco laboris nisi ut aliquip
                                            </p>
                                        </div>
                                        <div className="bt-content-right">
                                            <div className="row-content">
                                                <div className="item">
                                                    <h2 className="title-slider-bt">4,556 </h2>
                                                    <p className="sub-title">Core Changers</p>
                                                </div>
                                                <div className="item">
                                                    {" "}
                                                    <h2 className="title-slider-bt">874</h2>
                                                    <p className="sub-title">Mined Projects</p>
                                                </div>
                                                <div className="item">
                                                    {" "}
                                                    <h2 className="title-slider-bt">$ 195,234k</h2>
                                                    <p className="sub-title">Mined Value</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default SliderStyle5;
