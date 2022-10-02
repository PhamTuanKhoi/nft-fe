import React, { useEffect, useState } from "react";
import { collectionAPI } from "../../apis/collection";
import { userAPI } from "../../apis/user";
import logo from "../../assets/images/logo/hoaki.jpg";
import checked from "../../assets/images/icon/check.png";
import { useLoading } from "../../hooks/useLoading";

let pngChecked = checked;
let logoFake = logo;

let avatarFake =
  "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";

export default function CartCoreChanger({ badgesId }) {
  const { setLoading } = useLoading();
  // const [rankings, setRankings] = useState([]);
  const [squads, setSquads] = useState([]);
  // useEffect(() => {
  //   ranking();
  // }, []);

  // async function ranking() {
  //   const { data } = await collectionAPI.ranking();
  //   data.sort((a, b) => {
  //     return b.total - a.total;
  //   });
  //   setRankings(data);
  // }

  useEffect(() => {
    squad();
  }, [badgesId]);

  async function squad() {
    try {
      setLoading(true);
      const { data } = await userAPI.squad({ id: badgesId });
      setSquads(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      {squads.map((item) => (
        <div key={item?.id} className="item-mine-bottom">
          <div className="item-first item-core">
            <div className="text-title">Squad : </div>
            <div className="img-name margin-left">
              <div className="img-item">
                <img
                  src={item?.squadImage || logoFake}
                  alt={item?.squadName || "unnamed"}
                  loading="lazy"
                />
              </div>
              <div className="item-content">
                <p className="title-name-bottom">
                  {item?.squadName || "unName"}
                </p>
                <p className="value-power mobile">
                  {" "}
                  <img src="/coin.png" alt="" loading="lazy" />
                  {item?.valuePower?.toFixed(2) < 0.01
                    ? 0.01
                    : item?.valuePower?.toFixed(2) || 0}{" "}
                  MP
                </p>
              </div>
            </div>
            <div className="text-title">Core Member : </div>
            <div className="core-member">
              {item?.nfts?.slice(0, 5).map((val) => (
                <img
                  key={val?._id}
                  src={val?.media || logoFake}
                  alt={val?.name || "unName"}
                  loading="lazy"
                />
              ))}
            </div>
            <div className="text-title">Lead :</div>
            <div className="lead-item">
              <div className="lead">
                <img
                  src={item?.avatar || logoFake}
                  alt={item?.displayName || "unName"}
                  loading="lazy"
                />
                <div className="badge">
                  <img src={pngChecked} alt="" loading="lazy" />
                </div>
              </div>
            </div>
            <div className="core-power-item mobile-none">
              <div className="text-title">Value Power :</div>
              <p className="value-power">
                {" "}
                <img src="/coin.png" alt="" loading="lazy" />
                {item?.valuePower?.toFixed(2) < 0.01
                  ? 0.01
                  : item?.valuePower?.toFixed(2) || 0}{" "}
                VP
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
