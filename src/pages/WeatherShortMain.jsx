import React, { useState } from "react";
import { getWeatherShortMain } from "../utils/lib/api";

export default function WeatherShortMain() {
  const locationX = "35.41531388888889";
  const locationY = "129.06666666666666";
  const [shortMainData, setShortMainData] = useState([]);

  const getShortMainData = async (key, token) => {
    try {
      const data = await getWeatherShortMain(key);
      console.log(data);
      setShortMainData([...data.data]);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(shortMainData);

  const handleGetAPI = () => {
    getShortMainData(`/weather/forecast/short/main?locationX=${locationX}&locationY=${locationY}`);
  };

  return (
    <div>
      <h1>WeatherShortMain API Check</h1>
      {/* <button onClick={handl}></button> */}
      <button onClick={handleGetAPI}>Call API</button>
      <div>
        {shortMainData.map((value, index) => (
          <div key={index} style={{ margin: "30px" }}>
            <div>fcstDateTime: {value.fcstDateTime}</div>
            <div>강수확률: {value.pop}</div>
            <div>강수형태: {value.pty}</div>
            <div>하늘상태: {value.sky}</div>
            <div>기온: {value.tmp}</div>
            <div>풍속: {value.wsd}</div>
            <div>습도: {value.reh}</div>
            <div>최저 기온: {value.tmn}</div>
            <div>최고 기온: {value.tmx}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
