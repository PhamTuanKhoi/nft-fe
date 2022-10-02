import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import liveAuctionData from "../assets/fake-data/data-live-auction";
import LiveAuction from "../components/layouts/auctions/LiveAuction";
import HeaderMining from "../components/headerMining/HeaderMining";

const LiveAuctions = () => {
  return (
    <div className="auctions">
      {/* <Header /> */}
      <HeaderMining/>
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Ready to Mine</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Explore</Link>
                  </li>
                  <li>Auctions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LiveAuction data={liveAuctionData} />
      <Footer />
    </div>
  );
};

export default LiveAuctions;
