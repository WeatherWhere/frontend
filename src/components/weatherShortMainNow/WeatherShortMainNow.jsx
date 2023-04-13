import React, { useEffect, useState } from "react";
import { getWeatherShortMain } from "../../utils/lib/api";
import styled from "styled-components";
import { Icon } from '@iconify/react';
import GlobalStyle from "../../styles/fonts/fonts";
import AddressIconText from "../common/AddressIconText";
import ThreeSubData from "./ThreeSubData";
import axios from "axios";


const Background = styled.div`
background-color: ${(props) => {
    const color = getSkyStatus(props.sky, props.pty = 0)[1];
    return color;
  }};

flex-direction: column;
height: 66%;
flex-wrap: wrap;
display: flex;
align-items: center;

`;


export const Container = styled.div`
display: flex;
align-items: center;
margin-top:${(props) => props.marginTop};
margin-bottom:${(props) => props.marginBottom};
padding:${(props) => props.paddingLeft};
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
  padding:0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const getSkyStatus = (sky, pty) => {
  //강수상태가 0인 경우
  if (pty === 0) {

    switch (sky) {
      case 1:
        //맑음
        return ["wi:day-sunny", "#A4DCF2"];
      case 3:
        //구름 많음
        return ["ion:partly-sunny-outline", "#9eb5c5"];
      default:
        //흐림
        return ["fluent:weather-cloudy-20-regular", "#7d8da8"];
    }

    //강수상태가 있을 경우
  } else {

    switch (pty) {
      case 1:
        //비
        return ["fluent:weather-drizzle-20-regular", "#b7bfc6"];
      case 2:
        //비/눈
        return ["fluent:weather-rain-snow-20-regular", "#94a8b8"]
      case 3:
        //눈
        return ["fluent:weather-snow-20-regular", "#d9e3ec"]
      default:
        //소나기
        return ["fluent:weather-drizzle-20-regular", "#b7bfc6"]
    }

  }
}

export default function WeatherShortMainNow() {

  const [shortMainNowData, setShortMainNowData] = useState(null);

  //현재 위경도 state
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  //메인 (현재 시간) 받아올 api
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

  const apiKey = 'ddf617232a0fd602e925eb2a96c61c74';
  //주소 저장할 state
  const [address, setAddress] = useState({
    region2: "",
    region3: ""
  })

  //위경도 -> 행정동 주소로 바꾸는 카카오 api
  const kakaoAddress2 = async (location) => {
    const apiUrl = 'https://dapi.kakao.com/v2/local/geo/coord2address.json';
    const params = {
      x: location.longitude,
      y: location.latitude,
      input_coord: "WGS84"
    };
    const headers = {
      Authorization: `KakaoAK ${apiKey}`
    };
    if (location.latitude && location.longitude) {
      const res = await axios.get(apiUrl, { params, headers })
        .then((res) => {
          console.log(res.data.documents[0].address.region_2depth_name);
          setAddress({
            region2: res.data.documents[0].address.region_2depth_name,
            region3: res.data.documents[0].address.region_3depth_name
          })
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }


  useEffect(() => {
    //사용자의 현재 위치 받아오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getShortMainData(`/weather/forecast/short/main/now?locationX=${position.coords.latitude}&locationY=${position.coords.longitude}`);
        kakaoAddress2(position.coords);
      },
      (error) => {
        console.log(error);
      }
    );

  }, []);




  return (
    <>

      {shortMainNowData ? (
        <Background sky={shortMainNowData.sky} pty={shortMainNowData.pty}>
          <GlobalStyle />
          <AddressIconText address={address} />

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
          <Text fontSize="1rem">어제보다 ?° 낮아요</Text>
          <Container>
            <StyledIcon name={getSkyStatus(shortMainNowData.sky, shortMainNowData.pty)[0]} size="14rem" />
          </Container>
          <ThreeSubData value={shortMainNowData} />
        </Background>


      ) :
        (
        <Background>
          <GlobalStyle />
          <Text>Loading...</Text>
        </Background>
        )
      }
    </>

  );
}