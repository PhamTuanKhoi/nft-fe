import axios from "axios";

export async function collections(filter) {
  return axios.get("collections/?", { params: filter });
}

export async function getAllWithoutQuery() {
  return axios.get("collections/all/collections");
}

export async function ranking() {
  return axios.get("collections/ranking");
}

export async function mockNft() {
  return await axios.get(`collections/nft`);
}
export async function totalPrice() {
  return await axios.get(`collections/price`);
}

export async function likes(id, userId) {
  return await axios.get("collections/likes/" + id + "/" + userId);
}

async function mockNftById(id) {
  return axios.get(`collections/nft/mining/` + id);
}

// export async function getbyidCate(id) {
//   return axios.get("collections/category/" + id);
// }

export async function view(id) {
  return axios.get("collections/" + id);
}

export async function getCollectionById(id) {
  return axios.get("collections/" + id);
}

export async function updateProfile(body, id) {
  return axios.patch("users/" + id, body);
}

export async function createCollection(payload) {
  return axios.post("collections", payload);
}
export async function collectionSales() {
  return axios.get("collections/sales");
}

export async function getByCreator(creatorId, chainId) {
  return axios.get(`collections/creator/${creatorId}/${chainId}`);
}

export async function getNfts(id) {
  return axios.get(`nfts/collection/${id}`);
}

export async function getSaleNfts(id) {
  return axios.get(`nfts/collection/sale/${id}`);
}

export const collectionAPI = {
  collections,
  view,
  updateProfile,
  ranking,
  // getbyidCate,
  mockNft,
  totalPrice,
  mockNftById,
  likes,
};
