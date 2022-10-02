import React, { useEffect, useState } from "react";
import { userAPI } from "../../apis/user";
import { useLoading } from "../../hooks/useLoading";
import CartCoreChangers from "./CartCoreChangers";
export default function CoreChangers({ badgesId }) {
  const [rankings, setRankings] = useState([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    ranking();
  }, [badgesId]);

  async function ranking() {
    try {
      setLoading(true);
      const { data } = await userAPI.ranking({ badges: badgesId });
      setRankings(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      <section className="tf-section our-creater dark-style2">
        <div className="topcore-header">
          <h2 className="tf-title style2 stylealight mb-25 text-left tf-title-top">
            Core Changers
          </h2>
        </div>
        <div className="_container">
          <div
            className="name-title-core header-core-none"
            style={{ padding: "4px 25px" }}
          >
            <p className="img-name">
              <div className="lead-item">
                <div className="lead">
                  <div className="avatar"></div>
                </div>
              </div>
              <p className="text-name">Core Changers</p>
            </p>
            <p className="core-member">Badges</p>
            <p className="rank-item">Rank</p>
            <p className="core-power-item mobile-none">Core Power</p>
          </div>
          {rankings.map((item) => (
            <CartCoreChangers key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
