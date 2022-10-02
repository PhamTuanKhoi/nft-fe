import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { likeProject } from "../../apis/projectService";
import { useWeb3 } from "../../contexts/Web3Provider/provider";
import { toast } from "react-toastify";
import FormDialog from "../dialog/dialog";
import { useLoading } from "../../hooks/useLoading";

export default function ItemCart({ nft, setReload }) {
  const Mine_status = { MINED: 0, MINING: 1, MINE_WAITING: 2 };
  const [checked, setChecked] = useState();
  const [power, setPower] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [enterPower, setEnterPower] = useState(0);
  const { user } = useWeb3();
  const { setLoading } = useLoading();

  // console.log("reser");
  // console.log({ enterPower });

  async function likeProjects() {
    try {
      if (!user) {
        toast.warn(`Please login in system !`);
        return;
      }
      setLoading(true);
      // console.log(enterPoswer, "next");
      const { data } = await likeProject(user?._id, nft?._id);

      if (data?.likes?.includes(user?._id)) {
        setChecked(true);
      } else {
        setChecked(false);
      }
      setReload((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      setChecked(nft?.likes?.includes(user._id) || false);
    }
  }, [nft]);

  useEffect(() => {
    let arr = [];
    let detail = [0];
    nft?.users.map((val) => {
      // power user
      if (val?.power !== undefined) {
        arr.push(val?.power);
      }
      // push value
      if (val?.nfts.length > 0 && val?.nfts !== undefined) {
        val?.nfts.map((item) => {
          if (item?.price !== undefined) {
            detail.push(item?.price);
          }
        });
      }
    });
    // mined value  total
    if (detail.length > 0) {
      let sumValue = detail?.reduce((a, b) => {
        return a + b;
      });
      setValue(sumValue);
    }

    setPower(nft?.power);
  }, [nft]);

  return (
    <>
      <div className="item-mine-bottom cause">
        <div className="item-first cause">
          <div className="img-item">
            <Link to={`/mining/detailstatusmined/${nft?._id}`}>
              <img src={nft?.image || "/test.jpg"} alt={nft?.name} />
            </Link>
          </div>

          <div className="item-content">
            <Link to={`/mining/detailstatusmined/${nft?._id}`}>
              <p className="title-name-bottom">{nft?.name || "unnamed"}</p>
            </Link>
            <p className="title-desc">{nft?.description || ""}</p>
            <p className="title-local">{nft?.address || "unaddressed"}</p>
          </div>
        </div>
        <ul className="title-value cause">
          <li>
            <p className="title-li">Mined Year</p>
            <p className="item-second">
              {new Date(nft?.endTime).getFullYear()}
            </p>
          </li>
          <li>
            <p className="title-li">Mining Value</p>
            <p className="item-second">
              {" "}
              <img src="/coin.png" alt="" />
              {value || "0"} Million
            </p>
          </li>
          <li>
            <p className="title-li">Mining Power</p>
            <p className="item-second">
              {" "}
              <img src="/coin.png" alt="" />
              {power || "0"} MP
            </p>
          </li>
        </ul>
        <div className="item-status">
          {/* <button className="sc-button  style-button style-status">
            <Link to={`/mining/detailstatusmined/` + nft?._id}>
              <p> Mined</p>{" "}
            </Link>
          </button> */}
          <button
            className="sc-button  style-button style-status btn-like "
            onClick={likeProjects}
          >
            <p className="like-box">
              <svg
                width="30"
                height="30"
                viewBox="4 4 20 20"
                fill={checked == true ? "#DD3636" : ""}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3908 8.33984C19.2269 8.33984 20.759 9.87652 20.7784 11.7877C20.7966 13.596 20.1437 15.2793 18.7267 16.9547L18.7264 16.9551C17.56 18.3368 16.0402 19.3353 14.6601 20.2419C14.4482 20.3811 14.2395 20.5181 14.036 20.654L13.9987 20.6789L13.9614 20.654C13.7577 20.518 13.5488 20.3808 13.3367 20.2414C11.9568 19.3349 10.4372 18.3367 9.27095 16.956L9.2709 16.9559C7.85527 15.2805 7.20223 13.596 7.21907 11.7885C7.23856 9.87632 8.77072 8.33984 10.6067 8.33984C12.0789 8.33984 13.0712 9.19431 13.6144 9.84703L13.9987 10.3088L14.383 9.84703C14.9263 9.19431 15.9186 8.33984 17.3908 8.33984Z"
                  fill={checked === true ? "red" : "white"}
                />
              </svg>
              <span>{nft?.likes?.length}</span>
            </p>
          </button>
          {/* <div className="like-dialog">
            {" "}
            <FormDialog
              id={nft?._id}
              setPower={setPower}
              status={nft?.status}
              open={open}
              likeProjects={likeProjects}
              setOpen={setOpen}
            />
          </div> */}
        </div>
      </div>
    </>
  );
}
