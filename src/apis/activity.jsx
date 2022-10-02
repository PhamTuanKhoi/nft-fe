import axios from 'axios';

export async function activity(page, size) {
  return axios.get("activities", {
    params: {
      page,
      size,
    }
  });
}

export async function ranking(time) {
  return axios.get("activities/ranking", {
    params: {
      time
    }
  });
}
  
export const activityAPI = {
  activity,
  ranking
}
