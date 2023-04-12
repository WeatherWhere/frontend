import React, { useEffect, useState } from "react";
import { getWeatherShortMain } from "../../utils/lib/api";
import styled from "styled-components";
import { Icon } from '@iconify/react';
import GlobalStyle from "../../styles/fonts/fonts";
import AddressIconText from "./AddressIconText";
import ThreeSubData from "./ThreeSubData";
import axios from "axios";


const Background = styled.div`
background-color: #A4DCF2;
flex-direction: column;
height: 72%;
flex-wrap: wrap;
display: flex;
align-items: center;

`;


export const Container = styled.div`
display: flex;
align-items: center;
margin-top:${(props) => props.marginTop};
margin-bottom:${(props) => props.marginBottom};
padding:${(props) => props.padding}
padding-left:${(props) => props.paddingLeft}
height:10%;
flex-grow:1;
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
  padding:0.2rem;
  display: flex;
justify-content: center;
align-items: center;
`;



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
      {shortMainNowData ? (
        <>
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
          <Text fontSize="1rem" padding="0.5rem">어제보다 ?° 낮아요</Text>
          <Container padding="1rem">
            <StyledIcon name={getSkyStatu(shortMainNowData.sky)} size="14rem" />
          </Container>
          <ThreeSubData shortMainNowData={shortMainNowData} />

        </>

      ) :
        ((<Text>Loading...</Text>))
      }

    </Background>
  );
}