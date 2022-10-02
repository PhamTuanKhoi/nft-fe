import React , { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import img1 from '../assets/images/box-item/img3rank.jpg'
import img2 from '../assets/images/box-item/img4rank.jpg'
import img3 from '../assets/images/box-item/img5rank.jpg'
import img4 from '../assets/images/box-item/img6rank.jpg'
import img5 from '../assets/images/box-item/img1rank.jpg'
import img6 from '../assets/images/box-item/img2rank.jpg'
import imga1 from '../assets/images/avatar/author_rank.jpg'
import { ranking } from '../apis/transaction';
import HeaderMining from '../components/headerMining/HeaderMining';

const Ranking = () => {
    const [data] = useState(
        [
            {
                img: img1,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img2,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img3,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img4,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img5,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img6,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img1,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img2,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img3,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img4,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img5,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
            {
                img: img6,
                title: "Hamlet Contemplates Yorick's Yorick's",
                imgAuthor: imga1,
                nameAuthor: 'SalvadorDali',
                volume: '12,4353',
                day: '+3456%',
                week: '-564%',
                price: '12,4353 ETH',
                owners: '3.3k',
                assets: '23k'
            },
        ]
    )
    const [visible , setVisible] = useState(6);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
    }

    const [collections, setCollections] = useState([]);

    const fetchCollection = async () => {
      // test thu ham co sang
      const { data } = await ranking();
      setCollections(data.items)
    }
    useEffect(() => {
        fetchCollection();
    }, [])
    // console.log(collections);
    return (
        <div>
            {/* <Header /> */}
            <HeaderMining/>
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Ranking</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Pages</Link></li>
                                    <li>Ranking</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <section className="tf-section tf-rank">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-ranking">
                                <div className="flex th-title">
                                    <div className="column1">
                                        <h3>Collection</h3>
                                    </div>
                                    <div className="column">
                                        <h3>Volume</h3>
                                    </div>
                                    <div className="column">
                                    <h3>24h %</h3>
                                    </div>
                                    <div className="column">
                                    <h3>7d %</h3>
                                    </div>
                                    <div className="column">
                                    <h3>Floor Price</h3>
                                    </div>
                                    <div className="column">
                                    <h3>Owners</h3>
                                    </div>
                                    <div className="column">
                                    <h3>Assets</h3>
                                    </div>
                                </div>
                                {
                                    collections.slice(0,visible).map((item,index) => (
                                        <div key={index} className="fl-item2">
                                            <div className="item flex">
                                                <div className="infor-item flex column1">
                                                    <div className="media">
                                                        <img src={item?._id?.collection?.image} alt="Axies" />
                                                    </div>
                                                    <div className="content-collection pad-t-4">
                                                        <h5 className="title mb-15"><Link to="/item-detail">"{item?._id?.collection?.name}"</Link></h5>
                                                        <div className="author flex">
                                                            <div className="author-avatar">
                                                                <img src={imga1} alt="Axies" />
                                                                <div className="badge"><i className="ripple"></i></div>
                                                            </div>
                                                            <div className="content">
                                                                <p>Owned By</p>
                                                                <h6><Link to="/authors-01">{item?._id?.collection?.name}</Link></h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="column">
                                                    <span>12,4353</span>
                                                </div>
                                                <div className="column td2">
                                                    <span>+3456%</span>
                                                </div>
                                                <div className="column td3">
                                                    <span>-564%</span>
                                                </div>
                                                <div className="column td4">
                                                    <span>12,4353 ETH</span>
                                                </div>
                                                <div className="column td5">
                                                    <span>3.3k</span>
                                                </div>
                                                <div className="column td6">
                                                    <span>23k</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    visible < data.length && 
                                    <div className="col-md-12 wrap-inner load-more text-center"> 
                                        <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Ranking;
