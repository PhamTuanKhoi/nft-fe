import React, { useState } from "react";
import HeaderMining from "../components/headerMining/HeaderMining";
import Footer from "../components/footer/Footer";
import BottomMiningPage from "../components/miningPage/bottomMiningPage";
import TopMiningPage from "../components/miningPage/topMiningPage";
import CenterMiningPage from "../components/miningPage/centerMiningPage";

const MiningPage = () => {

  const [problemId, setProblemId] = useState("");
  return (
    <div className="authors">
      <HeaderMining />
      <TopMiningPage />
      <CenterMiningPage setProblemId={setProblemId} />
      <BottomMiningPage problemId={problemId} />
      <Footer />
    </div>
  );
};

export default MiningPage;
