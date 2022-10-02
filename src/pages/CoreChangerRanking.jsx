import { useState } from "react";
import HeaderMining from "../components/headerMining/HeaderMining";
import Rank from "../components/CoreChanger/rank";
import CoreChangers from "../components/CoreChanger/CoreChanger";
import Footer from "../components/footer/Footer";

export default function CoreChangerRanking() {
  const [badgesId, setBadgedId] = useState("");
  //   console.log({ badgesId });

  return (
    <>
      <HeaderMining />
      <Rank setBadgedId={setBadgedId} />
      <CoreChangers badgesId={badgesId} />
      <Footer />
    </>
  );
}
