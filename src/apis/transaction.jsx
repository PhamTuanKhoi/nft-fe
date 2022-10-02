import axios from 'axios';
import { cleanObject } from '../helpers/cleanObject';

export async function activity(page, limit, filter = {}) {
  return axios.get("transaction/activity", {
    params: {
      page,
      limit,
      ...filter
    }
  });
}

export async function ranking(page, size, time) {
  return axios.get("transaction/ranking", {
    params: {
      page,
      size,
      time
    }
  });
}

export async function getProblem() {
  return await axios.get(`problem-categorys/`)
}

export const rankingByUser = async (filter = {}) => {
  let searchParams = new URLSearchParams(cleanObject(filter));
  return await axios.get("transaction/ranking/user?" + searchParams.toString())
};

export async function createCollection(payload) {
  return axios.post("collections", payload);
}

export async function getByCreator(creatorId) {
  return axios.get(`collections/creator/${creatorId}`);
}

export async function getById(id) {
  return axios.get(`collections/${id}`);
}

export async function getNfts(id) {
  return axios.get(`nfts/collection/${id}`);
}

export async function getSaleNfts(id) {
  return axios.get(`nfts/collection/sale/${id}`);
}

export const transactionAPI = {
  activity,
}
