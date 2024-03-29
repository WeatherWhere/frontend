import React from "react";
import styled from "styled-components";
import AddressIconText from "../common/AddressIconText";
import AirThreeSubData from "./AirThreeSubData";
import {
  ButtonWrap,
  StyledIcon,
} from "../weather/weatherShortMainNow/WeatherShortMainNow";

export default function AirRealTime({
  airRealtimeData,
  address,
  setNowOrMid,
  nowOrMid,
}) {
  const handleNowClick = () => {
    setNowOrMid(true);
  };

  const handleMidClick = () => {
    setNowOrMid(false);
  };

  return (
    <>
      {airRealtimeData ? (
        <Background pm10Grade={airRealtimeData.pm10Grade}>
          <AddressIconText address={address} />

          <Container marginTop="0.1rem" padding="0.1rem" height={"20%"}>
            <Text fontSize="6vh">
              {getPm10Grade(airRealtimeData.pm10Grade)[0]}
            </Text>
          </Container>

          <Text fontSize="2vh" padding="0.3rem" height={"10%"}>
            {getPm10Grade(airRealtimeData.pm10Grade)[1]}
          </Text>

          <Container height={"30%"}>
            <StyledIcon
              name={getPm10Grade(airRealtimeData.pm10Grade)[2]}
              size="23vh"
            />
          </Container>

          <AirThreeSubData airRealtimeData={airRealtimeData} />

          <ButtonWrap height={"5%"}>
            <Button
              color={
                nowOrMid
                  ? getPm10Grade(airRealtimeData.pm10Grade)[3]
                  : "#969696"
              }
              onClick={handleNowClick}
            >
              현재
            </Button>
            <Button
              color={
                nowOrMid
                  ? "#969696"
                  : getPm10Grade(airRealtimeData.pm10Grade)[3]
              }
              onClick={handleMidClick}
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

export const Button = styled.button`
  background-color: white;
  color: ${(props) => props.color};

  &:active {
    background: ${(props) => props.color};
  }
  font-size: 1.7vh;
  border-radius: 4px;
  border: none;
  margin: 0.2rem;
  height: 80%;
`;

const Background = styled.div`
  background-color: ${(props) => {
    const color = getPm10Grade(props.pm10Grade)[3];
    return color;
  }};

  flex-direction: column;
  height: 72%;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  padding: ${(props) => props.padding};
  padding-left: ${(props) => props.paddingLeft};
  height: ${(props) => props.height};
  flex-grow: 0.15;
`;

export const Text = styled(Container)`
  font-size: ${(props) => props.fontSize};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
`;

const getPm10Grade = (pm10Grade) => {
  switch (pm10Grade) {
    case 1:
      return [
        "좋음",
        "야외 활동하기 좋은 날씨네요!",
        "ri:emotion-happy-line",
        "#273BBC",
      ];
    case 2:
      return ["보통", "적당한 날이에요~", "ri:emotion-normal-line", "#179501"];
    case 3:
      return [
        "나쁨",
        "밖에 나가지 마세요!",
        "mdi:emoticon-dead-outline",
        "#6E6E6E",
      ];
    case 4:
      return [
        "매우 나쁨",
        "야외 활동을 삼가세요!",
        "mdi:emoticon-devil-outline",
        "#D65A5D",
      ];
    default:
      return ["알수없음", "", "", "#6E6E6E"];
  }
};
