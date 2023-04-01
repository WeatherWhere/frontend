import React, { useState } from "react";
import { getAirRealtime } from "../utils/lib/api";

export default function AirRealtime() {
  const locationX = 133;
  const locationY = 12;

  const [airRealtimeData, setAirRealtimeData] = useState([]);

  const getAirRealtimeData = async (key, token) => {
    try {
      const data = await getAirRealtime(key);
      console.log(data);
      setAirRealtimeData([data.data]);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(airRealtimeData);

  const handleGetAPI = () => {
    getAirRealtimeData(`/air/realtime/data?x=${locationX}&y=${locationY}`);
  };

  return (
    <div>
      <h1>AirRealtime API Check</h1>
      {/* <button onClick={handl}></button> */}
      <button onClick={handleGetAPI}>Call API</button>
      <div>
        {airRealtimeData.map((value, index) => (
          <div key={index} style={{ margin: "30px" }}>
            <div>측정소: {value.stationName}</div>
            <div>측정일: {value.dataTime}</div>
            <div>이황산가스 지수: {value.so2Grade}</div>
            <div>이황산가스 농도: {value.so2Value}</div>
            <div>통합대기환경지수: {value.khaiGrade}</div>
            <div>통합대기환경수치: {value.khaiValue}</div>
            <div>일산화탄소 지수: {value.coGrade}</div>
            <div>일산화탄소 농도: {value.coValue}</div>
            <div>오존 지수: {value.o3Grade}</div>
            <div>오존 농도: {value.o3Value}</div>
            <div>이산화질소 지수: {value.no2Grade}</div>
            <div>이산화질소 농도: {value.no2Value}</div>
            <div>미세먼지(PM10) 24시간 등급: {value.pm10Grade}</div>
            <div>미세먼지(PM10) 농도: {value.pm10Value}</div>
            <div>미세먼지(PM2.5) 24시간 등급: {value.pm25Grade}</div>
            <div>미세먼지(PM2.5) 농도: {value.pm25Value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
