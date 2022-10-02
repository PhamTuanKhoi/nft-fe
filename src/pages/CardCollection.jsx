import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import popularCollectionData from "../assets/fake-data/data-popular-collection";
import TopCard from "./../components/layouts/card/TopCard";
import { ranking } from "../apis/transaction";
import { collectionSales } from "../apis/collection";
import HeaderMining from "../components/headerMining/HeaderMining";

const avatarFake =
    "https://th.bing.com/th/id/R.41a38b3ba31d2b29087c0f4301d64727?rik=qXj%2fEqlMUZ1bTw&pid=ImgRaw&r=0";
const imageFake =
    "http://localhost:3000/static/media/card-item-3.f77cccaaa52fbee68190.jpg";
const CardCollection = () => {
    const [data] = useState(popularCollectionData);

    const [visible, setVisible] = useState(6);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
    };

    const [topCollection, setTopCollection] = useState([]);
    async function fetchTopCollection() {
        const { data } = await ranking();
        setTopCollection(data.items);
    }
    useEffect(() => {
        fetchTopCollection();
    }, []);
    // console.log(topCollection);
    const [collection, setCollection] = useState([]);
    async function fetchCollectionSales() {
        const { data } = await collectionSales();
        setCollection(data);
    }
    useEffect(() => {
        fetchCollectionSales();
    }, []);
    console.log(collection);
    return (
        <div className="authors">
            {/* <Header /> */}
            <HeaderMining/>
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Card</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Pages</Link>
                                    </li>
                                    <li>Card</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <TopCard data={topCollection} />

            <section className="tf-section our-creater dark-style2">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="tf-title style4 mg-bt-38">
                                Our Card Collection
                            </h2>
                        </div>
                        {collection?.slice(0, visible).map((item, index) => (
                            <div
                                key={index}
                                className="col-lg-4 col-md-6 col-12"
                            >
                                <div className="sc-card-collection style-2">
                                    <div className="card-bottom">
                                        <div className="author">
                                            <div className="sc-author-box style-2">
                                                <div className="author-avatar">
                                                    <img
                                                        src={
                                                            item?.creator
                                                                ?.avatar ||
                                                            avatarFake
                                                        }
                                                        alt="Axies"
                                                        className="avatar"
                                                    />
                                                    <div className="badge"></div>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h4>
                                                    <Link
                                                        to={`/profile/${item?.creator?._id}`}
                                                    >
                                                        {item.creator?.title}
                                                    </Link>
                                                </h4>
                                                <div className="infor">
                                                    <span>
                                                        {item?.nfts?.length}{" "}
                                                        item products
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            to="/login"
                                            className="sc-button fl-button pri-3"
                                        >
                                            <span>Following</span>
                                        </Link>
                                    </div>
                                    <Link to={`/profile/${item?.creator?._id}`}>
                                        {item?.nfts[0]?.fileType ===
                                            "image" && (
                                            <>
                                                <div className="media-images-collection">
                                                    <div className="box-left">
                                                        <img
                                                            src={
                                                                item?.nfts[0]
                                                                    ?.image ||
                                                                imageFake
                                                            }
                                                            alt="Axies"
                                                        />
                                                    </div>
                                                    <div className="box-right">
                                                        <div className="top-img">
                                                            <img
                                                                src={
                                                                    item
                                                                        ?.nfts[1]
                                                                        ?.image ||
                                                                    imageFake
                                                                }
                                                                alt="Axies"
                                                            />
                                                            <img
                                                                src={
                                                                    item
                                                                        ?.nfts[2]
                                                                        ?.image ||
                                                                    imageFake
                                                                }
                                                                alt="Axies"
                                                            />
                                                        </div>
                                                        <div className="bottom-img">
                                                            <img
                                                                src={
                                                                    item
                                                                        ?.nfts[3]
                                                                        ?.image ||
                                                                    imageFake
                                                                }
                                                                alt="Axies"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {item?.nfts[0]?.fileType ===
                                            "audio" && (
                                            <>
                                                <div>
                                                    <audio
                                                        className="audio"
                                                        src={
                                                            item?.nfts[0]?.media
                                                        }
                                                        controls
                                                    />
                                                    <br />
                                                    <p>
                                                        <audio
                                                            className="audio"
                                                            src={
                                                                item?.nfts[1]
                                                                    ?.media
                                                            }
                                                            controls
                                                        />
                                                    </p>
                                                    <p>
                                                        <audio
                                                            className="audio"
                                                            src={
                                                                item?.nfts[2]
                                                                    ?.media
                                                            }
                                                            controls
                                                        />
                                                    </p>
                                                    <p>
                                                        <audio
                                                            className="audio"
                                                            src={
                                                                item?.nfts[3]
                                                                    ?.media
                                                            }
                                                            controls
                                                        />
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        {item?.nfts[0]?.fileType ===
                                            "video" && (
                                            <>
                                                <div className="media-images-collection">
                                                    <div className="box-left">
                                                        <video
                                                            className="img"
                                                            src={
                                                                item?.nfts[0]
                                                                    ?.media
                                                            }
                                                            controls
                                                        />
                                                    </div>
                                                    <div className="box-right">
                                                        <div className="top-img">
                                                            <video
                                                                className="img"
                                                                src={
                                                                    item
                                                                        ?.nfts[1]
                                                                        ?.media
                                                                }
                                                                controls
                                                            />
                                                            <video
                                                                className="img"
                                                                src={
                                                                    item
                                                                        ?.nfts[2]
                                                                        ?.media
                                                                }
                                                                controls
                                                            />
                                                        </div>
                                                        <div className="bottom-img">
                                                            <video
                                                                className="img"
                                                                src={
                                                                    item
                                                                        ?.nfts[3]
                                                                        ?.media
                                                                }
                                                                controls
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </Link>
                                </div>
                            </div>
                        ))}
                        {visible < data.length && (
                            <div className="col-md-12 wrap-inner load-more text-center">
                                <Link
                                    to="#"
                                    id="load-more"
                                    className="sc-button loadmore fl-button pri-3"
                                    onClick={showMoreItems}
                                >
                                    <span>Load More</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default CardCollection;
