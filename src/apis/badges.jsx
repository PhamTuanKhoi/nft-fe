import axios from "axios";
const path = "badges/";

export const badgesAPI = {
  async get(filter = {}) {
    return await axios.get(`${path}?`, {
      params: filter,
    });
  },
};
