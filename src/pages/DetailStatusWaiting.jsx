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
} from "../apis/projectService";
import { useWeb3 } from "../contexts/Web3Provider/provider";
import { useLoading } from "../hooks/useLoading";
import { toast } from "react-toastify";

const DetailStatusWaiting = () => {
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
  const [nft, setNft] = useState([]);
  const [project, setProject] = useState([]);
  const { id } = useParams();
  const { user } = useWeb3();
  const { setLoading } = useLoading();
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetchProjectMined();
  }, [id, reload]);

  async function fetchProjectMined() {
    try {
      const { data } = await projectMined(id);
      setProject(data);
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
                  <h2 className="style2">{project[0]?.name} </h2>
                  <div className="meta-item">
                    <div className="left">
                      <span
                        onClick={() => likeProjects()}
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
                          <h6>Waiting for Mining</h6>
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
                      <span className="heading style-2">Coming Soon</span>
                    </div>
                  </div>

                  <div className="flat-tabs themesflat-tabs">
                    <Tabs>
                      <TabList>
                        <Tab>Social Links</Tab>
                      </TabList>

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
      </div>
      <Footer />
    </div>
  );
};

export default DetailStatusWaiting;
