import axios from "axios";
const path = "winers/";

export const winerAPI = {
  async create(payload) {
    return await axios.post(path, payload);
  },
};
