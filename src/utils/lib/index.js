import axios from "axios";

// header에 맞춰서 axios를 만들어줌
export const client = (token) => {
  let headers;

  if (token) {
    headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      Authorization: token,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }

  return axios.create({
    baseURL: "/",
    headers,
  });
};
