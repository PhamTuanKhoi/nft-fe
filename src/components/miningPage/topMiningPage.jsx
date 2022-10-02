import { useState } from "react";
import { useEffect } from "react";
import { userAPI } from "../../apis/user";

export default function TopMiningPage() {
  const [calculate, setCalculate] = useState();

  useEffect(() => {
    fetchCalculate();
  }, []);

  async function fetchCalculate() {
    try {
      const { data } = await userAPI.calculate();
      setCalculate(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section className="flat-title-page inner">
        {/* <div className="overlay"></div>
        <div className="themesflat-container"></div> */}

        <div className="themesflat-container ">
          <div className="wrap-heading flat-slider">
            <div className="bottom-content">
              <div className="bt-content-left">
                <h2 className="bottom-title font">
                  Creating Decentralized Impact To Make Better Futures
                </h2>
                {/* <p className="sub-bottom-desc">
                  Create decentralized impact to make better futures
                </p> */}
              </div>
              <div className="bt-content-right">
                <div className="row-content">
                  <div className="item">
                    <h2 className="title-slider-bt font-number">
                      {calculate?.coreChanger}
                    </h2>
                    <p className="sub-title">Core Changers</p>
                  </div>
                  <div className="item">
                    {" "}
                    <h2 className="title-slider-bt font-number">
                      {calculate?.mintedProject}
                    </h2>
                    <p className="sub-title">Mined Projects</p>
                  </div>
                  <div className="item">
                    {" "}
                    <h2 className="title-slider-bt font-number">
                      ${" "}
                      {calculate?.minedValue?.toFixed(2) < 0.01
                        ? 0.01
                        : calculate?.minedValue?.toFixed(2) || 0}
                      k
                    </h2>
                    <p className="sub-title">Mined Value</p>
                  </div>
                </div>
                <div className="bor"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
