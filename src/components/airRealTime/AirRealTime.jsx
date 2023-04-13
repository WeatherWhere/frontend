import React, { useEffect, useState } from "react";
import { getAirRealtime } from "../../utils/lib/api";
import styled from "styled-components";
import { Icon } from '@iconify/react';
import GlobalStyle from "../../styles/fonts/fonts";
import axios from "axios";
import AddressIconText from "../weatherShortMainNow/AddressIconText";
import AirThreeSubData from "./AirThreeSubData";
import { StyledIcon } from "../weatherShortMainNow/WeatherShortMainNow";


const Background = styled.div`
background-color: #9B9B9B;
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


export default function AirRealTime() {

  const [airRealtimeData, setAirRealtimeData] = useState(null);

  const getAirRealtimeData = async (key, token) => {
    try {
      const data = await getAirRealtime(key);
      console.log("data.data"+ data.data);
      setAirRealtimeData(data.data.data[0]);
    } catch (e) {
      console.log(e);
    }
  };


  //현재 위경도 state
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });


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

  const x = "133";
  const y = "12";

  useEffect(() => {
    //사용자의 현재 위치 받아오기
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getAirRealtimeData(`/air/realtime/data?x=${position.coords.longitude}&y=${position.coords.latitude}`);
        kakaoAddress2(position.coords);
      },
      (error) => {
        console.log(error);
      }
    );

  }, []);


  const getPm10Grade = (pm10Grade) => {

    switch(pm10Grade){
      case 1:
        return ["좋음", "야외 활동하기 좋은 날씨네요!"];
      case 2:
        return ["보통", "적당한 날에요~"];
      case 3:
        return ["나쁨","밖에 나가지 마세요!"];
      case 4:
        return ["매우 나쁨", "야외 활동을 삼가하세요!"];
      default:
        return "알수없음";
    }

}


  return (
    <Background>
      <GlobalStyle />
      {airRealtimeData ? (
        <>
          <AddressIconText address={address} />
          <Container marginTop="0.1rem" padding="0.1rem">
            <Text fontSize="2.4rem">
            {getPm10Grade(airRealtimeData.pm10Grade)[0]}
            </Text>
          </Container>
          <Text fontSize="1rem" padding="0.5rem">{getPm10Grade(airRealtimeData.pm10Grade)[1]}</Text>
          <Container padding="1rem">
            <StyledIcon name="fluent:weather-cloudy-20-regular" size="14rem" />
          </Container>
          <AirThreeSubData airRealtimeData={airRealtimeData} />

        </>

      ) :
        ((<Text>Loading...</Text>))
      }

    </Background>
  );
}