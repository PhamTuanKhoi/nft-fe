import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import avt from "../assets/images/avatar/avata_profile.jpg";
import bg1 from "../assets/images/backgroup-secsion/option1_bg_profile.jpg";
import bg2 from "../assets/images/backgroup-secsion/option2_bg_profile.jpg";
import { useWeb3 } from "../contexts/Web3Provider/provider";
import { useEffect } from "react";
import { pinFileToIPFS } from "../helpers/ipfs";
import walletAPI from "../apis/wallet";
import { toast } from "react-toastify";
import HeaderMining from "../components/headerMining/HeaderMining";
import { useLoading } from "../hooks/useLoading";
import logo from "../assets/images/logo/hoaki.jpg";
import { useNavigate } from "react-router-dom";

let logoFake = logo;

const EditProfile = () => {
  const { user, setUser } = useWeb3();
  const { setLoading } = useLoading();
  const [editUser, setEditUser] = useState();
  const [fileAvatar, setFileAvatar] = useState();
  const [srcAvatar, setSrcAvatar] = useState("");
  const [fileSquad, setFileSquad] = useState();
  const [srcSquad, setSrcSquad] = useState("");
  const [fileCover, setFileCover] = useState();
  const [srcCover, setSrcCover] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && user !== {}) {
      navigate("/mining");
      toast.warn(`Please login in system !`);
    }
  }, [user]);

  const changeAvatar = (e) => {
    try {
      const file = e.target.files[0];
      setFileAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSrcAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  };

  async function onChangeSquad(e) {
    try {
      const file = e.target.files[0];
      setFileSquad(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSrcSquad(e.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  }

  const changeCover = (e) => {
    try {
      const file = e.target.files[0];
      setFileCover(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSrcCover(e.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {}
  };

  function validate() {
    if (editUser.email) {
      const isEmail = String(editUser.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (!isEmail) {
        toast.warn("Email incorrect!");
        return false;
      }
    }
    if (editUser.facebook) {
      const facebook = String(editUser.facebook)
        .toLowerCase()
        .match(
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        );
      if (!facebook) {
        toast.warn("Facebook incorrect!");
        return false;
      }
    }
    if (editUser.twitter) {
      const twitter = String(editUser.twitter)
        .toLowerCase()
        .match(
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        );
      if (!twitter) {
        toast.warn("Twitter incorrect!");
        return false;
      }
    }

    if (editUser.discord) {
      const discord = String(editUser.discord)
        .toLowerCase()
        .match(
          /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        );
      if (!discord) {
        toast.warn("Discord incorrect!");
        return false;
      }
    }
    return true;
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      let payload = editUser;
      if (validate()) {
        setLoading(true);
        if (fileAvatar) {
          let url = await pinFileToIPFS(fileAvatar);
          payload = {
            ...payload,
            avatar: url,
          };
        }
        if (fileCover) {
          let url = await pinFileToIPFS(fileCover);
          payload = {
            ...payload,
            cover: url,
          };
        }

        if (fileSquad) {
          let url = await pinFileToIPFS(fileSquad);
          payload = {
            ...payload,
            squadImage: url,
          };
        }
        const { data } = await walletAPI.updateProfile(payload._id, payload);
        await setUser(data);
        toast.success("Update success!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (typeof error?.response?.data?.message === "string") {
        toast.error(error?.response?.data?.message);
      } else {
        error?.response?.data?.message?.forEach((item) => {
          toast.error(item);
        });
      }
      console.log(error);
    }
  };

  //fetch user
  useEffect(() => {
    setEditUser(user);
    if (user?.avatar) {
      setSrcAvatar(user?.avatar);
    }
    if (user?.cover) {
      setSrcCover(user?.cover);
    }
    if (user?.squadImage) {
      setSrcSquad(user?.squadImage);
    }
  }, [user]);

  return (
    <div>
      {/* <Header /> */}
      <HeaderMining />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="page-title-heading mg-bt-12">
            <h1 className="heading text-center">Edit Profile</h1>
          </div>
          {/* <div className="row">
            <div className="col-md-12">
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Pages</Link>
                  </li>
                  <li>Edit Profile</li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="sc-card-profile text-center">
                <div className="card-media">
                  <img
                    id="profileimg"
                    src={srcAvatar.length > 0 ? srcAvatar : avt}
                    alt="Axies"
                  />
                </div>
                <div id="upload-profile">
                  <Link to="#" className="btn-upload">
                    Upload New Photo{" "}
                  </Link>
                  <input
                    id="tf-upload-img"
                    type="file"
                    name="profile"
                    required=""
                    onChange={(e) => changeAvatar(e)}
                  />
                </div>
                <div
                  className="btn-upload style2"
                  onClick={() => setSrcAvatar("")}
                >
                  Delete
                </div>
              </div>
              <div className="sc-card-profile text-center">
                <div className="card-media">
                  <img
                    id="profileimg"
                    src={srcSquad.length > 0 ? srcSquad : logoFake}
                    alt="Axies"
                  />
                </div>
                <div id="upload-profile">
                  <Link to="#" className="btn-upload">
                    Upload Image Squad{" "}
                  </Link>
                  <input
                    id="tf-upload-img"
                    type="file"
                    name="profile"
                    required=""
                    onChange={(e) => onChangeSquad(e)}
                  />
                </div>
                <div
                  className="btn-upload style2"
                  onClick={() => setSrcSquad("")}
                >
                  Delete
                </div>
              </div>
            </div>

            <div className="col-xl-9 col-lg-8 col-md-12 col-12">
              <div className="form-upload-profile">
                <h4 className="title-create-item">Choice your Cover image</h4>
                <div className="option-profile clearfix">
                  <form action="#">
                    <label className="uploadFile">
                      <input
                        type="file"
                        className="inputfile form-control"
                        name="file"
                        onChange={(e) => changeCover(e)}
                      />
                    </label>
                  </form>
                  <div className="image">
                    <img
                      src={srcCover.length > 0 ? srcCover : bg1}
                      alt="Axies"
                    />
                  </div>
                  {/* <div className="image style2">
                                        <img src={bg2} alt="Axies" />
                                    </div> */}
                </div>

                <form action="#" className="form-profile">
                  <div className="form-infor-profile">
                    <div className="info-account">
                      <h4 className="title-create-item">Account info</h4>
                      <fieldset>
                        <h4 className="title-infor-account">Display name</h4>
                        <input
                          type="text"
                          placeholder="unnamed"
                          value={editUser?.displayName}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              displayName: e.target.value,
                            })
                          }
                          required
                        />
                      </fieldset>

                      <fieldset>
                        <h4 className="title-infor-account">Squad Name</h4>
                        <input
                          type="text"
                          placeholder="unnamed"
                          value={editUser?.squadName}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              squadName: e.target.value,
                            })
                          }
                          required
                        />
                      </fieldset>

                      <fieldset>
                        <h4 className="title-infor-account">Custom URL</h4>
                        <input
                          type="text"
                          placeholder="Axies.Trista Francis.com/"
                          value={editUser?.customUrl || ""}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              customUrl: e.target.value,
                            })
                          }
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Email</h4>
                        <input
                          type="email"
                          value={editUser?.email || ""}
                          onChange={(e) =>
                            setEditUser({ ...editUser, email: e.target.value })
                          }
                          required
                        />
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Bio</h4>
                        <textarea
                          tabIndex="4"
                          rows="5"
                          value={editUser?.bio || ""}
                          onChange={(e) =>
                            setEditUser({ ...editUser, bio: e.target.value })
                          }
                          required
                        ></textarea>
                      </fieldset>
                    </div>
                    <div className="info-social">
                      <h4 className="title-create-item">Your Social media</h4>
                      <fieldset>
                        <h4 className="title-infor-account">Facebook</h4>
                        <input
                          type="text"
                          placeholder="Facebook url"
                          value={editUser?.facebook || ""}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              facebook: e.target.value,
                            })
                          }
                          required
                        />
                        {editUser?.facebook && (
                          <Link to="#" className="connect">
                            <i className="fab fa-facebook"></i>Connect to face
                            book
                          </Link>
                        )}
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Twitter</h4>
                        <input
                          type="text"
                          placeholder="Twitter url"
                          value={editUser?.twitter || ""}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              twitter: e.target.value,
                            })
                          }
                          required
                        />
                        {editUser?.twitter && (
                          <Link to="#" className="connect">
                            <i className="fab fa-twitter"></i>Connect to Twitter
                          </Link>
                        )}
                      </fieldset>
                      <fieldset>
                        <h4 className="title-infor-account">Discord</h4>
                        <input
                          type="url"
                          placeholder="Discord url"
                          value={editUser?.discord || ""}
                          onChange={(e) =>
                            setEditUser({
                              ...editUser,
                              discord: e.target.value,
                            })
                          }
                          required
                        />
                        {editUser?.discord && (
                          <Link to="#" className="connect">
                            <i className="icon-fl-vt"></i>Connect to Discord
                          </Link>
                        )}
                      </fieldset>
                    </div>
                  </div>
                  <button
                    className="tf-button-submit mg-t-15"
                    type="submit"
                    onClick={(e) => onSubmit(e)}
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
