import React, { useEffect, useState } from "react";
// import TopMine from "../layouts/card/TopMine";
import TopProblem from "../layouts/card/topProblem";
import { getProblem } from "../../apis/transaction";
export default function CenterMiningPage({ setProblemId }) {
  // const [topCollection, setTopCollection] = useState([]);
  const [problem, setProblem] = useState([]);
  // async function fetchTopCollection() {
  //     const { data } = await ranking();
  //     setTopCollection(data.items);
  // }
  async function loadProblem() {
    const { data } = await getProblem();
    setProblem(
      data
        ?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        ?.slice(0, 6)
    );
  }
  useEffect(() => {
    // fetchTopCollection();
    loadProblem();
  }, []);
  return (
    <>
      <TopProblem data={problem} setProblemId={setProblemId} />
    </>
  );
}
