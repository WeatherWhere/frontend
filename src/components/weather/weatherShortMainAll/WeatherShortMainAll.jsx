import styled from "styled-components";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import GlobalStyle from "../../../styles/fonts/fonts";
import { getWeatherShortMain } from "../../../utils/lib/api";
import { Yard } from "@mui/icons-material";


const Background = styled.div`
background-color: #FFFFF;
flex-wrap: wrap;
display: flex;
overflow-y: auto;
overflow-y: hidden;

`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ChartNameContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

const ChartContainer = styled.div`
  display: flex;
  position: relative;
  margin: 0.1rem;
  flex: 1;
`;


const TableContainer = styled.div`
  display: flex;
  position: relative;
  margin: 0.1rem;
  flex: 1;
  overflowY: scroll;
  color:#969696;
  font-size:0.9rem;
`;

const Table = styled.table`
    border-collapse: collapse;
`;

const TD = styled.td`
    border: 1px solid #dddddd;
    text-align: left;
    padding: 1rem;
    height:2rem;
    width:5rem;
`;


export default function WeatherShortMainAll() {


    const [shortMainData, setShortMainData] = useState([]);

    const data = shortMainData.map((value, index) => {
        const hour = new Date(value.fcstDateTime).getHours();
        const isAM = hour < 12;
        const fcstDateTime = `${isAM ? "오전" : "오후"} ${hour % 12 || 12}시`;
        return {
            fcstDateTime,
            pop: value.pop,
            pty: value.pty,
            sky: value.sky,
            tmp: value.tmp,
            wsd: value.wsd,
            reh: value.reh,
        };
    });

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
                            <LineChart data={data} width={1000} height={300}>
                                <XAxis dataKey="fcstDateTime" orientation="top" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: '#969696' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ display: 'none' }} />
                                <Line type="linear" dataKey="tmp" stroke="#A4DCF2" curve="linear" legendType="none" />
                            </LineChart>
                    </ChartContainer>
                </Container>
                <TableContainer>
                    <Table>
                        <tbody>
                            <tr>
                                <TD></TD>
                                {data.map((item, index) => (
                                    <TD key={index}>{item.fcstDateTime}</TD>
                                ))}
                            </tr>
                            <tr>
                                <TD>기온</TD>

                                {data.map((item, index) => (
                                    <TD key={index}>{item.tmp}</TD>
                                ))}
                            </tr>
                            <tr>
                                <TD>강수</TD>

                                {data.map((item, index) => (
                                    <TD key={index}>{item.reh}</TD>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </TableContainer>
            </Background>
        </>
    );


}
