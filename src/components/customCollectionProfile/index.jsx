import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// import Header from "../../components/header/Header";
import HeaderMining from "../headerMining/HeaderMining";
import Footer from "../../components/footer/Footer";
import CardModal from "../../components/layouts/CardModal";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useWeb3 } from "../../contexts/Web3Provider/provider";
import { collectionAPI, getCollectionById } from "../../apis/collection";
import { categoryAPI } from "../../apis/category";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { nftAPI } from "../../apis/nft";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLoading } from "../../hooks/useLoading";
import { BagWIcon } from "../../assets/icons";

const CustomCollectionProfile = () => {
  const avatarFake =
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
  const [menuActive, setMenuActive] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(8);
  // const [collection, setCollection] = useState("");
  const [menuTab, setMenuTab] = useState([
    {
      _id: "",
      name: "ALL",
    },
  ]);
  const { user } = useWeb3();
  const { setLoading } = useLoading();
  const [reLoad, setReload] = useState(1);
  let navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [collectionProfile, setCollectionProfile] = useState("");
  const { id } = useParams();

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  async function fetchProfile() {
    if (id) {
      const { data } = await collectionAPI.mockNftById(id);
      setCollectionProfile(data);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [id, reLoad]);

  async function onLoveNft(id) {
    try {
      if (!user?._id) {
        toast.warn(`Please login !`);
        return;
      }
      setLoading(true);
      await nftAPI.likes(id, user?._id);
      setReload((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (typeof error.response.data.message === "string") {
          toast.error(error.response.data.message);
        } else {
          error.response.data.message.forEach((item) => {
            toast.error(item);
          });
        }
      }
      console.log(error);
      setLoading(false);
    }
  }

  async function onLoveTribe(id) {
    try {
      if (!user?._id) {
        toast.warn(`Please login !`);
        return;
      }
      setLoading(true);
      const { data } = await collectionAPI.likes(id, user?._id);

      const newData = collectionProfile?.map((item) => {
        if (item.id === data._id) {
          return { ...item, likes: [...data.likes] };
        }
        return item;
      });
      setCollectionProfile(newData);

      setLoading(false);
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (typeof error.response.data.message === "string") {
          toast.error(error.response.data.message);
        } else {
          error.response.data.message.forEach((item) => {
            toast.error(item);
          });
        }
      }
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="authors-2">
      <HeaderMining />
      <section className="tf-section authors">
        <div className="themesflat-container">
          <div
            className="flat-tabs tab-authors top-0"
            style={{ marginTop: 100 }}
          >
            <div className="author-profile flex heigth-350px display">
              <div className="feature-profile image margin position">
                <img
                  src={
                    collectionProfile[0]?.imageSubcollection ||
                    "https://miro.medium.com/max/945/1*W35QUSvGpcLuxPo3SRTH4w.png"
                  }
                  alt="Axies"
                  className="avatar"
                />
              </div>
              <div className="infor-profile top-coll">
                <span>Core Tribe</span>
                <h2 className="title">
                  {collectionProfile[0]?.nameSubcollection}
                </h2>
                <p className="content overflow overflow-2">
                  {collectionProfile[0]?.descriptionSubcollection}
                </p>
                {/* <form>
                  <input
                    type="text"
                    className="inputcopy"
                    defaultValue={collectionProfile[0]?.id}
                    readOnly
                  />
                  <button type="button" className="btn-copycode">
                    <i className="icon-fl-file-1"></i>
                  </button>
                </form> */}
              </div>
              <div className="widget-social style-3 collection">
                <div className="usdc-collection">
                  <p className="text-top-collection">
                    {collectionProfile[0]?.totalPrice} USDC
                  </p>{" "}
                  <br />
                  <div
                    onClick={() => onLoveTribe(collectionProfile[0]?.id)}
                    className="wishlist-button heard-collection"
                  >
                    <FavoriteIcon
                      sx={{
                        color: `${
                          collectionProfile[0]?.likes?.includes(user?._id)
                            ? "#FF0000"
                            : "#FFF"
                        }`,
                        fontSize: "26px",
                      }}
                    />
                    <p className="text-top-collection">
                      {collectionProfile[0]?.likes?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Tabs>
              {/* <TabList>
                {menuTab.map((item, index) => (
                  <Tab
                    tabIndex={2}
                    key={index}
                    // onClick={() => {
                    //   onChangeTab(item, index);
                    //   setCollection(item?._id);
                    // }}
                  >
                    {""}
                  </Tab>
                ))}
              </TabList> */}

              <div className="content-tab">
                <div className="content-inner">
                  <div className="row">
                    {collectionProfile[0] &&
                      collectionProfile[0]?.nfts?.length > 0 &&
                      collectionProfile[0]?.nfts?.map((item, index) => (
                        <>
                          <div
                            key={index}
                            className="col-xl-3 col-lg-4 col-md-6 col-12"
                          >
                            <div className="sc-card-product explode">
                              <div className="card-media">
                                <Link to={`/mining/nft-profile/${item?._id}`}>
                                  <img
                                    src={
                                      item?.media ||
                                      "https://miro.medium.com/max/945/1*W35QUSvGpcLuxPo3SRTH4w.png"
                                    }
                                    alt={item?.name}
                                  />
                                </Link>

                                {item?.endTime > new Date().getTime() && (
                                  <div className="featured-countdown">
                                    <span className="slogan"></span>
                                    <Countdown date={item?.endTime}>
                                      <span
                                        style={{
                                          fontSize: 8,
                                        }}
                                      >
                                        You are good to go!
                                      </span>
                                    </Countdown>
                                  </div>
                                )}
                                {/* <div className="button-place-bid">
                                  <button
                                    // onClick={() => setModalShow(true)}
                                    data-toggle="modal"
                                    data-target="#popup_bid"
                                    className="sc-button style-place-bid style bag fl-button pri-3"
                                  >
                                    <span>Place Bid</span>
                                  </button>
                                </div> */}
                                <div
                                  onClick={() => onLoveNft(item?._id)}
                                  className="wishlist-button"
                                >
                                  <FavoriteIcon
                                    sx={{
                                      color: `${
                                        item?.likes?.includes(user?._id)
                                          ? "#FF0000"
                                          : "#FFF"
                                      }`,
                                      fontSize: "24px",
                                    }}
                                  />

                                  <p className="number-like">
                                    {item?.likes?.length || 0}
                                  </p>
                                </div>
                              </div>
                              <div className="card-title mg-bt-16">
                                <h5>
                                  <Link to="#">"{item?.name}"</Link>
                                </h5>
                                <div className="tags">PN</div>
                              </div>
                              <div className="meta-info">
                                <div className="author">
                                  <div className="avatar">
                                    <img
                                      src={
                                        collectionProfile[0]
                                          ?.imageSubcollection || avatarFake
                                      }
                                      alt={
                                        collectionProfile[0]?.nameSubcollection
                                      }
                                    />
                                  </div>
                                  <div className="info">
                                    <span>{item?.mining?.levelName}</span>
                                    <h6>
                                      <Link to="#">
                                        {
                                          collectionProfile[0]
                                            ?.nameSubcollection
                                        }
                                      </Link>
                                    </h6>
                                  </div>
                                </div>
                                <div className="price">
                                  <span>Mining Value</span>
                                  <h5>{item?.mining?.price} USDC</h5>
                                </div>
                              </div>
                              <div className="card-bottom style-explode">
                                {item?.mint !== true ? (
                                  <div className="button-place-bid btn-style">
                                    <button
                                      onClick={() =>
                                        navigate(
                                          `/mining/nft-profile/${item?._id}`
                                        )
                                      }
                                      className="sc-button style-place-bid style bag fl-button pri-3 custom_button w-100"
                                    >
                                      <div className="content_bton">
                                        <BagWIcon />
                                        {item?.endTime < new Date().getTime() &&
                                          item?.mint === false &&
                                          item?.level < 6 && <span>Mine</span>}
                                        {item?.endTime > new Date().getTime() &&
                                          item?.level < 6 && (
                                            <span>Mining</span>
                                          )}
                                        {item?.level === 6 &&
                                          item?.mint === false && (
                                            <span style={{ fontSize: "12px" }}>
                                              Complete Mine
                                            </span>
                                          )}
                                      </div>
                                    </button>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                                <Link
                                  to={`/mining/nft-profile/${item?._id}`}
                                  className="view-history reload"
                                >
                                  <span>Mine History</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          {visible < collectionProfile.nfts?.length && (
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
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
      <Footer />
    </div>
  );
};

export default CustomCollectionProfile;
