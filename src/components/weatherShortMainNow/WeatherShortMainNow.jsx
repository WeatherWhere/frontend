import React, { useEffect, useState } from "react";
import { getWeatherShortMain } from "../../utils/lib/api";
import styled from "styled-components";
import { Icon } from '@iconify/react';
import GlobalStyle from "../../styles/fonts/fonts";
import AddressIconText from "./AddressIconText";
import ThreeSubData from "./ThreeSubData";
import useGeolocation from "react-hook-geolocation";
import axios from "axios";

export const Container = styled.div`
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


//수평정렬
const IconContainer = styled(Container)`
`;

//최저 최고기온 수직정렬
export const MinMaxText = styled.div`
color: white;
font-size: 1.1rem;
padding:${(props) => props.padding}


`;

//아이콘 컴포넌트
export const StyledIcon = styled(Icon).attrs(props => ({
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



export default function WeatherShortMainNow() {
  const locationX = "37.489325";
  const locationY = "126.554234";

  const [shortMainNowData, setShortMainNowData] = useState(null);

  const location = useGeolocation();

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

  const [region, setRegion] = useState(null);
  const [city, setCity] = useState(null);

  const kakaoAddress = () => {
    if(location.latitude && location.longitude){
      //kakao REST API에 get 요청을 보낸다.
      //파라미터 x,y에 lon,lat을 넣어주고 API_KEY를 Authorization헤더에 넣어준다.
      axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${location.latitude}&y=${location.longitude}&input_coord=WGS84`
          , { headers: { Authorization: `KakaoAK ddf617232a0fd602e925eb2a96c61c74` } }
      )
          .then(res => {
            console.log("뜨냐?")
              console.log(res.data.documents)
              setRegion(res.data.documents.address);
              // setCity(res.data.documents.region_2depth_name);
          }
          ).catch(e => console.log(e))
        }
  }


  useEffect(() => {
    getShortMainData(`/weather/forecast/short/main/now?locationX=${locationX}&locationY=${locationY}`);
    kakaoAddress();
  }, [location]);

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


  return (
    <Background>
      <GlobalStyle />
      <AddressIconText latitude={location.latitude} longitude={location.longitude}/>
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
          <Text fontSize="1rem" padding="0.5rem">어제보다 ?° 낮아요 {region}</Text>
          <Container padding="1rem">
            <StyledIcon name={getSkyStatu(shortMainNowData.sky)} size="14rem" />
          </Container>
          <ThreeSubData shortMainNowData={shortMainNowData}/>

        </>

      ) :
        ((<div>Loading...</div>))
      }

    </Background>
  );
}