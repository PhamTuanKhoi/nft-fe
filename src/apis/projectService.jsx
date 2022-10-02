import axios from "axios";

// export async function loadItemMiningpage() {
//     return await axios.get(`/projects/paging`);
// }
export async function loadItemMiningpage(filter) {
  return await axios.get(`/projects/paging?`, { params: filter });
}

export async function projectMined(id) {
  return await axios.get(`/projects/detail/` + id);
}

export async function viewers(id) {
  return await axios.get(`/projects/viewer/` + id);
}

export async function loadDetailItem(id) {
  return await axios.get(`/projects/` + id);
}

export async function projectsUserLike(id) {
  return await axios.get("projects/mine-value/" + id);
}

export async function likeProject(id, idNft, payload) {
  return axios.post("projects/likeProject/" + id + "/" + idNft, payload);
}

export async function updatePower(id, payload) {
  return await axios.patch("projects/vote/" + id, payload);
}
