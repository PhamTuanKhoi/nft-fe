import React, { useEffect, useState } from "react";
import HeaderMining from "../components/headerMining/HeaderMining";
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
import {
  likeProject,
  loadDetailItem,
  projectMined,
  viewers,
} from "../apis/projectService";
import { getHistory } from "../apis/history";
import moment from "moment";
import { useWeb3 } from "../contexts/Web3Provider/provider";
import { toast } from "react-toastify";
import { useLoading } from "../hooks/useLoading";
import FormDialog from "../components/dialog/dialog";

const DetailStatusMining = () => {
  const avatarFake =
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
  // const [history, setHistory] = useState([]);
  // const [nft, setNft] = useState([]);
  const [project, setProject] = useState([]);
  const { setLoading } = useLoading();
  const [reload, setReload] = useState(0);
  const [view, setView] = useState(0);
  const { id } = useParams();
  const { user } = useWeb3();
  const [open, setOpen] = useState(false);
  const [power, setPower] = useState(0);

  const [dataHistory] = useState([
    {
      img: img2,
      name: "Facebook",
    },
    {
      img: img3,
      name: "Website",
    },
    {
      img: img4,
      name: "Tiwtter",
    },
  ]);
  // async function loadHistory() {
  //   const { data } = await getHistory(id);
  //   setHistory(data.items);
  // }

  // useEffect(() => {
  //   loadHistory();
  // }, []);

  useEffect(() => {
    fetchProjectMined();
  }, [id, reload, view]);

  async function fetchProjectMined() {
    try {
      const { data } = await projectMined(id);
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) {
      viewer();
    }
  }, [id]);

  async function viewer() {
    try {
      await viewers(id);
      setView((e) => e + 1);
    } catch (error) {
      console.log(error);
    }
  }

  async function likeProjects() {
    try {
      if (!user) {
        toast.warn(`Please login in system !`);
        return;
      }
      setLoading(true);

      await likeProject(user?._id, project[0]?._id);

      setLoading(false);

      setReload((e) => e + 1);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function onDialog() {
    try {
      if (!user) {
        toast.warn(`Please login in system !`);
        return;
      }

      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="item-details">
      <HeaderMining />
      <div className="tf-section tf-item-details tf-detailmining">
        <div className="themesflat-container detailmining">
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="content-left">
                <div className="media">
                  <img src={project[0]?.image || "/test.jpg"} alt="Axies" />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="content-right">
                <div className="sc-item-details">
                  <h2 className="style2">{project[0]?.name}</h2>
                  <div className="meta-item">
                    <div className="left">
                      <span className="viewed eye">{project[0]?.viewer}</span>

                      <span
                        onClick={() => {
                          likeProjects();
                        }}
                        className="content_like"
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="4 4 20 20"
                          fill={
                            project[0]?.likes?.includes(user?._id)
                              ? "#DD3636"
                              : ""
                          }
                          //   xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.3908 8.33984C19.2269 8.33984 20.759 9.87652 20.7784 11.7877C20.7966 13.596 20.1437 15.2793 18.7267 16.9547L18.7264 16.9551C17.56 18.3368 16.0402 19.3353 14.6601 20.2419C14.4482 20.3811 14.2395 20.5181 14.036 20.654L13.9987 20.6789L13.9614 20.654C13.7577 20.518 13.5488 20.3808 13.3367 20.2414C11.9568 19.3349 10.4372 18.3367 9.27095 16.956L9.2709 16.9559C7.85527 15.2805 7.20223 13.596 7.21907 11.7885C7.23856 9.87632 8.77072 8.33984 10.6067 8.33984C12.0789 8.33984 13.0712 9.19431 13.6144 9.84703L13.9987 10.3088L14.383 9.84703C14.9263 9.19431 15.9186 8.33984 17.3908 8.33984Z"
                            fill={
                              project[0]?.likes?.includes(user?._id)
                                ? "red"
                                : "white"
                            }
                          />
                        </svg>
                        <span
                          className="number-like"
                          style={{ marginLeft: "5px", marginBottom: "-15px" }}
                        >
                          {project[0]?.likes?.length || 0}
                        </span>
                      </span>
                      <div style={{ display: "none" }}>
                        <FormDialog
                          id={project[0]?._id}
                          status={project[0]?.status}
                          open={open}
                          setOpen={setOpen}
                          setPower={setPower}
                        />
                      </div>
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
                            src={project[0]?.creator?.avatar || "/test.jpg"}
                            alt="Axies"
                          />
                        </div>
                        <div className="info">
                          <span>Status</span>
                          <h6>Mining</h6>
                        </div>
                      </div>
                    </div>
                    <div className="meta-info custom_meta">
                      <div className="author">
                        <div className="avatar">
                          <img
                            src={
                              project[0]?.problemCategory?.image || "/test.jpg"
                            }
                            alt="Axies"
                          />
                        </div>
                        <div className="info">
                          <span>Problem Category</span>
                          <h6>{project[0]?.problemCategory?.name}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>{project[0]?.description}</p>
                  <div className="meta-item-details style2">
                    <div className="item meta-price">
                      <span className="heading">Current Mining Cost</span>
                      <div className="price">
                        <div className="price-box">
                          <h5>{project[0]?.mintCost || "0"} ETH</h5>
                        </div>
                      </div>
                    </div>
                    <div className="item count-down">
                      <span className="heading style-2 rigth">Countdown</span>
                      {project[0]?.endTime && (
                        <Countdown date={project[0]?.endTime}>
                          <span
                            style={{
                              fontSize: 8,
                              width: "100%",
                            }}
                          >
                            <span className="project-year">Let go!</span>
                          </span>
                        </Countdown>
                      )}
                    </div>
                  </div>
                  <div
                    className="sc-button loadmore style bag fl-button pri-3 primary"
                    onClick={onDialog}
                  >
                    <span>Mine</span>
                  </div>
                  <div className="flat-tabs themesflat-tabs">
                    <Tabs>
                      <TabList>
                        <Tab>Mine History</Tab>
                        <Tab>Social Links</Tab>
                      </TabList>

                      <TabPanel>
                        <ul className="bid-history-list">
                          {project[0]?.users?.map((item, index) => (
                            <li key={index} item={item}>
                              <div className="content-again">
                                <div className="client">
                                  <div className="sc-author-box style-2">
                                    <div className="author-avatar">
                                      <Link to="#">
                                        <img
                                          src={item?.avatar || avatarFake}
                                          alt="Axies"
                                          className="avatar"
                                        />
                                      </Link>
                                      <div className="badge"></div>
                                    </div>
                                    <div className="author-infor">
                                      <div className="nameMine">
                                        <h6>
                                          <Link to="/author">
                                            {item?.displayName || "unnamed"}{" "}
                                          </Link>
                                        </h6>{" "}
                                        <span>Mining</span>
                                      </div>
                                      <span className="time">
                                        at&nbsp;&nbsp;
                                        {project[0]?.projecthistories?.map(
                                          (val) => {
                                            if (item?._id === val.userLove) {
                                              return moment(val?.date).format(
                                                "DD MM YYYY HH:mm A"
                                              );

                                              // moment(val?.datelike).toDate();
                                            }
                                          }
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="price">
                                  <h5>{item?.power} MP</h5>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </TabPanel>
                      <TabPanel>
                        <ul className="bid-history-list">
                          {dataHistory.map((item, index) => (
                            <li key={index}>
                              <div className="content-again">
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
                                    <div className="name">
                                      <span> {item.name}</span>
                                    </div>
                                    <Link to="#" className="nameApp"></Link>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="whyCart">
          <h1>Why?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
          <p>
            Eos cumque recusandae recusandae harum dolorem optio. Non asperiores
            ex qui mollitia et consectetur autem laborum ex. Enim ea deleniti
            sed omnis. Repudiandae nobis vitae in. Iusto ducimus sed non facilis
            occaecati quibusdam. Tenetur iure quo nihil minima aut qui. Harum
            voluptatem ullam deserunt voluptatem cumque rerum enim fugit nulla.
            Assumenda dolore ex inventore ut.
          </p>
          <p>
            Consequatur et dignissimos a pariatur et accusantium aliquid. Dolor
            fugiat corrupti soluta praesentium expedita ducimus labore. Unde
            minima nulla fuga quos minus temporibus animi qui expedita. Sed
            quibusdam et. Rerum tempora sit qui ut fugiat.
          </p>
          <ul className="list">
            <li>
              <p>
                <img src="/vector.png" alt="" /> Unde rerum a. Et voluptatem
                harum id.
              </p>
            </li>
            <li>
              <p>
                <img src="/vector.png" alt="" />
                <span>Voluptatem vel recusandae.</span>
              </p>
            </li>
            <li>
              <p>
                <img src="/vector.png" alt="" /> Et aut dicta quibusdam iste
                necessitatibus ut ut.
              </p>
            </li>
            <li>
              <p>
                <img src="/vector.png" alt="" /> Aliquid veritatis rem voluptate
                non.
              </p>
            </li>
            <li>
              <p>
                <img src="/vector.png" alt="" /> Voluptas quos quia nisi sit
                impedit labore enim quod.
              </p>
            </li>
            <li>
              <p>
                <img src="/vector.png" alt="" /> Itaque et officiis cum
                excepturi.
              </p>
            </li>
          </ul>
          <div className="cartWhy"></div>
          <p className="contentbottom">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborumm tempor
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailStatusMining;
