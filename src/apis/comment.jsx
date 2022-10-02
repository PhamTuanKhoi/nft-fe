import axios from "axios";
import { cleanObject } from '../helpers/cleanObject';

const path = "/comments/";

const getByNft = async (nftId, filter = {}) => {
    let searchParams = new URLSearchParams(cleanObject(filter));
    return await axios.get(path + "nft/" + nftId + "?" + searchParams.toString());
}

const create = async (comment) => await axios.post(path, comment);

export const CommentAPI = {
    getByNft,
    create
}