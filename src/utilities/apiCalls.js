import axios from "axios";

const URL = "http://localhost:7000/players/";

export const postData = async (player) => {
  const resp = await axios.post(`${URL}add`, player);
  return resp.data;
};

export const getPlayerByName = async (player) => {
  const resp = await axios.get(`${URL}${player}`);
  return resp.data;
};
