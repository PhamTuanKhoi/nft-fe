import React, { useState, Fragment, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Countdown from "react-countdown";
import CardModal from "../CardModal";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { nftAPI } from "../../../apis/nft";
import { useWeb3 } from "../../../contexts/Web3Provider/provider";
import { useLoading } from "../../../hooks/useLoading";
import { BagWIcon } from "../../../assets/icons";

const avatarFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";

const ItemContent = ({ nft, setReload }) => {
  const [visible, setVisible] = useState(9);
  const [checkOpen, setCheckOpen] = useState(true);
  let navigate = useNavigate();
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 5);
  };

  const listBtn = useRef(null);
  const gridBtn = useRef(null);
  const listContent = useRef(null);
  const gridContent = useRef(null);

  const listToggle = () => {
    // setCheckOpen(!checkOpen);
    listBtn.current.classList.add("active");
    gridBtn.current.classList.remove("active");
    listContent.current.classList.add("open");
    gridContent.current.classList.remove("open");
  };
  const gridToggle = () => {
    gridBtn.current.classList.add("active");
    listBtn.current.classList.remove("active");
    gridContent.current.classList.add("open");
    listContent.current.classList.remove("open");
  };

  const [modalShow, setModalShow] = useState(false);
  const { user } = useWeb3();
  const { setLoading } = useLoading();

  async function onLoveNft(id) {
    try {
      if (!user?._id) {
        toast.warn(`Please login !`);
        return;
      }
      setLoading(true);
      const { data } = await nftAPI.likes(id, user?._id);
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

  return (
    <Fragment>
      <div className="flat-tabs items">
        <Tabs>
          {/* <TabList>
            {dataTab.map((data) => (
              <Tab key={data.id}>{data.title}</Tab>
            ))}
          </TabList> */}
          {nft.map((item) => (
            <TabPanel key={item._id}>
              <div className="option">
                <h2 className="title nft">{nft.length} Items</h2>
                <div className="view">
                  <ul>
                    {/* <li
                      onClick={() => {
                        setCheckOpen(!checkOpen);
                        listToggle();
                      }}
                      ref={listBtn}
                      className="style1 grid active"
                    >
                      <Link to="#">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
                            fill="white"
                          />
                          <path
                            d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
                            fill="white"
                          />
                          <path
                            d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
                            fill="white"
                          />
                          <path
                            d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
                            fill="white"
                          />
                        </svg>
                        <span>Grid</span>
                      </Link>
                    </li> */}
                    {/* <li
                      onClick={gridToggle}
                      ref={gridBtn}
                      className="style2 list"
                    >
                      <Link to="#">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 8H3C2.59 8 2.25 7.09333 2.25 6C2.25 4.90667 2.59 4 3 4H21C21.41 4 21.75 4.90667 21.75 6C21.75 7.09333 21.41 8 21 8Z"
                            fill="#EBEBEB"
                          />
                          <path
                            d="M21 14H3C2.59 14 2.25 13.0933 2.25 12C2.25 10.9067 2.59 10 3 10H21C21.41 10 21.75 10.9067 21.75 12C21.75 13.0933 21.41 14 21 14Z"
                            fill="#EBEBEB"
                          />
                          <path
                            d="M21 20H3C2.59 20 2.25 19.0933 2.25 18C2.25 16.9067 2.59 16 3 16H21C21.41 16 21.75 16.9067 21.75 18C21.75 19.0933 21.41 20 21 20Z"
                            fill="#EBEBEB"
                          />
                        </svg>
                        <span>List</span>
                      </Link>
                    </li> */}
                  </ul>

                  {/* <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="btn-sort-by dropdown"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 7H21"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M6 12H18"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M10 17H14"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                      <span>Low To High</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ margin: 0 }}>
                      <Dropdown.Item href="#">Top rate</Dropdown.Item>
                      <Dropdown.Item href="#">Mid rate</Dropdown.Item>
                      <Dropdown.Item href="#">Low rate</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>
              </div>

              <div
                className={
                  checkOpen
                    ? "content-item open responsive__card__list item-center-card"
                    : "content-item"
                }
                style={{ marginLeft: "0px", maxWidth: "unset" }}
                ref={listContent}
              >
                {nft.slice(0, visible).map((item, key) => (
                  <>
                    <div
                      key={key}
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-6 center col-card"
                    >
                      <div
                        className="sc-card-product explode card-height height-res"
                        style={{
                          height: "fit-content",
                          width: "100%",
                          minHeight: "455px",
                        }}
                      >
                        <div className="card-media">
                          <Link to={`/mining/nft-profile/${item?._id}`}>
                            <img
                              loading="lazy"
                              src={
                                item?.media ||
                                "https://miro.medium.com/max/945/1*W35QUSvGpcLuxPo3SRTH4w.png"
                              }
                              alt={item.name}
                            />
                          </Link>

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
                          {item?.endTime > Date.now() && (
                            <div className="featured-countdown">
                              <span className="slogan"></span>
                              <Countdown date={item?.endTime}>
                                <span>You are good to go!</span>
                              </Countdown>
                            </div>
                          )}
                        </div>
                        <div className="card-title mg-bt-16">
                          <h5>
                            <Link to={`/mining/nft-profile/${item?._id}`}>
                              {item?.name}
                            </Link>
                          </h5>
                          <div className="tags">PN</div>
                        </div>
                        <div className="meta-info">
                          <div className="author">
                            <div className="avatar">
                              <Link
                                to={`/mining/collections/${item?.collectionNft?._id}`}
                              >
                                <img
                                  loading="lazy"
                                  src={item?.collectionNft?.image}
                                  alt={item?.collectionNft?.name}
                                />
                              </Link>
                            </div>
                            <div className="info">
                              <span className="text-level-card">
                                {item?.mining?.levelName || "un"}
                              </span>
                              <h6
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <Link
                                  to={`/mining/collections/${item?.collectionNft?._id}`}
                                >
                                  {item?.collectionNft?.name}
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
                            <div className="button-place-bid btn-style ready-mines">
                              <button
                                onClick={() =>
                                  navigate(`/mining/nft-profile/${item?._id}`)
                                }
                                className={
                                  item?.endTime > new Date().getTime() &&
                                  item?.level < 6
                                    ? "custom_button w-100 padding-card"
                                    : "custom_button w-100 padding-card primary"
                                }
                              >
                                <BagWIcon />
                                {item?.endTime < new Date().getTime() &&
                                  item?.mint === false &&
                                  item?.level < 6 && <span>Mine</span>}
                                {item?.endTime > new Date().getTime() &&
                                  item?.level < 6 && <span>Mining</span>}
                                {item?.level === 6 && item?.mint === false && (
                                  <span
                                    style={{
                                      fontSize: "11px",
                                    }}
                                  >
                                    Complete Mine
                                  </span>
                                )}
                              </button>
                            </div>
                          ) : (
                            <div className="button-place-bid btn-style ready-mines">
                              <button className="custom_button w-100 opacity">
                                <span>None</span>
                              </button>
                            </div>
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
                  </>
                ))}

                {visible < nft.length && (
                  <div className="col-md-12 wrap-inner load-more text-center btn-auction item center">
                    <Link
                      to="#"
                      className="sc-button loadmore fl-button pri-3"
                      onClick={showMoreItems}
                    >
                      <span>Load More</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* <div
                className={checkOpen ? "content-item2" : "content-item2 open"}
                ref={gridContent}
              >
                {nft?.slice(0, visible).map((item, index) => (
                  <div key={index} className="col-item">
                    <div className="sc-card-product menu_card style-h7">
                      <div className="wrap-media">
                        <div className="card-media">
                          <Link to="/item-details-01">
                            <img
                              loading="lazy"
                              style={{ height: "100%" }}
                              src={item?.media}
                              alt={item?.name}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="card-title">
                        <p>Item Name</p>
                        <h4>
                          <Link to="#">{item?.name}</Link>
                        </h4>
                      </div>
                      <div className="meta-info style">
                        <p>{item?.mining?.levelName}</p>
                        <div className="author">
                          <div className="avatar">
                            <img
                              loading="lazy"
                              src={
                                item?.collectionNft?.image ||
                                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAS1BMVEX////h4eGZmZnf39/j4+Pm5ub09PT7+/vs7Ozo6Oj4+Pjw8PCWlpaTk5OamprY2Nimpqa/v7/Pz8+srKyioqLHx8e+vr63t7fU1NQ98dxgAAAEVklEQVR4nO2dW3eqMBCFrQlXAyLWev7/Lz1EpPWC0FDYE8P+HvrQtXBlM5OZSchlsyGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBXkjzepVmk9Ydq0DrK0l2cJ9LNmokkTq20ZxqhafzuKht1WvWI+0HpN1aZxFmf6XqMmb2lyCT9nbyryDSXbrAj8Yhz9rhrFks32oE8cpR3NeS7aIwjV/t92/EtNObZRHktmff9cfcnfZadtIRBYpf4+QrtsRn/bsCWVFrIC5JpEbSPyMsKYBYP7fAxqM7loR3eBZx0ag58hfKsM/4tCfaTSYu6IVlCYCPRm3gzYxC9x5uQuowFLZ446nICPZGYLijQi/JmN3eauEeJ58V4UX0W4eommbNU60fLBtSl8sQtkaTAZaNMh2BXzCECJbvi8p2wRUsJnHvA9BohP0X5qEVm6mbJau0Rkept+Vx/i0SwQYWZFoGkGC9bjz6i8D0Ra0IBI2J7oQXdE5GBtAWc9nNsL7Qo7BgDU3LfAx3uA4aFz0AHivg4Y0HGGnycsQBLNxEnhbqpjJMi3VQiklpw0VTGSYFJP8Gn+xZY0pfqhriOKNUNcR0RMQ3cD2gIJZQNLaCMiJxje1SIGenLBRpUqMFNBD+DmRqWC6WoYDo2sNC6d/PBOL94EDO8GE4W+qM+HNQUiXp/OtQjGjHpYrANWh23xpQnd4n6VBqzPQ6/HExlOtyEL7NtKPeuErUq7YPm7IHCwYZGF4Fb42xEfWifLAc7gYIoHBxZREWr8DBVYeG9wqptaO2ssG5fTeW7Ql2XjURznBBpjvbBcvjVeKCwkVgV5fk+Iuooih4b/vQ/rb5MUY3YHqNwxDyXpt+3fV8V1UNw7fmf7nsRjz/ug8JnbN80n3dm1erTjPU5OYXOzbrEV3NrscaCZjRu9v4URKHzhHcbX81n3dadzZ/604zHzT4wdanz2EL/K9tkfj6ppqup0/Ga3P85OzxmbOE+PuwkGlNYzFWgc85EjQ8njPF165a3WKd1/yHMGD+f0DK9PxZ3Aoujc21uwczTTJpra6JLte3saLbVadIoGfX1aeIuX1Wfq9J2w+pcTxoi45acTJ2ouRQt0VPJ4wBqzjv87xbhf3sK//vhCr4Bh/8dP/y1GOGvp1nBmqjw17WFvzZRIumjV3rj3RS90Dv8dd7wJSf43V3gld5KYNMM1ogSG/TC3/cU/t61Few/DH8P6Qr2AcOCjeDxZhg/FT39A+GnomcqrOBcjPDPNlnB+TQrOGNo2RLci3OilpToicAVnNe2lER/ztzbhH9u4mYFZ1+u4PzSFZxBO2uNKl2LvmSu8sZDD+2YslzqCT899JvQz2TfrOBc/c2Uuy06VOS3g/4wMXFE72C/Dvc7Lt7jbotbcsd7ZnzNgEOEflfQhcDve7pyubOr13Qh3NnV8X3vmgrx3jVCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgiS/8cMRAmf+3K8AAAAAElFTkSuQmCC"
                              }
                              alt={item?.collectionNft?.name}
                            />
                          </div>
                          <div className="info">
                            <h4>
                              <Link to="#">{item?.collectionNft?.name}</Link>
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="countdown">
                        <div className="card-bottom style-explode">
                          {item?.mint !== true ? (
                            <div className="button-place-bid btn-style ready-mines btn-style-width ">
                              <button
                                onClick={() =>
                                  navigate(`/mining/nft-profile/${item?._id}`)
                                }
                                className="custom_button w-100"
                              >
                                <ShoppingBagIcon fontSize="medium" />
                                {item?.endTime < new Date().getTime() &&
                                  item?.mint === false &&
                                  item?.level < 6 && <span>Mine</span>}
                                {item?.endTime > new Date().getTime() &&
                                  item?.level < 6 && <span>Mining</span>}
                                {item?.level === 6 && item?.mint === false && (
                                  <span style={{ fontSize: "12px" }}>
                                    Complete Mine
                                  </span>
                                )}
                              </button>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        {item?.endTime > Date.now() && (
                          <div className="featured-countdown">
                            <span className="slogan"></span>
                            <Countdown date={item.endTime}>
                              <span>You are good to go!</span>
                            </Countdown>
                          </div>
                        )}
                      </div>
                      <Link
                        to={`/activity/${item?._id}`}
                        className="view-history reload"
                      >
                        <span>Mine History</span>
                      </Link>

                      <div className="card-media card-love-heigth">
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

                      <div className="wrap-tag">
                        <div className="tags">BDS</div>
                      </div>
                      <div className="meta-info">
                        <div className="author">
                          <div className="info">
                            <p>Mining Value</p>
                            <p className="pricing">
                              {item?.mining?.price || 0} USDC
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {visible < nft.length && (
                  <div className="col-md-12 wrap-inner load-more text-center btn-auction item center">
                    <Link
                      to="#"
                      className="sc-button loadmore fl-button pri-3"
                      onClick={showMoreItems}
                    >
                      <span>Load More</span>
                    </Link>
                  </div>
                )}
              </div> */}
            </TabPanel>
          ))}
        </Tabs>
      </div>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

export default ItemContent;
