import axios from "axios";

// header에 맞춰서 axios를 만들어줌
export const client = (token) => {
  let headers;

  if (token) {
    headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
  } else {
    headers = {
      "Content-Type": "application/json",
    };
  }

  return axios.create({
    baseURL: "weather",
    headers,
  });
};
