import React, { useEffect, useState } from "react";
import { loadItemMiningpage } from "../../apis/projectService";
import ItemCart from "./itemcart";
import ItemCartMining from "./itemcartMining";
import ItemCartWaitting from "./itemcartWaitting";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useLoading } from "../../hooks/useLoading";

export default function BottomMiningPage({ problemId }) {
  const [nft, setNft] = useState([]);
  const [reload, setReload] = useState(0);
  const [status, setTatus] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setLoading } = useLoading();
  const [title, setTitle] = useState("status");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function loadItem() {
    try {
      setLoading(true);
      const { data } = await loadItemMiningpage({ status, problem: problemId });
      setNft(data.items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    loadItem();
  }, [status, reload, problemId]);

  const problemStatus = [
    {
      key: 1,
      value: "Mined",
    },
    {
      key: 0,
      value: "Mining",
    },
    {
      key: 2,
      value: "Waiting for Mining",
    },
  ];
  return (
    <>
      <section className="tf-section our-creater dark-style2">
        <div className="_container">
          <div className="item-mine-top">
            <div className="title-name">
              <p className="none">Name</p>
            </div>

            {status == 1 ? (
              <ul className="title-value none">
                <li>
                  <p>Mined Year </p>
                </li>
                <li>
                  <p>Mining Value </p>
                </li>
                <li>
                  <p>Mining Power </p>
                </li>
              </ul>
            ) : status == 0 ? (
              <ul className="title-value none">
                <li>
                  <p>Time left </p>
                </li>
                <li>
                  <p>Mining Value </p>
                </li>
                <li>
                  <p>Mining Power </p>
                </li>
              </ul>
            ) : status == 2 ? (
              <ul className="title-value none">
                <li>
                  <p>Time left </p>
                </li>
                <li>
                  <p>Mining Value </p>
                </li>
                <li className="problem">
                  <p>Problem Category </p>
                </li>
              </ul>
            ) : (
              ""
            )}
            <FormControl sx={{ width: 132 }} size="small">
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className={
                  problemStatus[2]?.value === title ? "button-select-cause" : ""
                }
                style={{
                  fontFamily: "Urbanist",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "700",
                  lineHeight: "40px",
                  border: "1px solid #5142FC",
                  borderRadius: "20px",
                  height: "40px",
                  textTransform: "capitalize",
                  justifyContent: "space-around",
                }}
              >
                <span
                  className={
                    problemStatus[2]?.value === title ? "text-bt-cause" : ""
                  }
                >
                  {problemStatus[2]?.value === title
                    ? "Waiting for Mine"
                    : title}
                </span>
                <svg
                  // xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path
                    d="M1.00049 1.34375L4.87549 5.21875L8.75049 1.34375"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                style={{
                  marginTop: "50px",
                }}
              >
                {problemStatus.map((item, index) => (
                  <div
                    onClick={() => {
                      setTitle(item?.value);
                      setTatus(item?.key);
                    }}
                  >
                    <MenuItem value={item.key} key={index}>
                      {" "}
                      {item?.value}
                    </MenuItem>
                  </div>
                ))}
              </Menu>
            </FormControl>
          </div>
          {nft.map((item, index) => {
            if (status == 1) {
              return <ItemCart setReload={setReload} nft={item} key={index} />;
            } else if (status == 0) {
              return (
                <ItemCartMining
                  setReload={setReload}
                  nft={item}
                  key={index}
                  setNft={setNft}
                  nfts={nft}
                />
              );
            } else if (status == 2) {
              return (
                <ItemCartWaitting
                  setReload={setReload}
                  nft={item}
                  key={index}
                />
              );
            }
          })}
        </div>
      </section>
    </>
  );
}
