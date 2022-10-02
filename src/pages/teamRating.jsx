import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderMining from "../components/headerMining/HeaderMining";
import TopCore from "../components/Teamrating/topcore";
import CoreChanger from "../components/Teamrating/CoreChanger";
import Footer from "../components/footer/Footer";
const TeamMining = () => {
  const [badgesId, setBadgesId] = useState("");
  return (
    <>
      <HeaderMining />
      <TopCore setBadgesId={setBadgesId} />
      <CoreChanger badgesId={badgesId} />
      <Footer />
    </>
  );
};
export default TeamMining;
