import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import img1 from "../../../assets/images/avatar/avt-1.jpg";
import img2 from "../../../assets/images/avatar/avt-2.jpg";
import img3 from "../../../assets/images/avatar/avt-4.jpg";
import img4 from "../../../assets/images/avatar/avt-5.jpg";
import img5 from "../../../assets/images/avatar/avt-3.jpg";
import img6 from "../../../assets/images/avatar/avt-8.jpg";
import img7 from "../../../assets/images/avatar/avt-6.jpg";
import img8 from "../../../assets/images/avatar/avt-9.jpg";
import img9 from "../../../assets/images/avatar/avt-7.jpg";

const TopCard = () => {
    const [dataTopCard] = useState([
        {
            id: 1,
            img: img1,
            name: "Crispin Berry",
            price: "214.2 ETH",
        },
        {
            id: 2,
            img: img2,
            name: "Samson Frost",
            price: "205.43 ETH",
        },
        {
            id: 3,
            img: img3,
            name: "Tommy Alvarez",
            price: "170.3 ETH",
        },
        {
            id: 4,
            img: img4,
            name: "Windsor Lane",
            price: "120.7 ETH",
        },
        {
            id: 5,
            img: img5,
            name: "Andy Hurlbutt",
            price: "82.79 ETH",
        },
        {
            id: 6,
            img: img6,
            name: "Blake Banks",
            price: "68.2 ETH",
        },
        {
            id: 7,
            img: img7,
            name: "Monica Lucas",
            price: "52.8 ETH",
        },
        {
            id: 8,
            img: img8,
            name: "Matt Ramos",
            price: "38.4 ETH",
        },
        {
            id: 9,
            img: img9,
            name: "Harper Wilcher",
            price: "29.2 ETH",
        },
        {
            id: 10,
            img: img1,
            name: "Crispin Berry",
            price: "214.2 ETH",
        },
        {
            id: 11,
            img: img2,
            name: "Samson Frost",
            price: "205.43 ETH",
        },
        {
            id: 12,
            img: img3,
            name: "Tommy Alvarez",
            price: "170.3 ETH",
        },
        {
            id: 13,
            img: img4,
            name: "Windsor Lane",
            price: "120.7 ETH",
        },
        {
            id: 14,
            img: img5,
            name: "Andy Hurlbutt",
            price: "82.79 ETH",
        },
        {
            id: 15,
            img: img6,
            name: "Blake Banks",
            price: "68.2 ETH",
        },
    ]);
    return (
        <div>
            <section className="tf-section top-seller home5 s2 ">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <h2 className="tf-title style2 stylealight mb-25 text-left">
                                Top Card Collection
                            </h2>
                            <div className="flat-tabs seller-tab tablet-30">
                                <div className="content-tab mg-t-24">
                                    <Swiper
                                        modules={[Navigation, Scrollbar, A11y]}
                                        spaceBetween={30}
                                        breakpoints={{
                                            0: {
                                                slidesPerView: 2,
                                            },
                                            767: {
                                                slidesPerView: 5,
                                            },
                                            1050: {
                                                slidesPerView: 7,
                                            },
                                            1200: {
                                                slidesPerView: 8,
                                            },
                                            1350: {
                                                slidesPerView: 9,
                                            },
                                        }}
                                        navigation
                                        scrollbar={{ draggable: true }}
                                    >
                                        {dataTopCard.map((item) => (
                                            <SwiperSlide key={item.id}>
                                                <SliderItem item={item} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
const SliderItem = (props) => (
    <div className="sc-author-box style-2">
        <div className="author-avatar">
            <img src={props.item.img} alt="Axies" className="avatar" />
            <div className="badge"></div>
        </div>
        <div className="author-infor">
            <h5>
                <Link to="/author">{props.item.name}</Link>
            </h5>
            <span className="price">{props.item.price}</span>
        </div>
    </div>
);

export default TopCard;
