import React, { useEffect, useState } from "react";
import { collectionAPI, getAllWithoutQuery } from "../apis/collection";
import { getAllNftWithoutQuery } from "../apis/nft";
import Footer from "../components/footer/Footer";
import HeaderMining from "../components/headerMining/HeaderMining";
import Create from "../components/layouts/Create";
import TodayPicks from "../components/layouts/home-2/TodayPicks";
import PopularCollection from "../components/layouts/home-3/PopularCollection";
import LiveAuction from "../components/layouts/home-4/LiveAuction";
import TopSeller from "../components/layouts/home-6/TopSeller";
import SliderStyle1 from "../components/slider/SliderStyle1";
import heroSliderData from "../assets//fake-data/data-slider";
import StaticSlider from "../components/slider/StaticSlider";

function HomeMining() {
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
        return (
          nft?.level === 6 && nft.mint === false && nft?.endTime < Date.now()
        );
      });

      const dataTodayPick = data.filter((nft) => {
        return nft.mint === false && nft?.verify === true;
      });

      // setDataCollection(
      //   dataCollection.data.filter((collection) => {
      //     return collection?.nfts.length > 1;
      //   })
      // );
      setDataAuction(dataAuction.reverse());
      setDataTodayPick(dataTodayPick.reverse());
    })();
  }, [reLoad]);

  //fetch collection => db category
  useEffect(() => {
    fetchCollections();
  }, [reLoad]);

  async function fetchCollections() {
    const { data } = await collectionAPI.mockNft();
    setCollections(data);
  }

  // console.log({ collections });
  return (
    <div>
      <HeaderMining />
      {/* <StaticSlider /> */}
      <SliderStyle1 data={heroSliderData} />
      <LiveAuction data={dataAuction} noSlider={true} setReload={setReload} />
      <TopSeller />
      <TodayPicks data={dataTodayPick} setReload={setReload} />
      <PopularCollection
        // data={dataCollection}
        setCollections={setCollections}
        collections={collections}
        setReload={setReload}
      />
      <Create />
      <Footer />
    </div>
  );
}

export default HomeMining;
