import React, { useState, useEffect } from "react";
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
// import { getFeature } from "../../apis/nft";

const Slider = (props) => {
    const data = props.data;

    const [feature, setFeature] = useState();
    async function fetchFeature() {
        // const { data } = await getFeature();
        // setFeature(data[1]);
    }

    useEffect(() => {
        fetchFeature();
    }, []);

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
                        <SliderItem item={item} feature={feature} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

Slider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number,
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
                                    <h1 className="heading mb-style">
                                        <span className="tf-text s1">{props.item.title_2}</span>
                                    </h1>
                                    <p className="sub-heading sub-custom">
                                        {props.item.description}
                                    </p>
                                    <div className="flat-bt-slider flex style2">
                                        <Link
                                            to="/explore-01"
                                            className="sc-button header-slider style style-1 rocket fl-button pri-1"
                                        >
                                            <span>Explore</span>
                                        </Link>
                                        <Link
                                            to="/create-item"
                                            className="sc-button header-slider style style-1 note fl-button pri-1"
                                        >
                                            <span>Create</span>
                                        </Link>
                                    </div>
                                    {/* <div className="content-bottom-left">
                                        <h2 className="bt-title-top heading">
                                            Change The World for Better Futures
                                        </h2>
                                        <p className="sub-desc sub-heading">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip
                                        </p>
                                    </div> */}
                                </div>
                                <div className="image">
                                    <img className="img-bg" src={props.item.imgbg} alt="axies" />
                                    <img
                                        className="img-main-slider"
                                        src={
                                            props.feature?.nft?.image
                                                ? props.feature?.nft?.image
                                                : "./assets/images/backgroup-secsion/space.png"
                                        }
                                        alt="axies"
                                    />
                                    <div className="content-bottom-right">
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

                                        <div className="bor"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
export default Slider;
