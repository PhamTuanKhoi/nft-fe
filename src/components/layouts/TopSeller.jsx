import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { ranking } from '../../apis/transaction';

const imageFake = 'https://th.bing.com/th/id/R.41a38b3ba31d2b29087c0f4301d64727?rik=qXj%2fEqlMUZ1bTw&pid=ImgRaw&r=0';
const TopSeller = props => {
    // const data = props.data;
    
    const [topCollection, setTopCollection] = useState();
    async function fetchTopCollection() {
        const {data} = await ranking();
        setTopCollection(data.items);
    }
    useEffect(() => {
        fetchTopCollection();
    }, []);
    // console.log(topCollection);
    return (
        <section className="tf-section top-seller">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions">
                <h2 className="tf-title">Top Card Collection</h2>
              </div>
            </div>
            <div className="col-md-12">
              <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={30}
                navigation
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
                  1200: {
                    slidesPerView: 8,
                  },
                  1350: {
                    slidesPerView: 9,
                  },
                }}
                scrollbar={{ draggable: true }}
              >
                {
                    topCollection?.map((item,index) => (
                        <SwiperSlide key={index}>
                            <TopSellerItem item={item?._id?.collection} total={item?.total} />
                        </SwiperSlide>
                    ))
                }
              </Swiper>
            </div>
          </div>
        </div>
      </section>  
    );
};

const TopSellerItem = props => (
    <div className="swiper-container seller style2 seller-slider2 button-arow-style">
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
              <span className="price">Total sell: {props?.total} ETH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

);

export default TopSeller;
