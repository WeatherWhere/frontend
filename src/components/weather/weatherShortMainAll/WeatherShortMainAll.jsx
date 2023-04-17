//단기예보(12시간) 컴포넌트
import styled from "styled-components";
import { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, CartesianAxis } from 'recharts';
import GlobalStyle from "../../../styles/fonts/fonts";
import { getWeatherShortMain } from "../../../utils/lib/api";
import { getSkyStatus } from "../weatherShortMainNow/WeatherShortMainNow";
import { Icon } from '@iconify/react';

export default function WeatherShortMainAll() {


    const [shortMainData, setShortMainData] = useState([]);

    const data = shortMainData.map((value, index) => {
        const hour = new Date(value.fcstDateTime).getHours();
        const isAM = hour < 12;
        let fcstDateTime = `${isAM ? "오전" : "오후"} ${hour % 12 || 12}시`;
        if (index===0){
            fcstDateTime = '현재';
        }
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
                <Table>
                    <tbody>
                        <tr>
                            <TD borderLeft="0"></TD>

                            {data.map((item, index) => (
                                <TD key={index}>{item.fcstDateTime}</TD>
                            ))}
                        </tr>
                        <tr>
                            <TD borderLeft="0"></TD>
                            {data.map((item, index) => (
                                <TD key={index} >
                                    <StyledIcon name={getSkyStatus(item.sky, item.pty)[0]} color={getSkyStatus(item.sky, item.pty)[2]} size="2rem" />
                                </TD>
                            ))}
                        </tr>
                        <tr>
                            <TD borderLeft="0">기온</TD>

                            {data.map((item, index) => (
                                <TD key={index}>{item.tmp}°</TD>
                            ))}
                        </tr>
                        <tr>
                            <TD borderLeft="0" />
                            <TD colSpan="12" >
                                <ChartContainer>
                                    <LineChart data={data} width={900} height={50}>
                                        <Line type="linear" dataKey="tmp" stroke="#A4DCF2" strokeWidth={2} 
                                        curve="linear" legendType="none" dot={{ r: 5 }}/>
                                    </LineChart>
                                </ChartContainer>
                            </TD>
                        </tr>
                        <tr>
                            <TD borderLeft="0">강수</TD>

                            {data.map((item, index) => (
                                <TD key={index}>{item.reh}%</TD>
                            ))}
                        </tr>
                    </tbody>
                </Table>


            </Background>
        </>
    );


}


const Background = styled.div`
    background-color: #FFFFF;
    display: flex;
    align-items: center;
    overflow-y: auto;
    overflow-y: hidden;.
`;

const ChartContainer = styled.div`
  display: flex;
  margin:0 1.1rem 0 1.1rem;
`;


const Table = styled.table`
    display: flex;
    align-items: center;
    position: relative;
    overflowY: scroll;
    color:#969696;
    font-size:0.7rem;
    margin : 0 auto ;
    padding: 0.5rem 0;
    border-collapse: collapse;

`;

const TD = styled.td`
    text-align: center;
    padding: 0 0.7rem 0.2rem 0.7rem;
    height: 1rem;
    white-space: nowrap;
    border-left: ${(props) => props.borderLeft || '1px dashed #E3E3E3'};
    `;

//아이콘 컴포넌트
export const StyledIcon = styled(Icon).attrs(props => ({
    icon: props.name,
    style: {
        fontSize: props.size,
        color: props.color
    },
}))`  
  `;