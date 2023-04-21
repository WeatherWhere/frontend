import React from "react";
import styled from "styled-components";
import AirRealTime from "../components/airRealTime/AirRealTime";
import { useState } from "react";
import { getAirRealtime } from "../utils/lib/api";
import { useCallback } from "react";
import { useEffect } from "react";
import AirSubBottom from "../components/airRealTime/AirSubBottom";
import axios from "axios";
import AirMidBottom from "../components/airRealTime/AirMidBottom";

const PageWrap = styled.div`
  height: 100vh;
`;

export default function AirPage({ location }) {
  const [nowOrMid, setNowOrMid] = useState(true);
  const [airRealtimeData, setAirRealtimeData] = useState(null);

  const getAirRealtimeData = useCallback(async (key, token) => {
    try {
      const data = await getAirRealtime(key);
      setAirRealtimeData(data.data.data[0]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const apiKey = "ddf617232a0fd602e925eb2a96c61c74";
  //주소 저장할 state
  const [address, setAddress] = useState({
    address_name: "",
    region2: "",
    region3: "",
  });

  //위경도 -> 행정동 주소로 바꾸는 카카오 api
  const kakaoAddress2 = async (location) => {
    const apiUrl = "https://dapi.kakao.com/v2/local/geo/coord2address.json";
    const params = {
      x: location.longitude,
      y: location.latitude,
      input_coord: "WGS84",
    };
    const headers = {
      Authorization: `KakaoAK ${apiKey}`,
    };
    if (location.latitude && location.longitude) {
      await axios
        .get(apiUrl, { params, headers })
        .then((res) => {
          setAddress({
            address_name: res.data.documents[0].address.address_name,
            region2: res.data.documents[0].address.region_2depth_name,
            region3: res.data.documents[0].address.region_3depth_name,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getAirRealtimeData(
        `${process.env.REACT_APP_BASE_URL}/air/realtime/data?x=${location.longitude}&y=${location.latitude}`
      );
      kakaoAddress2({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [location.latitude, location.longitude, getAirRealtimeData]);

  return (
    <PageWrap>
      <AirRealTime
        location={location}
        airRealtimeData={airRealtimeData}
        address={address}
        setNowOrMid={setNowOrMid}
        nowOrMid={nowOrMid}
      />

      {nowOrMid ? (
        <AirSubBottom location={location} airRealtimeData={airRealtimeData} />
      ) : (
        <AirMidBottom location={location} address={address} />
      )}
    </PageWrap>
  );
}
