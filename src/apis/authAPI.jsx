import axios from "axios";
const path = "auths/";

export const authAPI = {
  async me() {
    return await axios.post(path + "me");
  },
};
