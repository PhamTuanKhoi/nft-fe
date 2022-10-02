import React, { useEffect, useState } from "react";
import { getAllWithoutQuery } from "../../apis/collection";
import { getAllNftWithoutQuery } from "../../apis/nft";
import heroSliderData from "../../assets/fake-data/data-slider";
import Footer from "../footer/Footer";
// import Header from "../header/Header";
import Create from "../layouts/Create";
import TodayPicks from "../layouts/home-2/TodayPicks";
import PopularCollection from "../layouts/home-3/PopularCollection";
import LiveAuction from "../layouts/home-4/LiveAuction";
import TopSeller from "../layouts/home-6/TopSeller";
import SliderStyle1 from "../slider/SliderStyle1";
import HeaderMining from "../headerMining/HeaderMining";
import { categoryAPI } from "../../apis/category";

const CustomHomePage = () => {
  const [dataAuction, setDataAuction] = useState([]);
  const [dataTodayPick, setDataTodayPick] = useState([]);
  const [dataCollection, setDataCollection] = useState([]);
  const [reLoad, setReload] = useState(1);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getAllNftWithoutQuery();
      const dataCollection = await getAllWithoutQuery();
      const dataAuction = data.filter((nft) => {
        return nft?.mint === true;
      });
      setDataCollection(
        dataCollection.data.filter((collection) => {
          return collection?.nfts.length > 1;
        })
      );
      setDataAuction(dataAuction.reverse());
      setDataTodayPick(data);
    })();
  }, [reLoad]);

  //fetch collection => db category
  useEffect(() => {
    fetchCollections();
  }, []);
  async function fetchCollections() {
    const { data } = await categoryAPI.mockNft();
    setCollections(data);
  }

  return (
    <div>
      {/* <Header /> */}
      <HeaderMining />
      <SliderStyle1 data={heroSliderData} />
      <LiveAuction data={dataAuction} setReload={setReload} />
      <TopSeller />
      <TodayPicks data={dataTodayPick} setReload={setReload} />
      <PopularCollection data={dataCollection} collections={collections} />
      <Create />
      <Footer />
    </div>
  );
};

export default CustomHomePage;
