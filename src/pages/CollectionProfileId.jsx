import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Footer from "../components/footer/Footer";
import CardModal from "../components/layouts/CardModal";
import { getUserLike, getUserBadges, getCoreTeam, userAPI } from "../apis/user";
import HeaderMining from "../components/headerMining/HeaderMining";
import { useWeb3 } from "../contexts/Web3Provider/provider";
import logo from "../assets/images/logo/hoaki.jpg";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";

import FakeData from "./profilecard.json";
import { nftAPI } from "../apis/nft";
import { useLoading } from "../hooks/useLoading";
import { toast } from "react-toastify";
import { likeProject, projectsUserLike } from "../apis/projectService";

import {
  IconLinkChat,
  IconLinkGoogle,
  IconLinkTwitter,
  IconLinkFackbook,
  IconCopyLink,
  BagWIcon,
} from "../assets/icons/index";
import Countdown from "react-countdown";

let DomData = FakeData;
let logoFake = logo;
let imageFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
const CollectionProfileId = () => {
  const { user } = useWeb3();
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [reload, setReload] = useState(1);
  let navigate = useNavigate();

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const [modalShow, setModalShow] = useState(false);
  const [project, setProject] = useState([]);
  const [badges, setBadges] = useState([]);
  const [coreteam, setCoreteam] = useState([]);
  const { setLoading } = useLoading();
  const [reloadPro, setReloadPro] = useState(1);
  const [valueProject, setValueProject] = useState([]);
  const [squadPower, setSquadPoswer] = useState([]);
  const [squads, setSquads] = useState([]);

  useEffect(() => {
    if (!user && !id) {
      navigate("/mining");
      toast.warn(`Please login in system !`);
    }
  }, [user]);

  useEffect(() => {
    if (user && !id) {
      getUserById(user._id);
    } else {
      getUserById(id);
    }
  }, [id, user]);

  async function getUserById(id) {
    try {
      const { data } = await userAPI.getUserById(id);
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  }

  const menuTab = [
    {
      id: 2,
      class: "",
      name: "Squad",
    },
    {
      id: 1,
      class: "active",
      name: "Mined Projects",
    },
  ];

  // const [mine, setMine] = useState([]);

  async function loadUserlikeItem(id) {
    const { data } = await getUserLike(id);
    setProject(data[0].projects);
    // setMine(data[0].Mined);
  }

  async function loadUserBadges(id) {
    if (id) {
      const { data } = await getUserBadges(id);
      setBadges(data);
    }
  }

  // async function loadCoreTeam() {
  //   const { data } = await getCoreTeam(id);
  //   setCoreteam(data);
  // }

  async function getSquadNft(id) {
    try {
      const { data } = await userAPI.ownerNft(id);
      setSquads(data[0]?.nfts);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadUserLikeProject(id) {
    try {
      const { data } = await projectsUserLike(id);
      setValueProject(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user && !id) {
      loadUserBadges(user._id);
    } else {
      loadUserBadges(id);
    }
  }, [id, user]);

  useEffect(() => {
    if (user && !id) {
      // loadCoreTeam();
      getSquadNft(user._id);
    } else {
      getSquadNft(id);
    }
  }, [id, user, reload]);

  useEffect(() => {
    if (user && !id) {
      loadUserLikeProject(user._id);
      loadUserlikeItem(user._id);
    } else {
      loadUserLikeProject(id);
      loadUserlikeItem(id);
    }
  }, [id, user, reloadPro]);

  async function onLoveNft(id) {
    try {
      if (!profile?._id) {
        toast.warn(`Please login !`);
        return;
      }
      setLoading(true);
      await nftAPI.likes(id, profile?._id);
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

  async function onLoveProjects(idprojecct) {
    try {
      setLoading(true);
      await likeProject(user?._id, idprojecct);
      setReloadPro((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user && !id) {
      loadSquadPower(user._id);
    } else {
      loadSquadPower(id);
    }
  }, [id, user]);

  async function loadSquadPower(id) {
    try {
      const { data } = await userAPI.squadPower(id);
      setSquadPoswer(data[0]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="authors-2 collection_profile">
      <HeaderMining />
      <section className="tf-section authors">
        <div className="themesflat-container mining">
          <div className="flat-tabs tab-authors tab-authorMining">
            <div className="nft_collection_profile">
              <div className="nft_collection_profile_left_content">
                <p className="rank_name">{badges[0]?.badges?.name}</p>
                <p className="user_name">
                  {profile?.displayName || "corecave"}
                </p>
                <p className="user_decreption overflow">{profile?.bio}</p>
                <div className="bages_imgs">
                  {badges?.map((item) => (
                    <img
                      className="bages_imgs_items"
                      src={item?.badges?.image}
                      alt={item?.badges?.name}
                    />
                  ))}
                </div>
              </div>
              <img
                className="user_avatar"
                src={profile?.avatar}
                alt={profile?.displayName}
              />
              <div className="right_content">
                <div className="link_icon">
                  <a href={profile?.facebook} target={"_blank"}>
                    {profile?.facebook && <IconLinkFackbook />}
                  </a>
                  <a href={profile?.twitter} target={"_blank"}>
                    {profile?.twitter && <IconLinkTwitter />}
                  </a>
                  <a href={profile?.google} target={"_blank"}>
                    {profile?.google && <IconLinkGoogle />}
                  </a>
                  <a href={profile?.discord} target={"_blank"}>
                    {profile?.discord && <IconLinkChat />}
                  </a>
                </div>
                <div className="number_container">
                  <p className="number_title">
                    Core Power
                    {profile?.power ? (
                      <span>
                        {profile?.power.toFixed(2) < 0.01
                          ? 0.01
                          : profile?.power.toFixed(2)}{" "}
                        CP
                      </span>
                    ) : (
                      <span>0 CP</span>
                    )}
                  </p>
                  <p className="number_title">
                    {" "}
                    Squad’s Value Power<span>{squadPower?.total} VP</span>
                  </p>
                  <p className="number_title">
                    Mining Power
                    {profile?.power ? (
                      <span>
                        {profile?.power.toFixed(2) < 0.01
                          ? 0.01
                          : profile?.power.toFixed(2)}{" "}
                        MP
                      </span>
                    ) : (
                      <span>0 MP</span>
                    )}
                  </p>
                </div>
                <div
                  className="link_container_border"
                  onClick={() =>
                    navigator.clipboard.writeText(profile?.address)
                  }
                >
                  <span className="link_address">{profile?.address}</span>
                  <IconCopyLink />
                </div>
              </div>
            </div>
            <div>
              <Tabs>
                <div className="listMenu1">
                  <TabList>
                    {menuTab.map((item, index) => (
                      <Tab key={index}>{item.name}</Tab>
                    ))}
                  </TabList>
                </div>
                <div className="content-tab">
                  <div className="content-inner">
                    <div className="row">
                      <TabPanel>
                        {squads.map((itemCore, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className="col-xl-3 col-lg-4 col-md-6 col-12"
                              >
                                <div className="sc-card-product sc-card-product-mining explode">
                                  <div className="card-media">
                                    <Link
                                      to={`/mining/nft-profile/${itemCore?._id}`}
                                    >
                                      <img
                                        src={itemCore?.media || imageFake}
                                        alt="Axies"
                                      />
                                    </Link>
                                    {itemCore?.endTime >
                                      new Date().getTime() && (
                                      <div className="featured-countdown">
                                        <span className="slogan"></span>
                                        <Countdown date={itemCore?.endTime}>
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
                                    <div
                                      onClick={() => onLoveNft(itemCore?._id)}
                                      className="wishlist-button"
                                    >
                                      <FavoriteIcon
                                        sx={{
                                          color: `${
                                            itemCore?.likes?.includes(
                                              profile?._id
                                            )
                                              ? "#FF0000"
                                              : "#FFF"
                                          }`,
                                          fontSize: "24px",
                                        }}
                                      />

                                      <p className="number-like">
                                        {itemCore?.likes?.length || 0}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="card-title mg-bt-16">
                                    <h5>
                                      <Link
                                        to={`/mining/nft-profile/${itemCore?._id}`}
                                      >
                                        {itemCore?.name || "unnamed"}
                                      </Link>
                                    </h5>
                                    <div className="tags">PN</div>
                                  </div>
                                  <div className="meta-info">
                                    <div className="author">
                                      <div className="avatar">
                                        <Link
                                          to={`/mining/collections/${itemCore?.collection._id}`}
                                        >
                                          <img
                                            src={
                                              itemCore?.collection?.image ||
                                              imageFake
                                            }
                                            alt="Axies"
                                          />
                                        </Link>
                                      </div>
                                      <div className="info">
                                        <span>
                                          {itemCore?.mining?.levelName}
                                        </span>
                                        <h6>
                                          <Link
                                            to={`/mining/collections/${itemCore?.collection._id}`}
                                          >
                                            {itemCore?.collection.name}
                                          </Link>
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="price">
                                      <span>Mined Value</span>
                                      <div className="price-details">
                                        <h5>{itemCore?.mining?.price} USDC</h5>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card-bottom style-explode">
                                    {itemCore?.mint !== true ? (
                                      <div className="button-place-bid btn-style ready-mines">
                                        <button
                                          onClick={() =>
                                            navigate(
                                              `/mining/nft-profile/${itemCore?._id}`
                                            )
                                          }
                                          className={
                                            itemCore?.endTime >
                                              new Date().getTime() &&
                                            itemCore?.level < 6
                                              ? "custom_button w-100"
                                              : "custom_button w-100 primary"
                                          }
                                        >
                                          <BagWIcon />
                                          {itemCore?.endTime <
                                            new Date().getTime() &&
                                            itemCore?.mint === false &&
                                            itemCore?.level < 6 && (
                                              <span>Mine</span>
                                            )}
                                          {itemCore?.endTime >
                                            new Date().getTime() &&
                                            itemCore?.level < 6 && (
                                              <span>Mining</span>
                                            )}
                                          {itemCore?.level === 6 &&
                                            itemCore?.mint === false && (
                                              <span>Complete Mine</span>
                                            )}
                                        </button>
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                    <Link
                                      to={`/mining/nft-profile/${itemCore?._id}`}
                                      className="view-history reload"
                                    >
                                      <span>Mine History</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </TabPanel>
                      <TabPanel>
                        {valueProject?.map((itemproject, index) => {
                          return (
                            <>
                              {itemproject.status === 1 && (
                                <div
                                  key={index}
                                  className="col-xl-3 col-lg-4 col-md-6 col-12 flex"
                                >
                                  <div className="sc-card-product sc-card-product-mining explode width-card">
                                    <div className="card-media heigth">
                                      <Link to="/item-details/:id">
                                        <img
                                          src={itemproject?.image || logoFake}
                                          alt="Axies"
                                        />
                                      </Link>
                                      <div
                                        onClick={() =>
                                          onLoveProjects(itemproject?._id)
                                        }
                                        className="wishlist-button"
                                      >
                                        <FavoriteIcon
                                          sx={{
                                            color: `${
                                              itemproject?.likes?.includes(
                                                user?._id
                                              )
                                                ? "#FF0000"
                                                : "#FFF"
                                            }`,
                                            fontSize: "24px",
                                          }}
                                        />

                                        <p className="number-like">
                                          {itemproject?.likes?.length || 0}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="card-title mg-bt-16">
                                      <h5>
                                        <Link className="overflow" to="#">
                                          "{itemproject?.name || "unnamed"}"
                                        </Link>
                                      </h5>
                                    </div>
                                    <hr
                                      color="black"
                                      style={{
                                        border: "dashed 0.5px #14141F",
                                      }}
                                    />
                                    <div className="meta-info">
                                      <div className="author">
                                        <div className="avatar row">
                                          <img
                                            src={
                                              itemproject?.image || imageFake
                                            }
                                            alt="Axies"
                                          />
                                        </div>
                                        <div className="info">
                                          <span>Organization</span>
                                          <h6>
                                            <Link to="/author">
                                              {itemproject?.address}
                                            </Link>
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="price text-left">
                                        <span>Mined Value</span>
                                        <div className="price-details">
                                          <h5>
                                            ${itemproject?.total?.toFixed(4)}
                                          </h5>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })}
                        {/* {
                              visible < item.dataContent?.length && (
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
                              )
                            } */}
                      </TabPanel>

                      {/* <TabPanel>
                        {badges.map((itembadges, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className="col-xl-3 col-lg-4 col-md-6 col-12 flex"
                              >
                                <div className="sc-card-product sc-card-product-mining explode width-card">
                                  <div className="card-media heigth">
                                    <Link to="#">
                                      <img
                                        src={
                                          itembadges?.badges?.image || logoFake
                                        }
                                        alt={itembadges?.badges?._id}
                                      />
                                    </Link>
                                  </div>
                                  <div className="card-title mg-bt-16">
                                    <h5>
                                      <Link to="#">
                                        "{itembadges?.badges?.name || "unnamed"}
                                        "
                                      </Link>
                                    </h5>
                                  </div>
                                  <div className="meta-info">
                                    <div className="author">
                                      <div className="avatar">
                                        <img
                                          src={
                                            itembadges?.badges?.image ||
                                            imageFake
                                          }
                                          alt="Axies"
                                        />
                                      </div>
                                      <div className="info">
                                        <span>Organization</span>
                                        <h6>
                                          <Link to="#">
                                            {itembadges?.badges?.description}
                                          </Link>
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </TabPanel> */}
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
      <Footer />
    </div>
  );
};

export default CollectionProfileId;
