import { client } from ".";

export const getWeatherMidForecast = (key, token) => {
  return client(token).get(key);
};
