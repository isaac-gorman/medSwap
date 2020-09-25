import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https:/medswap.herokuapp.com/api/",
    headers: {
      Authorization: token,
      "Access-Control-Allow-Origin": "*",
    },
  });
};
