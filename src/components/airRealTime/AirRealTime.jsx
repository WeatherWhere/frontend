import React from "react";
import styled from "styled-components";
import GlobalStyle from "../../styles/fonts/fonts";
import AddressIconText from "../common/AddressIconText";
import AirThreeSubData from "./AirThreeSubData";
import { Button, ButtonWrap, StyledIcon } from "../weather/weatherShortMainNow/WeatherShortMainNow";

const Background = styled.div`
  background-color: ${(props) => {
      const color = getPm10Grade(props.pm10Grade)[3];
      return color;
    }};

  flex-direction: column;
  height: 66%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  border-radius: 10px;

`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top:${(props) => props.marginTop};
  margin-bottom:${(props) => props.marginBottom};
  padding:${(props) => props.padding}
  padding-left:${(props) => props.paddingLeft}
  height:10%;
  flex-grow:0.15;
`

export const Text = styled(Container)`
  font-size: ${(props) => props.fontSize};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:${(props) => props.padding};
  margin-left:${(props) => props.marginLeft};
  margin-right:${(props) => props.marginRight};
`;



const getPm10Grade = (pm10Grade) => {

  switch (pm10Grade) {
    case 1:
      return ["좋음", "야외 활동하기 좋은 날씨네요!", "ri:emotion-happy-line", "#273BBC"];
    case 2:
      return ["보통", "적당한 날이에요~", "ri:emotion-normal-line", "#179501"];
    case 3:
      return ["나쁨", "밖에 나가지 마세요!", "mdi:emoticon-dead-outline", "#6E6E6E"];
    case 4:
      return ["매우 나쁨", "야외 활동을 삼가세요!", "mdi:emoticon-devil-outline", "#D65A5D"];
    default:
      return ["알수없음", "", "", "#6E6E6E"];
  }
}


export default function AirRealTime({airRealtimeData, address, setNowOrMid}) {


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
          <GlobalStyle />
          <AddressIconText address={address} />
          <Container marginTop="0.1rem" padding="0.1rem">
            <Text fontSize="2.4rem">
              {getPm10Grade(airRealtimeData.pm10Grade)[0]}
            </Text>
          </Container>
          <Text fontSize="1rem" padding="0.5rem">{getPm10Grade(airRealtimeData.pm10Grade)[1]}</Text>
          <Container padding="1rem">
            <StyledIcon name={getPm10Grade(airRealtimeData.pm10Grade)[2]} size="12rem" />
          </Container>
          <AirThreeSubData airRealtimeData={airRealtimeData} />
          <ButtonWrap>
            <Button onClick={handleNowClick}>현재</Button>
            <Button onClick={handleMidClick}>주간</Button>
          </ButtonWrap>
        </Background>

      ) :
        <Background>
          <GlobalStyle />
          <Text>Loading...</Text>
        </Background>
      }

    </>
  );
}