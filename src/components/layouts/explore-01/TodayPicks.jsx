import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CardModal from "../CardModal";
// import { searchNFT, listMarket } from "../../../apis/nft";
// import { listMarket } from '../apis/nft';

const avatarFake =
    "https://th.bing.com/th/id/R.41a38b3ba31d2b29087c0f4301d64727?rik=qXj%2fEqlMUZ1bTw&pid=ImgRaw&r=0";
// const imageFake = 'http://localhost:3000/static/media/card-item-3.f77cccaaa52fbee68190.jpg';
const TodayPicks = (props) => {
    const data = props.data;

    const [visible, setVisible] = useState(8);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 4);
    };

    const [modalShow, setModalShow] = useState(false);

    const [explore, setExplore] = useState([]);

    async function fetchExplore() {
        // const { data } = await listMarket();
        // setExplore(data.items);
    }

    useEffect(() => {
        fetchExplore();
    }, []);

    const [title, setTitle] = useState("All categories");
    const typeNFT = [
        {
            key: "all",
            value: "All categories",
        },
        {
            key: "image",
            value: "Art",
        },
        {
            key: "audio",
            value: "Music",
        },
        {
            key: "video",
            value: "Video",
        },
    ];

    const [saleTypeTitle, setSaleTypeTitle] = useState();
    const [saleType, setSaleType] = useState("ALL");
    const salesType = [
        {
            key: "ALL",
            value: "All",
        },
        {
            key: 0,
            value: "Buy Now",
        },
        {
            key: 1,
            value: "On Auction",
        },
    ];

    const [type, setType] = useState("all");

    // console.log(type);
    // const [query, setQuery] = useState({
    //     fileType: '',
    //     saleType: 'ALL',
    // });

    const searchNFTtype = async (query) => {
        // const { data } = await searchNFT(query);
        setExplore(data.items);
    };

    useEffect(() => {
        let handelQuery = {
            fileType: "",
            saleType: "ALL",
        };

        if (type) {
            if (type !== "all") {
                handelQuery.fileType = type;
            }
        }
        handelQuery.saleType = saleType;

        searchNFTtype(handelQuery);
    }, [type, saleType]);

    // console.log(type);

    return (
        <Fragment>
            <section className="tf-section sc-explore-1">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="wrap-box explore-1 flex mg-bt-40">
                                <div className="seclect-box style-1">
                                    <div id="item_category" className="dropdown">
                                        <Link to="#" className="btn-selector nolink">
                                            {title}
                                        </Link>
                                        <ul>
                                            {typeNFT.map((item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            setType(item.key);
                                                            setTitle(item.value);
                                                        }}
                                                    >
                                                        {item.value}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                    <div id="buy" className="dropdown">
                                        <Link to="#" className="btn-selector nolink">
                                            Buy Now
                                        </Link>
                                        <ul>
                                            {salesType?.map((item, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            setSaleType(item.key);
                                                            setSaleTypeTitle(item.value);
                                                        }}
                                                    >
                                                        <span>{item.value}</span>
                                                    </li>
                                                );
                                            })}
                                            {/* <li><span>All</span></li>
                                            <li><span>Buy Now</span></li>
                                            <li><span>On Auction</span></li> */}
                                        </ul>
                                    </div>
                                    <div id="all-items" className="dropdown">
                                        <Link to="#" className="btn-selector nolink">
                                            All Items
                                        </Link>
                                        <ul>
                                            <li>
                                                <span>Single Items</span>
                                            </li>
                                            <li>
                                                <span>Bundles</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="seclect-box style-2 box-right">
                                    <div id="artworks" className="dropdown">
                                        <Link to="#" className="btn-selector nolink">
                                            All Artworks
                                        </Link>
                                        <ul>
                                            <li>
                                                <span>Abstraction</span>
                                            </li>
                                            <li>
                                                <span>Skecthify</span>
                                            </li>
                                            <li>
                                                <span>Patternlicious</span>
                                            </li>
                                            <li>
                                                <span>Virtuland</span>
                                            </li>
                                            <li>
                                                <span>Papercut</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div id="sort-by" className="dropdown">
                                        <Link to="#" className="btn-selector nolink">
                                            Sort by
                                        </Link>
                                        <ul>
                                            <li>
                                                <span>Top rate</span>
                                            </li>
                                            <li>
                                                <span>Mid rate</span>
                                            </li>
                                            <li>
                                                <span>Low rate</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {data.slice(0, visible).map((item, index) => (
                            <div
                                key={index}
                                className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6"
                            >
                                <div
                                    className={`sc-card-product ${
                                        item.feature ? "comingsoon" : ""
                                    } `}
                                >
                                    <div className="card-media">
                                        <Link to={`/item-details/${item?.nft?._id}`}>
                                            <img src={item?.nft?.image} alt="axies" />
                                        </Link>
                                        <Link to="/login" className="wishlist-button heart">
                                            <span className="number-like">
                                                {item?.nft?.followers}
                                            </span>
                                        </Link>
                                        <div className="coming-soon">{item.feature}</div>
                                    </div>
                                    <div className="card-title">
                                        <h5 className="style2">
                                            <Link to="/item-details-01">"{item?.nft?.name}"</Link>
                                        </h5>
                                        <div className="tags">{item.tags || "BSC"}</div>
                                    </div>
                                    <div className="meta-info">
                                        <div className="author">
                                            <div className="avatar">
                                                <img
                                                    src={item?.seller?.avatar || avatarFake}
                                                    alt="axies"
                                                />
                                            </div>
                                            <div className="info">
                                                <span>Owned By</span>
                                                <h6>
                                                    {" "}
                                                    <Link to="/authors-02">
                                                        {item?.seller?.title}
                                                    </Link>{" "}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="price">
                                            <span>Current Bid</span>
                                            <h5> {item.unitPrice} ETH</h5>
                                        </div>
                                    </div>
                                    <div className="card-bottom">
                                        <button
                                            onClick={() => setModalShow(true)}
                                            className="sc-button style bag fl-button pri-3 no-bg"
                                        >
                                            <span>Place Bid</span>
                                        </button>
                                        <Link to="/activity" className="view-history reload">
                                            View History
                                        </Link>
                                    </div>
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
            <CardModal show={modalShow} onHide={() => setModalShow(false)} />
        </Fragment>
    );
};

TodayPicks.propTypes = {
    data: PropTypes.array.isRequired,
};

export default TodayPicks;
