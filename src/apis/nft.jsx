import axios from "axios";
const path = "nfts/";

export const getNfts = async (filter) => {
  return await axios.get(`nfts?`, {
    params: filter,
  });
};

export const getAllNftWithoutQuery = async () => {
  return await axios.get(`${path}all/nfts`);
};
export const create = async (payload) => {
  return await axios.post(path, payload);
};
export const likes = async (id, userId) => {
  return await axios.get(path + "likes/" + id + "/" + userId);
};
export const viewer = async (id) => {
  return await axios.get(path + "viewer/" + id);
};
export const remove = async (id) => {
  return await axios.delete(path + id);
};
export const view = async (id) => {
  return await axios.get(path + id);
};
export const update = async (id, payload) => {
  return await axios.patch(path + id, payload);
};
export const minted = async (id, tokenId) => {
  return await axios.patch(`${path + id}/minted`, { tokenId });
};

export const nftAPI = {
  create,
  getNfts,
  minted,
  remove,
  update,
  view,
  viewer,
  likes,
};
