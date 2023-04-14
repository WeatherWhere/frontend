import React, { useEffect, useState } from "react";
import { getWeatherShortMain } from "../../utils/lib/api";

export default function WeatherShortMain() {
  const locationX = "37.489325";
  const locationY = "126.554234";
  const [shortMainData, setShortMainData] = useState([]);

  const getShortMainData = async (key, token) => {
    try {
      const response = await getWeatherShortMain(key);
      if(response.data.resultCode === 200){
      const data = response.data.data;
      setShortMainData([...data]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{
    getShortMainData(`/weather/forecast/short/main?locationX=${locationX}&locationY=${locationY}`);
  },[]);
  
  const getSkyStatu = (sky)=>{
    if (sky === 1) {
      return "맑음";
    } else if (sky === 3) {
      return "구름 많음";
    } else if (sky === 4) {
      return "흐림";
    } else {
      return "약간 흐림";
    }
  }

  const getWsdStatus = (wsd) => {
    if(wsd < 4){
      return "약함";
    }else if(wsd < 9){
      return "약간 강함";
    }else if(wsd < 14){
      return "강함";
    }else{
      return "매우 강함";
    }
  }


  return (
    <div>
      <h1>12시간 단기예보</h1>
      <div>
        {shortMainData.map((value, index) => (
          <div key={index} style={{ margin: "30px" }}>
            <div>fcstDateTime: {value.fcstDateTime}</div>
            <div>강수확률: {value.pop}</div>
            <div>강수형태: {value.pty}</div>
            <div>하늘상태: {getSkyStatu(value.sky)}</div>
            <div>기온: {value.tmp}</div>
            <div>풍속: {getWsdStatus(value.wsd)}</div>
            <div>습도: {value.reh}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
