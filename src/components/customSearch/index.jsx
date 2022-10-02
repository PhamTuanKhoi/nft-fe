import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collectionAPI } from "../../apis/collection";
import { nftAPI } from "../../apis/nft";
import ItemContent from "../../components/layouts/home-8/ItemContent";
import SideBar from "../../components/layouts/home-8/SideBar";
import Footer from "../footer/Footer";
import HeaderMining from "../headerMining/HeaderMining";

const CustomSearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("name");
  // console.log({ searchTerm });

  const [nft, setNft] = useState([]);
  // const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState({
    mine: false,
    mining: false,
    mined: false,
  });
  const [collection, setCollection] = useState();
  const [level, setLevel] = useState();
  const [reLoad, setReload] = useState(1);

  useEffect(() => {
    fetchnft();
  }, [searchTerm, status, collection, level, reLoad]);

  async function fetchnft() {
    try {
      const { data } = await nftAPI.getNfts({
        search: searchTerm,
        status: JSON.stringify(status),
        collection: JSON.stringify(collection),
        levels: JSON.stringify(level),
        imported: true,
      });
      setNft(data?.items);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="home-8 page_search">
        <HeaderMining />
        <section className="tf-item tf-section tf-section-panding">
          <div className="themesflat-container flex-card">
            {nft?.length > 0 ? (
              <div className="row px_card row-card">
                <div className="col-box-25 max-width-card">
                  <SideBar
                    status={status}
                    setStatus={setStatus}
                    collection={collection}
                    setCollection={setCollection}
                    level={level}
                    setLevel={setLevel}
                  />
                </div>

                <div className="col-box-75">
                  <ItemContent nft={nft} setReload={setReload} />
                </div>
              </div>
            ) : (
              <div className="row px_card row-card">
                <div className="col-box-25 max-width-card">
                  <SideBar
                    status={status}
                    setStatus={setStatus}
                    collection={collection}
                    setCollection={setCollection}
                    level={level}
                    setLevel={setLevel}
                  />
                </div>

                <div
                  className="col-box-75"
                  style={{ minHeight: "800px" }}
                ></div>
              </div>
            )}
            <div className="margin-footer">
              <Footer />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomSearchPage;
