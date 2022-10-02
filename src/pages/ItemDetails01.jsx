import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Link, useParams } from "react-router-dom";
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import liveAuctionDatas from "../assets/fake-data/data-explore";
import LiveAuction from "../components/layouts/LiveAuction";
import img1 from "../assets/images/avatar/avt-3.jpg";
import img2 from "../assets/images/avatar/avt-11.jpg";
import img3 from "../assets/images/avatar/avt-1.jpg";
import img4 from "../assets/images/avatar/avt-5.jpg";
import img5 from "../assets/images/avatar/avt-7.jpg";
import img6 from "../assets/images/avatar/avt-8.jpg";
import img7 from "../assets/images/avatar/avt-2.jpg";
import imgdetail1 from "../assets/images/box-item/images-item-details.jpg";
import { getNft } from "../apis/nft";
import HeaderMining from "../components/headerMining/HeaderMining";

const ItemDetails01 = () => {
    const [dataHistory] = useState([
        {
            img: img2,
            name: "Mason Woodward",
            time: "at 06/10/2021, 3:20 AM",
            price: "4.89 ETH",
            priceChange: "$12.246",
        },
        {
            img: img3,
            name: "Mason Woodward",
            time: "8 hours ago",
            price: "4.89 ETH",
            priceChange: "$12.246",
        },
        {
            img: img4,
            name: "Mason Woodward",
            time: "8 hours ago",
            price: "4.89 ETH",
            priceChange: "$12.246",
        },
        {
            img: img5,
            name: "Mason Woodward",
            time: "8 hours ago",
            price: "4.89 ETH",
            priceChange: "$12.246",
        },
        {
            img: img6,
            name: "Mason Woodward",
            time: "8 hours ago",
            price: "4.89 ETH",
            priceChange: "$12.246",
        },
    ]);

    const { id } = useParams();
    const [nft, setNft] = useState({
        img: img2,
        name: "Mason Woodward",
        time: "at 06/10/2021, 3:20 AM",
        price: "4.89 ETH",
        priceChange: "$12.246",
        followers: "100",
        description:
            "Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed ipsum vitae ipsum malesuada.  Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed ipsum",
    });
    const [sales, setSales] = React.useState([
        { unitPrice: "4.89 ETH", endTime: 500000000, views: "200" },
    ]);
    const avatarFake =
        "https://th.bing.com/th/id/R.41a38b3ba31d2b29087c0f4301d64727?rik=qXj%2fEqlMUZ1bTw&pid=ImgRaw&r=0";
    // const imageFake = "http://localhost:3000/static/media/card-item-3.f77cccaaa52fbee68190.jpg";
    useEffect(() => {
        fetchNft();
    }, []);

    const fetchNft = async () => {
        // const { data } = await getNft(id);
        // setNft(data.nft);
        // setSales(data.sales);
    };
    //   console.log(nft);
    //   console.log(sales);

    return (
        <div className="item-details">
            {/* <Header /> */}
            <HeaderMining/>
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">{nft?.name}</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Explore</Link>
                                    </li>
                                    <li>{nft?.name}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="tf-section tf-item-details">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-xl-6 col-md-12">
                            <div className="content-left">
                                <div className="media">
                                    <img src={nft?.image || imgdetail1} alt="Axies" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="content-right">
                                <div className="sc-item-details">
                                    <h2 className="style2">“{nft?.name} ” </h2>
                                    <div className="meta-item">
                                        <div className="left">
                                            {sales?.map((item, index) => (
                                                <span key={index} className="viewed eye">
                                                    {item?.views}
                                                </span>
                                            ))}
                                            <span
                                                to="/login"
                                                className="liked heart wishlist-button mg-l-8"
                                            >
                                                <span className="number-like">
                                                    {nft?.followers}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="right">
                                            <Link to="#" className="share"></Link>
                                            <Link to="#" className="option"></Link>
                                        </div>
                                    </div>
                                    <div className="client-infor sc-card-product">
                                        <div className="meta-info custom_meta">
                                            <div className="author">
                                                <div className="avatar">
                                                    <img
                                                        src={nft?.creator?.avatar || avatarFake}
                                                        alt="Axies"
                                                    />
                                                </div>
                                                <div className="info">
                                                    <span>Owned By</span>
                                                    <h6>
                                                        {" "}
                                                        <Link to="/author">
                                                            {nft?.creator?.title}
                                                        </Link>{" "}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="meta-info custom_meta">
                                            <div className="author">
                                                <div className="avatar">
                                                    <img
                                                        src={nft?.creator?.avatar || avatarFake}
                                                        alt="Axies"
                                                    />
                                                </div>
                                                <div className="info">
                                                    <span>Create By</span>
                                                    <h6>
                                                        {" "}
                                                        <Link to="/author">
                                                            {nft?.creator?.title}
                                                        </Link>{" "}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>{nft?.description}</p>
                                    {sales?.map((item, index) => {
                                        return (
                                            <div key={index} className="meta-item-details style2">
                                                <div className="item meta-price">
                                                    <span className="heading">Current Bid</span>
                                                    <div className="price">
                                                        <div className="price-box">
                                                            <h5>{item?.unitPrice} ETH</h5>
                                                            {/* TODO */}
                                                            <span>= $12.246</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="item count-down">
                                                    <span className="heading style-2">
                                                        Countdown
                                                    </span>
                                                    <Countdown date={Date.now() + item?.endTime}>
                                                        <span className="sub_cow">
                                                            You are good to go!
                                                        </span>
                                                    </Countdown>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <Link
                                        to="/wallet-connect"
                                        className="sc-button loadmore style bag fl-button pri-3"
                                    >
                                        <span>Place a bid</span>
                                    </Link>
                                    <div className="flat-tabs themesflat-tabs">
                                        <Tabs>
                                            <TabList>
                                                <Tab>Bid History</Tab>
                                                <Tab>Info</Tab>
                                                <Tab>Provenance</Tab>
                                            </TabList>

                                            <TabPanel>
                                                <ul className="bid-history-list">
                                                    {dataHistory.map((item, index) => (
                                                        <li key={index} item={item}>
                                                            <div className="content">
                                                                <div className="client">
                                                                    <div className="sc-author-box style-2">
                                                                        <div className="author-avatar">
                                                                            <Link to="#">
                                                                                <img
                                                                                    src={item.img}
                                                                                    alt="Axies"
                                                                                    className="avatar"
                                                                                />
                                                                            </Link>
                                                                            <div className="badge"></div>
                                                                        </div>
                                                                        <div className="author-infor">
                                                                            <div className="name">
                                                                                <h6>
                                                                                    <Link to="/author">
                                                                                        {item.name}{" "}
                                                                                    </Link>
                                                                                </h6>{" "}
                                                                                <span>
                                                                                    {" "}
                                                                                    place a bid
                                                                                </span>
                                                                            </div>
                                                                            <span className="time">
                                                                                {item.time}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="price">
                                                                    <h5>{item.price}</h5>
                                                                    <span>
                                                                        = {item.priceChange}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </TabPanel>
                                            <TabPanel>
                                                <ul className="bid-history-list">
                                                    <li>
                                                        <div className="content">
                                                            <div className="client">
                                                                <div className="sc-author-box style-2">
                                                                    <div className="author-avatar">
                                                                        <Link to="#">
                                                                            <img
                                                                                src={img1}
                                                                                alt="Axies"
                                                                                className="avatar"
                                                                            />
                                                                        </Link>
                                                                        <div className="badge"></div>
                                                                    </div>
                                                                    <div className="author-infor">
                                                                        <div className="name">
                                                                            <h6>
                                                                                {" "}
                                                                                <Link to="/author">
                                                                                    Mason Woodward{" "}
                                                                                </Link>
                                                                            </h6>{" "}
                                                                            <span>
                                                                                {" "}
                                                                                place a bid
                                                                            </span>
                                                                        </div>
                                                                        <span className="time">
                                                                            8 hours ago
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </TabPanel>
                                            <TabPanel>
                                                <div className="provenance">
                                                    <p>
                                                        Lorem Ipsum is simply dummy text of the
                                                        printing and typesetting industry. Lorem
                                                        Ipsum has been the industry's standard dummy
                                                        text ever since the 1500s, when an unknown
                                                        printer took a galley of type and scrambled
                                                        it to make a type specimen book. It has
                                                        survived not only five centuries, but also
                                                        the leap into electronic typesetting,
                                                        remaining essentially unchanged. It was
                                                        popularised in the 1960s with the release of
                                                        Letraset sheets containing Lorem Ipsum
                                                        passages, and more recently with desktop
                                                        publishing software like Aldus PageMaker
                                                        including versions of Lorem Ipsum.
                                                    </p>
                                                </div>
                                            </TabPanel>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LiveAuction data={liveAuctionDatas} />
            <Footer />
        </div>
    );
};

export default ItemDetails01;
