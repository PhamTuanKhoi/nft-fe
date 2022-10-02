import axios from "axios";

export async function getHistory(filter = {}) {
  return await axios.get(`histories`, { params: filter });
}

export async function createHistory(payload) {
  return axios.post("histories", payload);
}
