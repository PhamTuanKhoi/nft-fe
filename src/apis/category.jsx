import axios from "axios";

let path = "categories";
export const categoryAPI = {
  async mockNftById(filter = {}) {
    return axios.get(`${path}/nft/mining/?`, { params: filter });
  },

  async mockNft() {
    return await axios.get(`${path}/nft`);
  },

  async totalPrice() {
    return await axios.get(`${path}/price`);
  },

  async likes(id, userId) {
    return await axios.get(path + "/likes/" + id + "/" + userId);
  },
  //id collection
};
