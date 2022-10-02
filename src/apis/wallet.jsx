import axios from "axios";

async function loginBySign(address) {
  return axios.post("auth/wallet_login", {
    address,
  });
}

async function getNonce(address) {
  return axios.post("users/nonce", {
    address,
  });
}

async function getMe() {
  return axios.post("auth/me");
}

async function profile(id) {
  return axios.get("users/" + id);
}

async function users(page, size) {
  return axios.get("users", {
    params: {
      page,
      size,
    },
  });
}

async function updateProfile(id, body) {
  return axios.patch("users/" + id, body);
}


const walletAPI = {
  users,
  getNonce,
  loginBySign,
  getMe,
  profile,
  updateProfile,
};

export default walletAPI;
