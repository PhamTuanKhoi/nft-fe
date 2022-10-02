import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Countdown from "react-countdown";
import CardModal from "../CardModal";
import { nftAPI } from "../../../apis/nft";
import { useWeb3 } from "../../../contexts/Web3Provider/provider";
import { toast } from "react-toastify";
import { useLoading } from "../../../hooks/useLoading";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import { BagWIcon } from "../../../assets/icons";

const avatarFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
const imageFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";

const TodayPicks = ({ data, setReload }) => {
  const [visible, setVisible] = useState(8);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };
  const [checked, setChecked] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [nft, setNft] = useState({});
  const { user } = useWeb3();
  const { setLoading } = useLoading();
  let navigate = useNavigate();

  async function onLoveNft(id) {
    try {
      if (!user?._id) {
        toast.warn(`Please login !`);
        return;
      }
      setLoading(true);
      const { data } = await nftAPI.likes(id, user?._id);
      setNft(data);
      if (data?.likes?.includes(user?._id)) {
        setChecked(true);
      } else {
        setChecked(false);
      }
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
      <section className="tf-section today-pick">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions mg-bt-21">
                <h2 className="tf-title pb-18">Today's Picks</h2>
                <Link to="/search" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
            <div className="topseller">
              {data?.slice(0, visible)?.map((item, index) => (
                <div key={index} className="item-topseller">
                  <div
                    className={`sc-card-product explode style2 mg-bt min-w ${
                      item.feature ? "comingsoon" : ""
                    } `}
                  >
                    <div className="card-media">
                      <Link to={`/mining/nft-profile/${item?._id}`}>
                        <img
                          loading="lazy"
                          src={
                            item?.media ||
                            "https://miro.medium.com/max/945/1*W35QUSvGpcLuxPo3SRTH4w.png"
                          }
                          alt={item?.name || "Axi"}
                        />
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
                              src={item?.collectionNft?.image || avatarFake}
                              alt={item?.collectionNft?.name}
                            />
                          </Link>
                        </div>
                        <div className="info">
                          <span>{item?.mining?.levelName}</span>
                          <h6>
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
                                ? "custom_button w-100"
                                : "custom_button w-100 primary"
                            }
                          >
                            <BagWIcon />
                            {item?.endTime < new Date().getTime() &&
                              item?.mint === false &&
                              item?.level < 6 && <span>Mine</span>}
                            {item?.endTime > new Date().getTime() &&
                              item?.level < 6 && <span>Mining</span>}
                            {item?.level === 6 && item?.mint === false && (
                              <span>Complete Mine</span>
                            )}
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
              ))}
            </div>

            {visible < data?.length && (
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
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

TodayPicks.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TodayPicks;
