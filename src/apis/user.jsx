import axios from "axios";
const path = "users/";

export const updatePower = async (id, nft) => {
  return await axios.get(`users/power/${id}/${nft}`);
};

export const squad = async (filter = {}) => {
  return await axios.get(`users/squad`, { params: filter });
};

export const calculate = async () => {
  return await axios.get(`users/calculate`);
};

export const ownerNft = async (id) => {
  return await axios.get(`users/owner-nft/` + id);
};

export const squadPower = async (id) => {
  return await axios.get(`users/squad-power/` + id);
};

export const minedValue = async (id) => {
  return await axios.get(`users/mined-value/` + id);
};

export const getUserLike = async (id) => {
  return await axios.get(`users/likes/` + id);
};

export const getCoreTeam = async (id) => {
  return await axios.get(`users/coreteam/` + id);
};

export const getUserBadges = async (id) => {
  return await axios.get(`winers/user/` + id);
};

export const ranking = async (filter = {}) => {
  return await axios.get(`users/ranking/?`, { params: filter });
};

export const getUser = async (id, nft) => {
  return await axios.get(`users/`);
};

export const getUserById = async (id) => {
  console.log(id, "wdj");
  return await axios.get(`users/` + id);
};

export const update = async (id, payload) => {
  return await axios.patch(path + id, payload);
};

export const userAPI = {
  update,
  updatePower,
  getUser,
  ranking,
  getUserById,
  squad,
  calculate,
  minedValue,
  squadPower,
  squad,
  ownerNft,
};
