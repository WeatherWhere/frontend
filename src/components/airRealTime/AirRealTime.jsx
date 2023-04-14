import React, { useEffect, useState } from "react";
import { getAirRealtime } from "../../utils/lib/api";
import styled from "styled-components";
import GlobalStyle from "../../styles/fonts/fonts";
import axios from "axios";
import AddressIconText from "../common/AddressIconText";
import AirThreeSubData from "./AirThreeSubData";
import { StyledIcon } from "../weather/weatherShortMainNow/WeatherShortMainNow";

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
      return ["보통", "적당한 날에요~", "ri:emotion-normal-line", "#179501"];
    case 3:
      return ["나쁨", "밖에 나가지 마세요!", "mdi:emoticon-dead-outline", "#6E6E6E"];
    case 4:
      return ["매우 나쁨", "야외 활동을 삼가하세요!", "mdi:emoticon-devil-outline", "#D73C3F"];
    default:
      return ["알수없음", "", "", "#6E6E6E"];
  }
}


export default function AirRealTime() {

  const [airRealtimeData, setAirRealtimeData] = useState(null);

  const getAirRealtimeData = async (key, token) => {
    try {
      const data = await getAirRealtime(key);
      console.log("data.data" + data.data.data);
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