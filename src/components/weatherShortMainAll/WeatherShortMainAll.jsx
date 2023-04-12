import styled from "styled-components";
import { useEffect, useState } from "react";
import { getWeatherShortMain } from "../../utils/lib/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import GlobalStyle from "../../styles/fonts/fonts";



const Background = styled.div`
background-color: #FFFFF;
flex-direction: column;
height: 20%;
flex-wrap: wrap;
display: flex;
align-items: center;
overflow-y: scroll;

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChartContainer = styled.div`
  display: flex;
  height: 10%;
  margin-top: 50px;
`;


export default function WeatherShortMainAll() {


    const [shortMainData, setShortMainData] = useState([]);

    const data = shortMainData.map((value, index) => ({
        fcstDateTime: value.fcstDateTime,
        pop: value.pop,
        pty: value.pty,
        sky: value.sky,
        tmp: value.tmp,
        wsd: value.wsd,
        reh: value.reh,
      }));


    //현재 위경도 state
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
    });



    const getShortMainData = async (key, token) => {
        await getWeatherShortMain(key).then((res) => {
            if (res.data.statusCode === 200) {
                const data = res.data.data;
                setShortMainData([...data]);
            }
        }).catch((e) => {
            console.log(e);
        });

    };



    console.log(shortMainData)
    useEffect(() => {
        //사용자의 현재 위치 받아오기
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                getShortMainData(`/weather/forecast/short/main?locationX=${position.coords.latitude}&locationY=${position.coords.longitude}`);
            },
            (error) => {
                console.log(error);
            }
        );

    }, []);


    const getSkyStatu = (sky) => {
        if (sky === 1) {
            return "맑음";
        } else if (sky === 3) {
            return "구름 많음";
        } else if (sky === 4) {
            return "흐림";
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
        <>
            <Background>
                <GlobalStyle />
                <Container>
                    <ChartContainer>
                        <LineChart width={800} height={100} data={data}>
                            <XAxis dataKey="fcstDateTime" name="fcstDateTime" />
                            <YAxis />
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="tmp" stroke="#82ca9d" />
                        </LineChart>
                    </ChartContainer>

                </Container>
            </Background>
        </>
    );


}