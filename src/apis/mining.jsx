import axios from "axios";
const path = "minings/";

export const miningAPI = {
    async get(filter) {
        return await axios.get(`${path}?`, {
            params: filter,
        });
    },
    async create(payload) {
        return await axios.post(path, payload);
    },
    async remove(id) {
        return await axios.delete(path + id);
    },
    async view(id) {
        return await axios.get(path + id);
    },
    async viewLevel(level) {
        return await axios.get(`${path}level/` + level);
    },
    async update(id, payload) {
        return await axios.patch(path + id, payload);
    },
};
