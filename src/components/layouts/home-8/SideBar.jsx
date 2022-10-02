import React, { useState } from "react";
import { useEffect } from "react";
import { Accordion } from "react-bootstrap-accordion";
import { collectionAPI } from "../../../apis/collection";
import { miningAPI } from "../../../apis/mining";

const SideBar = ({
  status,
  setStatus,
  collection,
  setCollection,
  setLevel,
}) => {
  const [collections, setCollections] = useState([]);
  const [collectionsSelected, setCollectionSelected] = useState([]);
  const [show, setShow] = useState(false);
  const [levels, setLevels] = useState([]);
  const [levelSelect, setLevelSelect] = useState([]);
  const [noneLevel, setNoneLevel] = useState(true);
  const [minings, setMinings] = useState([]);

  useEffect(() => {
    setCollectionSelected(collection);
  }, [collection]);

  const onSelectCollection = (id) => {
    let tmp = collectionsSelected || [];
    if (tmp?.includes(id)) {
      tmp = tmp?.filter((item) => item !== id);
    } else {
      tmp = [...tmp, id];
    }
    setCollectionSelected(tmp);
    setCollection(tmp);
  };

  const fetchCollection = async () => {
    try {
      const { data } = await collectionAPI.collections();
      setCollections(data.items);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCollection();
    let levels = 6;
    let arr = [];
    for (let i = 1; i <= levels; i++) {
      arr.push({
        name: "Level " + i,
        value: i,
        checked: false,
      });
    }
    setLevels(arr);
  }, []);

  useEffect(() => {
    fetchMining();
  }, []);
  async function fetchMining() {
    try {
      const { data } = await miningAPI.get();
      setMinings(data.items);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSetLevels(lev) {
    let arr = levelSelect || [];
    if (arr.includes(lev)) {
      arr = arr?.filter((item) => item !== lev);
    } else {
      arr = [...arr, lev];
    }
    setLevelSelect(arr);
    setLevel(arr);
  }

  return (
    <div id="side-bar" className="side-bar style-3 item zindex-card">
      <div className="toggle_">
        <div className="widget widget-category boder-bt">
          <Accordion title="Status" show={true}>
            <form>
              <div>
                <label>
                  <span>Ready to Mine</span>
                  <span className="pst-re">
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      onClick={() =>
                        setStatus({
                          ...status,
                          mine: !status.mine,
                        })
                      }
                    />
                    <span className="btn-checkbox"></span>
                  </span>
                </label>
                <br />
              </div>
              <div>
                <label>
                  <span>Minging Going</span>
                  <span className="pst-re">
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      onClick={() =>
                        setStatus({
                          ...status,
                          mining: !status.mining,
                        })
                      }
                    />
                    <span className="btn-checkbox"></span>
                  </span>
                </label>
                <br />
              </div>
              <div>
                <label>
                  <span>Mined</span>
                  <span className="pst-re">
                    <input
                      type="checkbox"
                      defaultChecked={false}
                      onClick={() => {
                        setStatus({
                          ...status,
                          mined: !status.mined,
                        });
                        setNoneLevel(!noneLevel);
                      }}
                    />
                    <span className="btn-checkbox"></span>
                  </span>
                </label>
                <br />
              </div>
            </form>
          </Accordion>
          <Accordion title="Core Tribe" show={show}>
            {collections?.map((collection) => {
              return (
                <form key={collection._id}>
                  <div>
                    <label>
                      <span>{collection?.name}</span>
                      <span className="pst-re">
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          onClick={() => onSelectCollection(collection._id)}
                        />
                        <span className="btn-checkbox"></span>
                      </span>
                    </label>
                    <br />
                  </div>
                </form>
              );
            })}
          </Accordion>

          {noneLevel && (
            <Accordion title="Core Mining Stages" show={show}>
              {minings?.map((val) => {
                return (
                  <form action="#" key={val?._id}>
                    <div>
                      <label>
                        <span>{val?.levelName}</span>
                        <span className="pst-re">
                          <input
                            type="checkbox"
                            defaultChecked={false}
                            onClick={() => onSetLevels(val?.level)}
                          />
                          <span className="btn-checkbox"></span>
                        </span>
                      </label>
                      <br />
                    </div>
                  </form>
                );
              })}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
