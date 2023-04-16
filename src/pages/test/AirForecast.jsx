import React, { useState } from "react";
import { getAirForecast } from "../../utils/lib/api";

export default function AirForecast() {
  const date = "2023-03-30";
  const [airForecastData, setAirforecastData] = useState([]);

  const getAirForecastData = async (key, token) => {
    try {
      const data = await getAirForecast(key);
      console.log(data);
      setAirforecastData([...data.data]);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(airForecastData);

  const handleGetAPI = () => {
    // getAirForecastData(`air/forecast/data?city=${city}&baseDate=${baseDate}`);
  };

  return (
    <div>
      <h1>AirForecast API Check</h1>
      {/* <button onClick={handl}></button> */}
      <button onClick={handleGetAPI}>Call API</button>
      <div>
        {airForecastData.map((value, index) => (
          <div key={index} style={{ margin: "30px" }}>
            <div>예보날짜: {value.baseDate}</div>
            <div>지역: {value.city}</div>
            <div>예보 정보: {value.forecast}</div>
            <div>신뢰도: {value.reliability}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
