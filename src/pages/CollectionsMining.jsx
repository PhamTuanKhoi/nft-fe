import React, { useEffect } from "react";
import Header from "../components/header/Header";
import TopCard from "../components/layouts/collections/TopCard";
import ReadyToMine from "../components/layouts/collections/ReadyToMine";
import TodayPicks from "../components/layouts/collections/TodayPicks";
import Create from "../components/layouts/collections/Create";
import PopularCollection from "../components/layouts/collections/PopularCollection";
import HeaderMining from "../components/headerMining/HeaderMining";

function CollectionsMining() {
    return (
        <div className="home-1">
            <HeaderMining />
            <ReadyToMine />
            <TopCard />
            <TodayPicks />
            <PopularCollection />
            <Create />
        </div>
    );
}

export default CollectionsMining;
