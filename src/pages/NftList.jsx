import React from "react";
import Footer from "../components/footer/Footer";
import HeaderMining from "../components/headerMining/HeaderMining";
import Explore from "../components/layouts/nft-list/Explore";

function NftList() {
    return (
        <div>
            <HeaderMining />
            <Explore />
            <Footer />
        </div>
    );
}

export default NftList;
