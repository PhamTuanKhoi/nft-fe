import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const imageFake = 'https://th.bing.com/th/id/R.41a38b3ba31d2b29087c0f4301d64727?rik=qXj%2fEqlMUZ1bTw&pid=ImgRaw&r=0';
const TopMine = (props) => {
  const data = props.data;

  return (
    <section className="tf-section live-auctions">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="tf-title style4">Problem Category</h2>
            <br />
            <br />
            <br />
          </div>
          <div className="col-md-12">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={30}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                767: {
                  slidesPerView: 5,
                },
                991: {
                  slidesPerView: 7,
                },
                1300: {
                  slidesPerView: 9,
                },
              }}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {data?.map((item, index) => (
                <SwiperSlide key={index}>
                  <TopMineItem item={item?._id?.collection} total={item?.total} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

TopMine.propTypes = {
  data: PropTypes.array.isRequired,
};

const TopMineItem = (props) => (
  <div className="swiper-container seller seller-slider">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <div className="slider-item">
          <div className="sc-author-box style-2">
            <div className="author-avatar">
              <img src={props?.item?.image || imageFake} alt="" className="avatar" />
              <div className="badge"></div>
            </div>
            <div className="author-infor">
              <h5>
                <Link to="/authors-02">{props?.item.name}</Link>
              </h5>
              <span className="price">{props.total} ETH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TopMine;
