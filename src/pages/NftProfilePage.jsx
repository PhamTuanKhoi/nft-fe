import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";
import { badgesAPI, winerAPI } from "../apis/winer";
import { createHistory } from "../apis/history";
import { miningAPI } from "../apis/mining";
import { nftAPI } from "../apis/nft";
import { userAPI } from "../apis/user";
import img3 from "../assets/images/avatar/avt-1.jpg";
import img2 from "../assets/images/avatar/avt-11.jpg";
import img1 from "../assets/images/avatar/avt-3.jpg";
import img4 from "../assets/images/avatar/avt-5.jpg";
import img5 from "../assets/images/avatar/avt-7.jpg";
import img6 from "../assets/images/avatar/avt-8.jpg";
import imgdetail1 from "../assets/images/box-item/images-item-details.jpg";
import imghodvel from "../assets/images/icon/CoreCave_Icon.png";
import Footer from "../components/footer/Footer";
import HeaderMining from "../components/headerMining/HeaderMining";
import ReadyToMine from "../components/layouts/collections/ReadyToMine";
import { useWeb3 } from "../contexts/Web3Provider/provider";
import { miningTime } from "../helpers/const";
import { useLoading } from "../hooks/useLoading";
import { getHistory } from "../apis/history";
import moment from "moment";
import Countdown from "react-countdown";
import corecaveContract from "../contracts/CoreCave.json";
import { BigNumber, ethers } from "ethers";
import { BagWIcon } from "../assets/icons";

