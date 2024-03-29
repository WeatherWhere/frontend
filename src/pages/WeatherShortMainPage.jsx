import React, { useEffect } from "react";
import styled from "styled-components";
import WeatherShortMainNow from "../components/weather/weatherShortMainNow/WeatherShortMainNow";
import WeatherShortMainAll from "../components/weather/weatherShortMainAll/WeatherShortMainAll";
import WeatherMidMainAll from "../components/weather/WeatherMidMainAll";
import { useState } from "react";
import axios from "axios";

export const PageWrap = styled.section`
  height: calc(var(--vh, 1vh) * 100 - 3.6rem);
  width: calc(var(--vw, 1vh) * 100);
  position: relative;
`;

export default function WeatherShortMainPage() {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const [nowOrMid, setNowOrMid] = useState(true);

  const apiKey = "ddf617232a0fd602e925eb2a96c61c74";

  //주소 저장할 state
  const [address, setAddress] = useState({
    region1: "",
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
            region1: res.data.documents[0].address.region_1depth_name,
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
      kakaoAddress2({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    }
  }, [location.latitude, location.longitude]);

  return (
    <PageWrap>
      <WeatherShortMainNow
        location={location}
        setNowOrMid={setNowOrMid}
        nowOrMid={nowOrMid}
        address={address}
      />
      {nowOrMid ? (
        <WeatherShortMainAll location={location} />
      ) : (
        <WeatherMidMainAll location={location} address={address} />
      )}
    </PageWrap>
  );
}
