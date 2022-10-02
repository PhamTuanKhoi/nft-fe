import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getUser } from "../../../apis/user";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { useEffect } from "react";
import { categoryAPI } from "../../../apis/category";
import { collectionAPI } from "../../../apis/collection";

const TopSeller = () => {
  const [dataTopSellerTab] = useState([
    {
      title: "1 Days",
    },
    {
      title: "1 Week",
    },
    {
      title: "1 Month",
    },
  ]);
  const [dataTopSellerPanel] = useState([
    {
      id: 1,
      dataTopSellerContent: [],
    },
    {
      id: 2,
      dataTopSellerContent: [],
    },
    {
      id: 3,
      dataTopSellerContent: [],
    },
  ]);
  const [users, setUsers] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCllection();
  }, []);

  async function fetchCllection() {
    const { data } = await collectionAPI.totalPrice();
    setCollections(data);
  }
  async function loadTopseller() {
    const { data } = await getUser();
    setUsers(data.items);
  }
  useEffect(() => {
    loadTopseller();
  }, []);

  // total
  let reducer = (accumulator, curr) => accumulator + curr;
  return (
    <div>
      <section className="tf-section top-seller home5 s2 ">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <h2 className="tf-title style2 mb-25 text-left">
                Top Mined Tribe
              </h2>
              <div className="flat-tabs seller-tab tablet-30">
                <Tabs>
                  <div className="text-size">
                    <TabList>
                      <div
                        className="controls-slide"
                        style={{ display: "flex", gap: "15px" }}
                      >
                        <div
                          className="button-slide prev swiper-button-prev"
                          style={{
                            borderRadius: "50%",
                            border: "1px solid #5142FC",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 40,
                            height: 40,
                          }}
                        ></div>
                        <div
                          className="button-slide next swiper-button-next"
                          style={{
                            borderRadius: "50%",
                            display: "flex",
                            border: "1px solid #5142FC",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 40,
                            height: 40,
                          }}
                        ></div>
                      </div>
                    </TabList>
                  </div>

                  <div className="content-tab mg-t-24">
                    {dataTopSellerPanel.map((item) => (
                      <TabPanel key={item.id}>
                        <div className="col-md-12">
                          <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={30}
                            allowSlideNext={true}
                            allowSlidePrev={true}
                            breakpoints={{
                              0: {
                                slidesPerView: 1,
                              },
                              375: {
                                slidesPerView: 2,
                              },
                              573: {
                                slidesPerView: 3,
                              },
                              767: {
                                slidesPerView: 4,
                              },
                              991: {
                                slidesPerView: 6,
                              },
                              1300: {
                                slidesPerView: 9,
                              },
                            }}
                            navigation={{
                              nextEl: ".swiper-button-next",
                              prevEl: ".swiper-button-prev",
                            }}
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                          >
                            {collections.map((item, index) => (
                              <SwiperSlide key={index}>
                                <SliderItem
                                  item={item}
                                  reducer={reducer}
                                  className="topseller"
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </TabPanel>
                    ))}
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const imageFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
const SliderItem = (props) => (
  <div className="sc-author-box style-2">
    <Link to={`/mining/collections/${props?.item?.collId}`}>
      <div className="author-avatar">
        <img
          src={props?.item?.image || imageFake}
          alt="Axies"
          className="avatar"
        />
        <div className="badge"></div>
      </div>
      <div className="author-infor">
        <h5>
          <Link to={`/mining/collections/${props?.item?.collId}`}>{props?.item?.title}</Link>
        </h5>
        {/* {props?.item?.total?.map((item) => {
        let a;
      })} */}

        {props?.item?.totalPrice && (
          <span className="price">
            {props?.item?.totalPrice?.toFixed(2) < 0.01
              ? 0.01
              : props?.item?.totalPrice?.toFixed(2) || 0}{" "}
            USDC
          </span>
        )}
      </div>
    </Link>
  </div>
);

export default TopSeller;
