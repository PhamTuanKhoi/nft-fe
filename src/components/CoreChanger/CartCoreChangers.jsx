import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/hoaki.jpg";
import checked from "../../assets/images/icon/check.png";

let pngChecked = checked;
let logoFake = logo;

export default function CartCoreChangers({ item }) {
  const avatarFake =
    "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";
  let navigate = useNavigate();
  return (
    <>
      <div key={item?.id} className="item-mine-bottom">
        <div
          className={
            item.winers.length > 0
              ? "item-first item-core"
              : "item-first item-core null"
          }
        >
          <p className="text-title">Core Changer :</p>
          <div className="img-name margin-left unmagrin">
            <div
              onClick={() =>
                navigate(`/mining/nft-collections-profile/${item?.id}`)
              }
              className="lead-item"
            >
              {/* <div className="lead"> */}
              <div className="lead point-corechanger">
                <img
                  src={item?.avatar || logoFake}
                  alt={item?.name}
                  className="avatar"
                  loading="lazy"
                />
                {/* <div className="check"></div> */}
                <div className="badge">
                  <img src={pngChecked} alt="" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="item-content">
              <p className="title-name-bottom">{item?.name || "unnamed"}</p>
              <p className="value-power mobile">
                {" "}
                <img src="/coin.png" alt="" loading="lazy" />
                {item?.power?.toFixed(2) < 0.01
                  ? 0.01
                  : item?.power?.toFixed(2)}{" "}
                CP
              </p>
            </div>
          </div>
          <p className="text-title">Badges :</p>
          {item?.winers?.length > 0 ? (
            <div className="core-member image-square">
              {item?.winers?.slice(0, 5).map((val) => (
                <img
                  key={val._id}
                  src={val?.badges?.image || logoFake}
                  alt={val?.badges?._id}
                  className="avatar"
                  loading="lazy"
                />
              ))}
            </div>
          ) : (
            <p className="text-none">Badges Not Found</p>
          )}
          <p className="text-title">Rank :</p>
          {item?.winers[0]?.badges?.image ? (
            <div className="rank-item">
              <div className="lead">
                {item?.winers[0]?.badges?.image && (
                  <img
                    src={item?.winers[0]?.badges?.image || logoFake}
                    alt={item?.winers[0]?.badges?._id}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          ) : (
            <p className="text-none">Rank Not Found</p>
          )}

          <div className="core-power-item mobile-none">
            <p className="text-title">Core Power :</p>
            <p className="value-power">
              {" "}
              <img src="/coin.png" alt="" loading="lazy" />
              {item?.power?.toFixed(2) < 0.01
                ? 0.01
                : item?.power?.toFixed(2)}{" "}
              CP
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
