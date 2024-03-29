import { client } from ".";

export const getWeatherMidForecast = (key, token) => {
  return client(token).get(key);
};

export const getWeatherShortMain = (key, token) => {
  return client(token).get(key);
};

export const getAirRealtime = (key, token) => {
  return client(token).get(key);
};

export const getAirForecast = (key, token) => {
  return client(token).get(key);
};

export const getTourInfo = (key, token) => {
  return client(token).get(key);
};
