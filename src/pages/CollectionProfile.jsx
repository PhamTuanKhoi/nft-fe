import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Footer from "../components/footer/Footer";
import CardModal from "../components/layouts/CardModal";
import { getUserLike, getUserBadges, getCoreTeam } from "../apis/user";
import HeaderMining from "../components/headerMining/HeaderMining";
import { useWeb3 } from "../contexts/Web3Provider/provider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import { nftAPI } from "../apis/nft";
import { useLoading } from "../hooks/useLoading";
import logo from "../assets/images/logo/hoaki.jpg";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";

// fake data
import FakeData from "./profilecard.json";
import { likeProject, projectsUserLike } from "../apis/projectService";

let logoFake = logo;
const DomData = FakeData;
const CollectionProfile = () => {
  const imageFake =
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
  const { user } = useWeb3();
  const { setLoading } = useLoading();
  const menuTab = [
    {
      id: 1,
      class: "active",
      name: "Mined Projects",
    },
    {
      id: 2,
      class: "",
      name: "Core Team",
    },
    {
      id: 3,
      class: "",
      name: "Badges",
    },
  ];

  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const [modalShow, setModalShow] = useState(false);
  const [project, setProject] = useState([]);
  const [badges, setBadges] = useState([]);
  const [coreteam, setCoreteam] = useState([]);
  const [reload, setReload] = useState(1);
  const [reloadPro, setReloadPro] = useState(1);
  const [valueProject, setValueProject] = useState([]);
  const navigate = useNavigate();
  // const [valueProject, setValueProject] = useState();

  useEffect(() => {
    if (!user && user !== {}) {
      navigate("/mining");
      toast.warn(`Please login in system !`);
    }
  }, [user]);

  async function loadUserlikeItem() {
    const { data } = await getUserLike(user?._id);
    setProject(data[0].projects);
    // setMine(data[0].Mined);
  }

  async function loadUserLikeProject() {
    try {
      const { data } = await projectsUserLike(user._id);
      setValueProject(data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log({ valueProject });
  async function loadUserBadges() {
    if (user?._id) {
      const { data } = await getUserBadges(user?._id);
      setBadges(data);
    }
  }

  async function loadCoreTeam() {
    const { data } = await getCoreTeam(user?._id);
    setCoreteam(data);
  }

  useEffect(() => {
    if (user?._id) {
      loadUserBadges();
    }
  }, [user]);

  useEffect(() => {
    if (user?._id) {
      loadCoreTeam();
    }
  }, [user, reload]);

  useEffect(() => {
    if (user?._id) {
      // loadUserlikeItem();
      loadUserLikeProject();
    }
  }, [user, reloadPro]);

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

  // console.log("dom data", DomData)
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

  // useEffect(() => {
  //   let arr = [];
  //   let detail = [0];
  //   nft?.users.map((val) => {
  //     // power user
  //     if (val?.power !== undefined) {
  //       arr.push(val?.power);
  //     }
  //     // push value
  //     if (val?.nfts.length > 0 && val?.nfts !== undefined) {
  //       val?.nfts.map((item) => {
  //         if (item?.price !== undefined) {
  //           detail.push(item?.price);
  //         }
  //       });
  //     }
  //   });
  //   // mined value  total
  //   if (detail.length > 0) {
  //     let sumValue = detail?.reduce((a, b) => {
  //       return a + b;
  //     });
  //     setValueProject(sumValue);
  //   }
  //   setPower(nft?.power);
  // }, []);
  return (
    <div className="authors-2 collection_profile">
      <HeaderMining />
      <section className="tf-section authors">
        <div className="themesflat-container mining">
          <div className="flat-tabs tab-authors tab-authorMining">
            <div className="author-profile flex heigth-350px">
              <div className="backgroud-pofile">
                <img src={user?.cover} alt="" />
              </div>
              <div className="infor-profile">
                <h2 className="title">{user?.displayName || "unnamed"}</h2>
                <div className="power">
                  <img src="/coin.png" alt="" />
                  Power: {user?.power} MP
                </div>
                {/* <div className="value">
                  <img src="/coin.png" alt="" />
                  Value: {user?.power} Million USD
                </div> */}
                <p className="content overflow">{user?.bio}</p>
                <form>
                  <input
                    type="text"
                    className="inputcopy"
                    defaultValue={user?.address}
                    readOnly
                  />
                  <button type="button" className="btn-copycode">
                    <i className="icon-fl-file-1"></i>
                  </button>
                </form>
              </div>
              <div className="feature-profile">
                {/* <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="avatar"
                /> */}
              </div>
              <div className="widget-social style-3">
                <ul>
                  <li>
                    <a href={user?.twitter} target={"_blank"}>
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="style-2">
                    <a href={user?.facebook} target={"_blank"}>
                      <i class="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={user?.discord} target={"_blank"}>
                      <i class="fab fa-discord"></i>
                    </a>
                  </li>
                  {/* <li>
                    <a href={"#"} target={"_blank"}>
                      <svg
                        width="18"
                        height="20"
                        viewBox="0 0 18 20"
                        fill="none"
                      >
                        <path
                          d="M18 0.5V12.3756L13.304 17.1249H9.391L6.954 19.5H3.913V17.1249H0V3.66616L1.227 0.5H18ZM16.435 2.08308H3.13V13.9587H6.26V16.3328L8.609 13.9577H13.304L16.434 10.7915V2.08308H16.435ZM13.305 5.24924V9.99949H11.739V5.25025H13.304L13.305 5.24924ZM9.391 5.24924V9.99949H7.826V5.25025H9.391V5.24924Z"
                          fill="#14141F"
                        />
                      </svg>
                    </a>
                  </li> */}
                </ul>
                <div className="btn-profile">
                  <Link to="/login" className="sc-button style-1 follow">
                    Follow
                  </Link>
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
                        {valueProject?.map((itemproject, index) => {
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
                                        src={itemproject?.image || logoFake}
                                        alt="Axies"
                                      />
                                    </Link>
                                    {/* <div className="button-place-bid ">
                                      <button
                                        onClick={() => setModalShow(true)}
                                        className="sc-button style-place-bid style bag fl-button pri-3"
                                      >
                                        <span>Place Bid</span>
                                      </button>
                                    </div> */}
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
                                      <Link to="#">
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
                                      <div className="avatar">
                                        <img
                                          src={itemproject?.image || logoFake}
                                          alt="Axies"
                                        />
                                      </div>
                                      <div className="info">
                                        <span>Organization</span>
                                        <h6>
                                          <Link to="#">
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
                      <TabPanel>
                        {coreteam.map((itemCore, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className="col-xl-3 col-lg-4 col-md-6 col-12"
                              >
                                <div className="sc-card-product sc-card-product-mining explode">
                                  <div className="card-media">
                                    <Link
                                      to={`/mining/nft-profile/${itemCore?.nfts?._id}`}
                                    >
                                      <img
                                        src={itemCore?.nfts?.media || logoFake}
                                        alt="Axies"
                                      />
                                    </Link>
                                    <div
                                      onClick={() =>
                                        onLoveNft(itemCore?.nfts?._id)
                                      }
                                      className="wishlist-button"
                                    >
                                      <FavoriteIcon
                                        sx={{
                                          color: `${
                                            itemCore?.nfts?.likes?.includes(
                                              user?._id
                                            )
                                              ? "#FF0000"
                                              : "#FFF"
                                          }`,
                                          fontSize: "24px",
                                        }}
                                      />

                                      <p className="number-like">
                                        {itemCore?.nfts?.likes?.length || 0}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="card-title mg-bt-16">
                                    <h5>
                                      <Link to="#">
                                        "{itemCore?.nfts?.name || "unnamed"}"
                                      </Link>
                                    </h5>
                                    <div className="tags">PN</div>
                                  </div>
                                  <div className="meta-info">
                                    <div className="author">
                                      <div className="avatar">
                                        <Link
                                          to={`/mining/collections/${itemCore?.nfts?.collections?._id}`}
                                        >
                                          <img
                                            src={
                                              itemCore?.nfts?.collections
                                                ?.image || logoFake
                                            }
                                            alt="Axies"
                                          />
                                        </Link>
                                      </div>
                                      <div className="info">
                                        <span>
                                          {itemCore?.nfts?.mining?.levelName}
                                        </span>
                                        <h6>
                                          <Link
                                            to={`/mining/collections/${itemCore?.nfts?.collections?._id}`}
                                          >
                                            {itemCore?.nfts?.collections?.name}
                                          </Link>
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="price">
                                      <span>Mined Value</span>
                                      <div className="price-details">
                                        <h5>
                                          {itemCore?.nfts?.mining?.price} USDC
                                        </h5>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="btn__bottom">
                                    {itemCore?.nfts?.mint !== true ? (
                                      <span className="btn__bottom__left">
                                        {" "}
                                        <ShoppingBagIcon fontSize="medium" />{" "}
                                        {itemCore?.nfts?.endTime <
                                          new Date().getTime() &&
                                          itemCore?.nfts?.mint === false && (
                                            <span>Mine</span>
                                          )}
                                        {itemCore?.nfts?.endTime >
                                          new Date().getTime() &&
                                          itemCore?.nfts?.mint === false && (
                                            <span>Mining</span>
                                          )}
                                        {itemCore?.nfts?.level === 6 &&
                                          itemCore?.nfts?.mint === true && (
                                            <span>Complete Mine</span>
                                          )}
                                      </span>
                                    ) : (
                                      <div></div>
                                    )}
                                    <Link
                                      to={`/mining/nft-profile/${itemCore?.nfts?._id}`}
                                    >
                                      <span className="btn__bottom__right">
                                        Mine History
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </TabPanel>
                      <TabPanel>
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
                                        alt="Axies"
                                      />
                                    </Link>
                                    {/* <div className="button-place-bid ">
                                      <button
                                        onClick={() => setModalShow(true)}
                                        className="sc-button style-place-bid style bag fl-button pri-3"
                                      >
                                        <span>Place Bid</span>
                                      </button>
                                    </div> */}
                                    {/* <Link
                                      to="#"
                                      className="wishlist-button heart"
                                    >
                                      <span className="number-like">
                                        {itembadges?.badges?.like || "100"}
                                      </span>
                                    </Link> */}
                                  </div>
                                  <div className="card-title mg-bt-16">
                                    <h5>
                                      <Link to="/item-details-01">
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
                                            logoFake
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
                                    {/* <div className="price">
                                      <span>Mined Value</span>
                                      <div className="price-details">
                                        <h5>222</h5>
                                      </div>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </TabPanel>
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

export default CollectionProfile;
