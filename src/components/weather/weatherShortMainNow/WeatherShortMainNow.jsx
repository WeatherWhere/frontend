import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import ThreeSubData from "./ThreeSubData";
import axios from "axios";

import AddressIconText from "../../common/AddressIconText";
import { Button } from "../../airRealTime/AirRealTime";

export default function WeatherShortMainNow({
  location,
  setNowOrMid,
  address,
  nowOrMid,
}) {
  const handleNowClick = () => {
    setNowOrMid(true);
  };

  const handleMidClick = () => {
    setNowOrMid(false);
  };

  const [shortMainNowData, setShortMainNowData] = useState(null);

  const minusTmx = () => {
    const minusTmx = shortMainNowData.tmx - shortMainNowData.beforeTmx;
    if (minusTmx > 0) {
      return "어제보다 " + minusTmx + "° 높아요!";
    } else if (minusTmx === 0) {
      return "어제와 기온이 같아요!";
    } else if (minusTmx < 0) {
      return "어제보다 " + Math.abs(minusTmx) + "° 낮아요!";
    } else {
      return "정보가 없습니다!";
    }
  };

  //메인 (현재 시간) 받아올 api
  const getShortMainData = useCallback(async (key, token) => {
    try {
      const response = await axios.get(key);
      setShortMainNowData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getShortMainData(
        `${process.env.REACT_APP_BASE_URL}/weather/forecast/short/main/now?locationX=${location.latitude}&locationY=${location.longitude}`
      );
    }
  }, [location.latitude, location.longitude, getShortMainData]);

  return (
    <>
      {shortMainNowData ? (
        <Background sky={shortMainNowData.sky} pty={shortMainNowData.pty}>
          <AddressIconText address={address} />

          <Container marginTop="0.1rem" padding="0.1rem" height={"20%"}>
            <Text fontSize="3.2rem" marginLeft="5rem" marginRight="auto">
              {shortMainNowData.tmp}°
            </Text>
            <MinMaxText>
              <IconContainer>
                <StyledIcon name="ph:arrow-circle-up" size="1rem" />
                {shortMainNowData.tmx}°
              </IconContainer>
              <IconContainer>
                <StyledIcon name="ph:arrow-circle-down" size="1rem" />
                {shortMainNowData.tmn}°
              </IconContainer>
            </MinMaxText>
          </Container>
          <Text fontSize="1rem" height={"10%"}>
            {minusTmx()}
          </Text>
          <Container height={"30%"}>
            <StyledIcon
              name={getSkyStatus(shortMainNowData.sky, shortMainNowData.pty)[0]}
              size="28vh"
            />
          </Container>
          <ThreeSubData value={shortMainNowData} />
          <ButtonWrap height={"10%"}>
            <Button
              onClick={handleNowClick}
              color={
                nowOrMid
                  ? getSkyStatus(shortMainNowData.sky, shortMainNowData.pty)[1]
                  : "#969696"
              }
            >
              하루
            </Button>
            <Button
              onClick={handleMidClick}
              color={
                nowOrMid
                  ? "#969696"
                  : getSkyStatus(shortMainNowData.sky, shortMainNowData.pty)[1]
              }
            >
              주간
            </Button>
          </ButtonWrap>
        </Background>
      ) : (
        <Background>
          <Text>Loading...</Text>
        </Background>
      )}
    </>
  );
}

const Background = styled.div`
  background-color: ${(props) => {
    const color = getSkyStatus(props.sky, props.pty)[1];
    return color;
  }};
  flex-direction: column;
  height: 72%;
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  padding: ${(props) => props.paddingLeft};
  padding-left: ${(props) => props.paddingLeft};
  height: ${(props) => props.height};
  margin: auto 0;
`;

export const ButtonWrap = styled.div`
  display: flex;
  height: ${(props) => props.height};
  align-items: center;
  width: 100%;
  /* position: absolute; */
  /* left: 0; */
  /* bottom: 28%; */
  /* z-index: 100; */
`;

export const Text = styled(Container)`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color || "white"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  height: ${(props) => props.height};
`;

//수평정렬
const IconContainer = styled(Container)``;

//최저 최고기온 수직정렬
export const MinMaxText = styled.div`
  color: white;
  font-size: 1.1rem;
  padding: ${(props) => props.padding};
`;

//아이콘 컴포넌트
export const StyledIcon = styled(Icon).attrs((props) => ({
  icon: props.name,
  style: {
    fontSize: props.size,
  },
}))`
  /* 공통 스타일 요소 */
  color: white;
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const getSkyStatus = (sky, pty) => {
  //강수상태가 0인 경우
  if (pty === 0) {
    switch (sky) {
      case 1:
        //맑음(이모티콘명, 배경색, 이모티콘색)
        return ["wi:day-sunny", "#A4DCF2", "#FFCD9F"];
      case 3:
        //구름 많음
        return [
          "fluent:weather-partly-cloudy-day-20-regular",
          "#9eb5c5",
          "#FFCD9F",
        ];
      default:
        //흐림
        return ["fluent:weather-cloudy-20-regular", "#7d8da8", "#D9D9D9"];
    }

    //강수상태가 있을 경우
  } else {
    switch (pty) {
      case 1:
        //비
        return ["fluent:weather-drizzle-20-regular", "#b7bfc6", "#A4DCF2"];
      case 2:
        //비/눈
        return ["fluent:weather-rain-snow-20-regular", "#94a8b8", "#A4DCF2"];
      case 3:
        //눈
        return ["fluent:weather-snow-20-regular", "#d9e3ec", "#A4DCF2"];
      case 4:
        //소나기
        return ["fluent:weather-drizzle-20-regular", "#b7bfc6", "#A4DCF2"];
      default:
        return ["fluent:weather-drizzle-20-regular", "#A4DCF2", "#A4DCF2"];
    }
  }
};
