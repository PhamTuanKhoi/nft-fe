import React from "react";
import slider from "../../assets/images/slider/VNU_M622_08.png";
import { Link } from "react-router-dom";


const StaticSlider = () => {
  return (
    <>
      <div className="home_slider">
        <p className="text_row_1">
          It’s A <span className="strong_text1">Decentralized</span> Cave
        </p>
        <p className="text_row_2">
          Where<span className="strong_text2">CoreChangers</span> Are{" "}
          <span className="strong_text2">Mining Values</span>
        </p>
        <p className="text_row_3">
          To<span className="strong_text3">Boost Up Solutions</span> Those Help
          Us
        </p>
        <p className="text_row_4">
          To Solve<span className="strong_text4">Climate Change</span> Problem
        </p>
      </div>
      <img className="img_slider" src={slider} alt="" />
      <div className="flat-bt-slider flex style2 home_position_style">
        <Link
          to="/mining/miningpage"
          className="sc-button header-slider style style-1 rocket fl-button pri-1"
        >
          <span>Explore Cause</span>
        </Link>
        {/* <Link
                      to="https://www.notion.so/CoreCave-LitePaper-V1-0-9cb24cd658944f928c3c1a1e1faebf0c"
                      className="sc-button header-slider style style-1 note fl-button pri-1 btn-create"
                    >
                      <span>Cause</span>
                    </Link> */}
        <a
          href="https://corecave.notion.site/CoreCave-LitePaper-V1-0-9cb24cd658944f928c3c1a1e1faebf0c"
          className="sc-button header-slider style style-1 note fl-button pri-1 btn-create"
          target={"_blank"}
        >
          <span>Lite Paper</span>
        </a>
      </div>
    </>
  );
};

export default StaticSlider;
