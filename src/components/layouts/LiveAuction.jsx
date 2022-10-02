import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Countdown from "react-countdown";
import CardModal from "./CardModal";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
// import { searchNFT } from "../../apis/nft";

const LiveAuction = (props) => {
    const data = props.data;
    console.log(data);
    const avatarFake =
        "https://th.bing.com/th/id/R.41a38b3ba31d2b29087c0f4301d64727?rik=qXj%2fEqlMUZ1bTw&pid=ImgRaw&r=0";
    const imageFake = "http://localhost:3000/static/media/card-item-3.f77cccaaa52fbee68190.jpg";

    const [modalShow, setModalShow] = useState(false);

    const [liveAuctions, setliveAuctions] = useState();
    async function fetchliveAuctions() {
        // const { data } = await searchNFT({ saleType: 1 }, 1, 20);
        // setliveAuctions(data);
    }

    useEffect(() => {
        fetchliveAuctions();
    }, []);

    // console.log(liveAuctions?.items);

    return (
        <Fragment>
            <section className="tf-section live-auctions">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions">
                                <h2 className="tf-title pb-20">Live Auctions</h2>
                                <Link to="/explore-03" className="exp style2">
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
                                {data?.slice(0, 7).map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="swiper-container show-shadow carousel auctions">
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide">
                                                    <div className="slider-item">
                                                        <div className="sc-card-product">
                                                            <div className="card-media">
                                                                {item?.type === "image" && (
                                                                    <Link
                                                                        to={`/item-details/${item?.nft?._id}`}
                                                                    >
                                                                        <img
                                                                            src={item?.nft?.image}
                                                                            alt="axies"
                                                                        />
                                                                    </Link>
                                                                )}
                                                                {item?.type === "audio" && (
                                                                    <Link
                                                                        to={`/item-details/${item?.nft?._id}`}
                                                                    >
                                                                        <audio
                                                                            src={item?.nft?.media}
                                                                            controls
                                                                        />
                                                                    </Link>
                                                                )}
                                                                {item?.type === "video" && (
                                                                    <Link
                                                                        to={`/item-details/${item?.nft?._id}`}
                                                                    >
                                                                        <video
                                                                            src={item?.nft?.media}
                                                                            controls
                                                                        />
                                                                    </Link>
                                                                )}
                                                                <Link
                                                                    to="/login"
                                                                    className="wishlist-button heart"
                                                                >
                                                                    <span className="number-like">
                                                                        {
                                                                            item?.nft?.followers
                                                                                ?.length
                                                                        }
                                                                    </span>
                                                                </Link>
                                                                <div className="featured-countdown">
                                                                    <span className="slogan"></span>
                                                                    {/* Date.now() + 500000000 */}
                                                                    <Countdown
                                                                        date={
                                                                            // Date.now() +
                                                                            // item.endTime
                                                                            Date.now() + 500000000
                                                                        }
                                                                    >
                                                                        <span>
                                                                            You are good to go!
                                                                        </span>
                                                                    </Countdown>
                                                                </div>
                                                                <div className="button-place-bid">
                                                                    <button
                                                                        onClick={() =>
                                                                            setModalShow(true)
                                                                        }
                                                                        className="sc-button style-place-bid style bag fl-button pri-3"
                                                                    >
                                                                        <span>Place Bid</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="card-title">
                                                                <h5>
                                                                    <Link
                                                                        to={`/item-details/${item?.nft?._id}`}
                                                                    >
                                                                        "{item?.nft.name}"
                                                                    </Link>
                                                                </h5>
                                                                <div className="tags">
                                                                    {item?.nft?.standard || "BSC"}
                                                                </div>
                                                            </div>
                                                            <div className="meta-info">
                                                                <div className="author">
                                                                    <div className="avatar">
                                                                        <img
                                                                            src={
                                                                                item?.seller
                                                                                    ?.avatar ||
                                                                                avatarFake
                                                                            }
                                                                            alt="axies"
                                                                        />
                                                                    </div>
                                                                    <div className="info">
                                                                        <span>Creator</span>
                                                                        <h6>
                                                                            {" "}
                                                                            <Link to="/authors-02">
                                                                                {item.seller.title}
                                                                            </Link>{" "}
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                                <div className="price">
                                                                    <span>Current Bid</span>
                                                                    <h5> {item.unitPrice} ETH</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
