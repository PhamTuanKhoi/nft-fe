import React from "react";
import { Link } from "react-router-dom";
import icon1 from "../../assets/images/icon/Wallet.png";
import icon2 from "../../assets/images/icon/Category.png";
import icon3 from "../../assets/images/icon/Image2.png";
import icon4 from "../../assets/images/icon/Bookmark.png";

const Create = () => {
  const data = [
    {
      title: "Create Profile",
      description: "Connect you wallet & Create CoreChanger Profile",
      icon: icon1,
      colorbg: "icon-color1",
    },
    {
      title: "Collect Mining Power",
      description: "Participate in Mining Warrior & collect Mining Power",
      icon: icon2,
      colorbg: "icon-color2",
    },
    {
      title: "Mine Value",
      description: "Mine Cause Project by using Mining Power ",
      icon: icon3,
      colorbg: "icon-color3",
    },
    {
      title: "Make Legacy",
      description: "Collect you Badges, Core Power & Make Profit based on Core Power",
      icon: icon4,
      colorbg: "icon-color4",
    },
  ];
  return (
    <section className="tf-box-icon create style1 tf-section mine_value">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions mg-bt-22">
              <h2 className="tf-title pb-17">Become Core Changer</h2>
            </div>
          </div>
          <div className="create">
            {data.map((item, index) => (
              <CreateItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CreateItem = (props) => (
  // <div className="col-lg-3 col-md-6 col-12">
  <div className="item-create">
    <div className="sc-box-icon content-box-create">
      <div className="image">
        <div className={`icon-create ${props.item.colorbg}`}>
          <img className="unset-image" src={props.item.icon} alt="" />
        </div>
      </div>
      <h3 className="heading">
        <Link to="#">{props.item.title}</Link>
      </h3>
      <p className="content">{props.item.description}</p>
    </div>
  </div>
);

export default Create;