const NftProfilePage = () => {
  const avatarFake =
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
  const { user, setUser, signer } = useWeb3();
  // let { setLoading } = useLoading;
  const { setLoading } = useLoading();
  const [dataNft, setDataNft] = useState();
  const [view, viewer] = useState(0);
  const [history, setHistory] = useState([]);
  const [minings, setMinings] = useState([]);
  const [miningNft, setMiningNft] = useState({});
  const [load, setLoad] = useState(0);
  const [reLoad, setReload] = useState(1);
  const { id } = useParams();

  const getNft = async () => {
    const { data } = await nftAPI.view(id);
    setDataNft(data);
  };

  useEffect(() => {
    nftViewer();
  }, [id]);

  useEffect(() => {
    if (id) {
      getNft();
      loadHistory();
    }
  }, [id, load, view, reLoad]);

  async function nftViewer() {
    try {
      await nftAPI.viewer(id);
      viewer((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  function validate(dateNow) {
    if (user === undefined) {
      toast.warn("Please login !");
      return false;
    }

    if (signer === undefined) {
      toast.warn("Please login metamask !");
      return false;
    }

    if (dateNow < dataNft?.endTime) {
      toast.error("Sorry mining time has not ended !");
      return false;
    }

    if (dataNft?.owner?._id === user?._id) {
      toast.warn("Sorry you can't mint two levels in a row !");
      return false;
    }

    if (dataNft?.mint === true) {
      toast.warn("NFT COMPLETE MINE !");
      return false;
    }
    return true;
  }

  async function mineContact() {
    try {
      // get contract
      setLoading(true);
      const contract = new ethers.Contract(
        process.env.REACT_APP_ADDRESS,
        corecaveContract.abi,
        signer
      );

      const coinContract = new ethers.Contract(
        process.env.REACT_APP_COIN_ADDRESS,
        corecaveContract.abi,
        signer
      );

      let balance = await coinContract.balanceOf(await signer.getAddress());
      balance = ethers.utils.formatUnits(balance, 6);

      // arr price 6 level smart contract
      let priced = await contract.getMinePrice(dataNft?.nftId, dataNft?.level);

      // conver big number to number string
      let numberPrice = ethers.utils.formatUnits(priced, 6);

      // ss
      if (+balance < +numberPrice) {
        toast.warn("You not have enough money");
        setLoading(false);
        return;
      }

      const approveTx = await coinContract.approve(
        process.env.REACT_APP_ADDRESS,
        priced
      );

      await approveTx.wait();

      // mine
      const data = await contract.mine(dataNft.nftId);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      if (error?.code === -32000) {
        toast.error("You do not have enough money !");
      }
      console.log(error);
    }
  }

  const mineNft = async () => {
    try {
      let dateNow = new Date().getTime();
      if (validate(dateNow)) {
        setLoading(true);
        const mined = await mineContact();

        if (!mined) {
          toast.warn(`Mine nft cancel !`);
          setLoading(false);
          return;
        }
        let { data } = await miningAPI.viewLevel(dataNft?.level);

        let payload = {
          owner: user._id,
          level: data.level + 1,
          // endTime: data.miningTime * miningTime + dateNow,
          endTime: 53000 + new Date().getTime(),
        };

        // mined complete
        if (dataNft?.level >= 6) {
          payload = {
            ...payload,
            mint: true,
          };
        }

        setLoading(true);
        const respone = await userAPI.updatePower(user._id, dataNft?._id);
        await nftAPI.update(dataNft._id, payload);
        await createHistory({
          currentLevel: dataNft.level,
          // mintCost: dataNft.mintCost,
          user: user._id,
          nft: dataNft._id,
        });
        await winerAPI.create({ user: user._id });
        toast.success("Mining success");
        setLoad((e) => e + 1);
        setUser(respone.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      if (error?.data?.code === -32000) {
        toast.error("You do not have enough money !");
      }

      if (error?.data?.code === -32603) {
        toast.error(error?.data?.code?.message);
      }

      toast.error(`Error server !`);

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
      setLoading(false);
    }
  };

  async function loadHistory() {
    const { data } = await getHistory({ nft: id });
    setHistory(data.items);
  }

  useEffect(() => {
    fetchMining();
  }, [dataNft]);
  async function fetchMining() {
    const { data } = await miningAPI.get();
    setMinings(data.items);
    const isprice = data?.items?.find((item) => item?.level === dataNft?.level);
    setMiningNft(isprice);
  }

  const [nft, setNft] = useState({
    img: img2,
    name: "Mason Woodward",
    time: "at 06/10/2021, 3:20 AM",
    price: "4.89 ETH",
    priceChange: "$12.246",
    followers: "100",
    creator: "Suzuki",
    owned: "Savado",
    creator_avatar: img1,
    owned_avatar: img1,
    description:
      "Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed ipsum vitae ipsum malesuada.  Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed ipsum",
  });
  // const [sales, setSales] = React.useState([
  //   { unitPrice: "4.89 ETH", endTime: 500000000, views: "200" },
  // ]);
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
    <div className="item-details">
      <HeaderMining />

      <div className="tf-section tf-item-details">
        <div className="themesflat-container mining">
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="content-left">
                <div className="media">
                  <img src={dataNft?.media || imgdetail1} alt="Axies" />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="content-right">
                <div className="sc-item-details">
                  <h2 className="style2">“{dataNft?.name}”</h2>
                  <div className="meta-item">
                    <div className="left">
                      <span className="viewed eye"> {dataNft?.viewer}</span>

                      <span
                        onClick={() => onLoveNft(dataNft?._id)}
                        className="content_like"
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="4 4 20 20"
                          fill={
                            dataNft?.likes?.includes(user?._id) ? "#DD3636" : ""
                          }
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.3908 8.33984C19.2269 8.33984 20.759 9.87652 20.7784 11.7877C20.7966 13.596 20.1437 15.2793 18.7267 16.9547L18.7264 16.9551C17.56 18.3368 16.0402 19.3353 14.6601 20.2419C14.4482 20.3811 14.2395 20.5181 14.036 20.654L13.9987 20.6789L13.9614 20.654C13.7577 20.518 13.5488 20.3808 13.3367 20.2414C11.9568 19.3349 10.4372 18.3367 9.27095 16.956L9.2709 16.9559C7.85527 15.2805 7.20223 13.596 7.21907 11.7885C7.23856 9.87632 8.77072 8.33984 10.6067 8.33984C12.0789 8.33984 13.0712 9.19431 13.6144 9.84703L13.9987 10.3088L14.383 9.84703C14.9263 9.19431 15.9186 8.33984 17.3908 8.33984Z"
                            fill={
                              dataNft?.likes?.includes(user?._id)
                                ? "red"
                                : "white"
                            }
                          />
                        </svg>
                        <span
                          className="number-like"
                          style={{ marginLeft: "5px", marginBottom: "-15px" }}
                        >
                          {dataNft?.likes?.length || 0}
                        </span>
                      </span>
                    </div>
                    {/* <div className="right">
                      <Link to="#" className="share"></Link>
                      <Link to="#" className="option"></Link>
                    </div> */}
                  </div>
                  <div className="client-infor sc-card-product">
                    <div className="meta-info custom_meta">
                      <div className="author">
                        <div className="avatar">
                          <Link
                            to={`/mining/nft-collections-profile/${dataNft?.owner?._id}`}
                          >
                            <img
                              className="img-user-nft"
                              src={dataNft?.owner?.avatar || imghodvel}
                              alt="Axies"
                            />
                          </Link>
                        </div>
                        <div className="info">
                          <span>Mined By</span>
                          <h6>
                            <Link
                              to={`/mining/nft-collections-profile/${dataNft?.owner?._id}`}
                            >
                              {dataNft?.owner?.displayName}
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="meta-info custom_meta">
                      <div className="author">
                        <div className="avatar">
                          <Link
                            to={`/mining/collections/${dataNft?.collectionNft?._id}`}
                          >
                            <img
                              src={dataNft?.collectionNft?.image || avatarFake}
                              alt="Axies"
                            />
                          </Link>
                        </div>
                        <div className="info">
                          <span>Core Tribe</span>
                          <Link
                            to={`/mining/collections/${dataNft?.collectionNft?._id}`}
                          >
                            <h6>
                              <div>{dataNft?.collectionNft?.name}</div>
                            </h6>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p>
                    {dataNft?.description.length <= 50
                      ? dataNft?.description
                      : dataNft?.description.substr(0, 50) + "..."}
                  </p>
                  {/* {sales?.map((item, index) => {
                    return ( */}
                  <div className="meta-item-details style2">
                    <div className="item meta-price">
                      <span className="heading">Mining Value</span>
                      <div className="price">
                        <div className="price-box">
                          <h5>{miningNft?.price} USDC</h5>
                          {/* <span> {item.mintCost}</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="item count-down">
                      <p className="heading style-2 style-center mx-auto">
                        {/* {console.log(dataNft?.endTime, Date.now())} */}
                        {dataNft?.endTime > Date.now() ? (
                          <>
                            <span>Complete in:</span>
                            <Countdown
                              date={dataNft?.endTime || Date.now() + 500000000}
                            ></Countdown>
                          </>
                        ) : dataNft?.endTime < Date.now() &&
                          dataNft?.mint === true ? (
                          "Mined"
                        ) : (
                          <>
                            <span>Core Stage:</span>
                            <span className="text-level-nft">
                              {miningNft?.levelName}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  {/* );
                  })} */}
                  {dataNft?.mint !== true && (
                    <div
                      onClick={() => mineNft(dataNft._id)}
                      className={
                        dataNft?.endTime > Date.now() && dataNft?.mint === false
                          ? "sc-button loadmore style bag fl-button pri-3 mining"
                          : "sc-button loadmore style bag fl-button pri-3"
                      }
                    >
                      <span>
                        {dataNft?.endTime > Date.now() &&
                        dataNft?.mint === false ? (
                          `Core Stage: ${miningNft?.levelName} Is Going On`
                        ) : dataNft?.endTime <= Date.now() &&
                          dataNft?.mint === false &&
                          dataNft?.level < 6 ? (
                          <span>
                            <BagWIcon />
                            &nbsp;&nbsp;&nbsp;Mine
                          </span>
                        ) : (
                          "Complete Mine"
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flat-tabs themesflat-tabs">
                    <Tabs>
                      <TabList>
                        <Tab>Mine History</Tab>
                        {/* <Tab>Info</Tab>
                        <Tab>Provenance</Tab> */}
                      </TabList>

                      <TabPanel>
                        <ul className="bid-history-list">
                          {history.map((item, index) => (
                            <li key={index}>
                              <div className="content-again">
                                <div className="client">
                                  <div className="sc-author-box style-2">
                                    <div className="author-avatar">
                                      <Link
                                        to={`/mining/nft-collections-profile/${item?.users?._id}`}
                                      >
                                        <img
                                          src={
                                            item?.users?.avatar || avatarFake
                                          }
                                          alt="Axies"
                                          className="avatar"
                                        />
                                      </Link>
                                      <div className="badge"></div>
                                    </div>
                                    <div className="author-infor">
                                      <div className="name">
                                        <h6>
                                          <Link
                                            to={`/mining/nft-collections-profile/${item?.users?._id}`}
                                          >
                                            {item?.users?.displayName ||
                                              "unnamed"}{" "}
                                          </Link>
                                        </h6>
                                        {minings.map((val) => {
                                          if (
                                            val.level === item?.currentLevel
                                          ) {
                                            return (
                                              <span>
                                                mined Core Stage &nbsp;: &nbsp;
                                                {val?.levelName}
                                              </span>
                                            );
                                          }
                                        })}
                                      </div>
                                      <span className="time">
                                        {moment(item?.createdAt).fromNow()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="price">
                                  {minings.map((val) => {
                                    if (val.level === item?.currentLevel) {
                                      return (
                                        <span className="price-usdc">
                                          {val?.price} USDC
                                        </span>
                                      );
                                    }
                                  })}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </TabPanel>
                      {/* <TabPanel>
                        <ul className="bid-history-list">
                          <li>
                            <div className="content">
                              <div className="client">
                                <div className="sc-author-box style-2">
                                  <div className="author-avatar">
                                    <Link to="#">
                                      <img
                                        src={dataNft?.creator?.avatar}
                                        alt="Axies"
                                        className="avatar"
                                      />
                                    </Link>
                                    <div className="badge"></div>
                                  </div>
                                  <div className="author-infor">
                                    <div className="name">
                                      <h6>
                                        {" "}
                                        <Link to="/author">
                                          {dataNft?.creator?.displayName}{" "}
                                        </Link>
                                      </h6>{" "}
                                      <span> place a bid</span>
                                    </div>
                                    <span className="time">
                                      {moment(nft?.createdAt).fromNow()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </TabPanel>
                      <TabPanel>
                        <div className="provenance">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
                        </div>
                      </TabPanel> */}
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReadyToMine />
      <Footer />
    </div>
  );
};

export default NftProfilePage;
