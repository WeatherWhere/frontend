import React, { useEffect, useState } from "react";
import { getWeatherShortMain } from "../utils/lib/api";
import styled, { ThemeProvider } from "styled-components";
import { Icon } from '@iconify/react';
import PlaceOutlinedIcon from '@mui/icons-material';
import GlobalStyle from "../styles/fonts/fonts";

const Container = styled.div`
display: flex;
align-items: center;
margin-top:${(props) => props.marginTop};
padding:${(props) => props.padding}
padding-left:${(props) => props.paddingLeft}
height:10%;
`

const Background = styled.div`
background-color: #A4DCF2;
flex-direction: column;
height: 100vh;
flex-wrap: wrap;
display: flex;
align-items: center;

`;


const Text = styled(Container)`
font-size: ${(props) => props.fontSize};
color: white;
display: flex;
justify-content: center;
align-items: center;
padding:${(props) => props.padding};
margin-left:${(props) => props.marginLeft};
margin-right:${(props) => props.marginRight};

`;


//수평정렬
const IconContainer = styled(Container)`
`;

//최저 최고기온 수직정렬
const MinMaxText = styled.div`
color: white;
font-size: 1.1rem;
padding:${(props) => props.padding}


`;

//아이콘 컴포넌트
const StyledIcon = styled(Icon).attrs(props => ({
  icon: props.name,
  style: {
    fontSize: props.size,
  },
}))`
  /* 공통 스타일 요소 */
  color: white;
  padding:0.2rem;
  display: flex;
justify-content: center;
align-items: center;
`;

const Line = styled.div`
  border: 1px solid white;
  width: 2rem;
  transform: rotate(90deg);

`;


export default function WeatherShortMainNow() {
  const locationX = "37.489325";
  const locationY = "126.554234";
  const [shortMainNowData, setShortMainNowData] = useState(null);

  const getShortMainData = async (key, token) => {
    try {
      const data = await getWeatherShortMain(key);
      //console.log(data);
      setShortMainNowData(data.data.data);
      console.log(shortMainNowData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getShortMainData(`/weather/forecast/short/main/now?locationX=${locationX}&locationY=${locationY}`);
  }, []);

  const getSkyStatu = (sky) => {
    if (sky === 1) {
      return "wi:day-sunny";
    } else if (sky === 3) {
      return "ion:partly-sunny-outline";
    } else if (sky === 4) {
      return "fluent:weather-cloudy-20-regular";
    } else {
      return "약간 흐림";
    }
  }

  const getWsdStatus = (wsd) => {
    if (wsd < 4) {
      return "약함";
    } else if (wsd < 9) {
      return "약간 강함";
    } else if (wsd < 14) {
      return "강함";
    } else {
      return "매우 강함";
    }
  }


  return (
    <Background>
      <GlobalStyle />
      <Container marginTop="0.8rem" padding="1rem">
        <StyledIcon name="ri:map-pin-2-line" size="1.7rem" />
        <Text fontSize="1.4rem" padding="0.8rem">서초구 서초동</Text>
        <StyledIcon name="ic:baseline-search" size="1.7rem" />
      </Container>
      {shortMainNowData ? (
        <>
          <Container marginTop="0.1rem" padding="0.1rem">
            <Text fontSize="3.2rem" marginLeft="5rem" marginRight="auto">
              {shortMainNowData.tmp}°
              <MinMaxText>
                <IconContainer>
                  <StyledIcon name="ph:arrow-circle-up" size="1rem" />
                  {shortMainNowData.tmn}°
                </IconContainer>
                <IconContainer>
                  <StyledIcon name="ph:arrow-circle-down" size="1rem" />
                  {shortMainNowData.tmx}°
                </IconContainer>
              </MinMaxText>
            </Text>
          </Container>
          <Text fontSize="1rem" padding="0.5rem">어제보다 ?° 낮아요</Text>
          <Container padding="1rem">
            <StyledIcon name={getSkyStatu(shortMainNowData.sky)} size="14rem" />
          </Container>
          <Container padding="1rem">
            <MinMaxText padding="0.1rem">
              <StyledIcon name="iwwa:humidity" size="3rem" />
              <Text fontSize="1.1rem">{shortMainNowData.reh}%</Text>
            </MinMaxText>
            <Line />
            <MinMaxText padding="0.1rem">
              <StyledIcon name="wi:umbrella" size="3rem" />
              <Text fontSize="1.1rem">{shortMainNowData.pop}%</Text>
            </MinMaxText>
            <Line />
            <MinMaxText padding="0.1rem">
              <StyledIcon name="fluent:weather-squalls-20-regular" size="3rem" />
              <Text fontSize="1.1rem">{getWsdStatus(shortMainNowData.wsd)}</Text>
            </MinMaxText>
          </Container>
        </>

      ) :
        ((<div>Loading...</div>))
      }

    </Background>
  );
}