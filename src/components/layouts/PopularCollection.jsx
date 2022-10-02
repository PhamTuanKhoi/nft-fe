import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { collectionSales } from '../../apis/collection';

const avatarFake = 'https://th.bing.com/th/id/R.41a38b3ba31d2b29087c0f4301d64727?rik=qXj%2fEqlMUZ1bTw&pid=ImgRaw&r=0';
const imageFake = 'http://localhost:3000/static/media/card-item-3.f77cccaaa52fbee68190.jpg';
const PopularCollection = props => {
    // const data = props.data;

    const [collection, setCollection] = useState([])
    async function fetchCollectionSales(){
        const { data } = await collectionSales();
        setCollection(data);
    }
    useEffect(() => {
        fetchCollectionSales();
    }, []);
    // console.log(collection);
    return (
        <section className="tf-section popular-collection">
            <div className="themesflat-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="heading-live-auctions">
                            <h2 className="tf-title pb-22 text-left">
                                Popular Collection</h2>
                            <Link to="/explore-03" className="exp style2">EXPLORE MORE</Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="collection">
                        <Swiper
                            modules={[Navigation, Scrollbar, A11y]}
                            spaceBetween={30}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                  },
    
                                767: {
                                  slidesPerView: 2,
                                },

                                991: {
                                  slidesPerView: 3,
                                },
                              }}
                            scrollbar={{ draggable: true }}
                        >
                            {
                                collection?.map((item,index) => (
                                    <SwiperSlide key={index}>
                                        <PopularCollectionItem item={item} />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        </div>    
                    </div>
                </div>
            </div>
        </section>
    );
}
PopularCollection.propTypes = {
    data: PropTypes.array.isRequired,
}

const PopularCollectionItem = props => (
    <div className="swiper-container show-shadow carousel4 button-arow-style">
        <div className="swiper-wrapper">
            <div className="swiper-slide">
                <div className="slider-item">									
                    <div className="sc-card-collection style-2 home2">
                        <div className="card-bottom">
                            <div className="author">
                                <div className="sc-author-box style-2">
                                    <div className="author-avatar">
                                        <img src={props?.item?.creator?.avatar || avatarFake} alt="" className="avatar" />
                                        <div className="badge"><i className="ripple"></i></div>
                                    </div>
                                </div>
                                <div className="content">
                                    <h4><Link to="/authors-01">{props?.item?.creator?.title}</Link></h4>
                                    <div className="infor">
                                        <span>Created by</span>
                                        <span className="name"><Link to="/authors-02">{props?.item?.creator?.title}</Link></span>
                                    </div>
                                </div>
                            </div>
                            <Link to="/login" className="wishlist-button public heart"><span className="number-like"> {props?.item?.creator?.followers.length}</span></Link>
                        </div>
                        <Link to={`/profile/${props?.item?.creator?._id}`}>
                            <div className="media-images-collection">
                                    {
                                        (props?.item?.nfts[0]?.originType.slice(0, 5) === 'image') && <>
                                            <div className="box-left">
                                                <img className="img" src={props?.item?.nfts[0]?.image} alt="axies" />
                                            </div>
                                            <div className="box-right">
                                                <div className="top-img">
                                                    <img className="img" src={props?.item?.nfts[1]?.image} alt="axies" />
                                                    <img className="img" src={props?.item?.nfts[2]?.image} alt="axies" />
                                                </div>
                                                <div className="bottom-img">
                                                    <img className="img" src={props?.item?.nfts[3]?.image} alt="axies" />
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        (props?.item?.nfts[0]?.originType.slice(0, 5) === 'audio') && <>
                                         <div>
                                         <audio className="audio" src={props?.item?.nfts[0]?.media} controls /><br />
                                         <p><audio className="audio" src={props?.item?.nfts[1]?.media} controls /></p>
                                         <p><audio className="audio" src={props?.item?.nfts[2]?.media} controls /></p>
                                         <p><audio className="audio" src={props?.item?.nfts[3]?.media} controls /></p>
                                         </div>
                                            {/* <div className="box-left">
                                               <p> <audio className="audio" src={props?.item?.nfts[0]?.media} controls /></p>
                                            </div>
                                            <div className="box-right">
                                                <div className="top-img">
                                                    <p><audio className="audio" src={props?.item?.nfts[1]?.media} controls /></p>
                                                    <p><audio className="audio" src={props?.item?.nfts[2]?.media} controls /></p>
                                                </div>
                                                <div className="bottom-img">
                                                    <p><audio className="audio" src={props?.item?.nfts[3]?.media} controls /></p>
                                                </div>
                                            </div> */}
                                        </>
                                    }
                                    {
                                        (props?.item?.nfts[0]?.originType.slice(0, 5) === 'video') && <>
                                        <div className="box-left">
                                            <video className="img" src={props?.item?.nfts[0]?.media} controls />
                                        </div>
                                        <div className="box-right">
                                            <div className="top-img">
                                                <video className="img" src={props?.item?.nfts[1]?.media} controls />
                                                <video className="img" src={props?.item?.nfts[2]?.media} controls />
                                            </div>
                                            <div className="bottom-img">
                                                <video className="img" src={props?.item?.nfts[3]?.media} controls />
                                            </div>
                                        </div>
                                        </>
                                    }
                                
                            </div>
                        </Link>
                    </div> 	
                </div>
            </div>
        </div>                            
    </div>
)

export default PopularCollection;
