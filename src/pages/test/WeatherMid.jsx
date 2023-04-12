import React, { useState } from "react";
import { getWeatherMidForecast } from "../../utils/lib/api";

export default function WeatherMid() {
  const mockRegionCode = "11B10101";
  const [midData, setMidData] = useState([]);

  const getMidData = async (key, token) => {
    try {
      const data = await getWeatherMidForecast(key);
      console.log(data);
      setMidData([...data.data]);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(midData);

  const handleGetAPI = () => {
    getMidData(`weather/forecast/week?regionCode=${mockRegionCode}`);
  };

  return (
    <div>
      <h1>WeatherMid API Check</h1>
      {/* <button onClick={handl}></button> */}
      <button onClick={handleGetAPI}>Call API</button>
      <div>
        {midData.map((value, index) => (
          <div key={index} style={{ margin: "30px" }}>
            <div>regionCode: {value.regionCode}</div>
            <div>예보날짜: {value.baseTime}</div>
            <div>오전 강수확률: {value.ram}</div>
            <div>오후 강수확률: {value.rpm}</div>
            <div>최저 기온: {value.tmn}</div>
            <div>최고 기온: {value.tmx}</div>
            <div>오전 날씨: {value.wam}</div>
            <div>오후 날씨: {value.wpm}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
