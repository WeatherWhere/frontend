//중기예보(1일후~7일)
import React, { useCallback, useEffect, useState } from "react";
import { getWeatherMidForecast } from "../../utils/lib/api";
import { Background, TD, Table } from "./weatherShortMainAll/WeatherShortMainAll";
import { TableWrap } from "./weatherShortSub/ShortSub";
import GlobalStyle from "../../styles/fonts/fonts";
import styled from "styled-components";
import { Icon } from "@iconify/react";

export default function WeatherMidMainAll({ location }) {

    const mockRegionCode = "11B10101";
    const [midData, setMidData] = useState([]);

    const data = midData.map((value, index) => {
        const dateStr = value.baseTime;
        const date = new Date(dateStr.slice(0, 4), parseInt(dateStr.slice(4, 6)) - 1, dateStr.slice(6, 8));
        const options = { weekday: 'short' };
        const weekday = date.toLocaleDateString('ko-KR', options);
        return {
            baseTime: weekday,
            ram: value.ram,
            rpm: value.rpm,
            tmn: value.tmn,
            tmx: value.tmx,
            wam: value.wam,
            wpm: value.wpm,
        };
    });

    const getMidData = useCallback(async (key, token) => {
        await getWeatherMidForecast(key).then((res) => {
            if (res.data.statusCode === 200) {
                const data = res.data.data;
                setMidData([...data]);
            }
        }).catch((e) => {
            console.log(e);
        });

    }, []);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            getMidData(`weather/forecast/week?regionCode=${mockRegionCode}`);
        }
    }, [location.latitude, location.longitude, getMidData]);

    return (
        <>
            <Background>
                <GlobalStyle />
                <TableWrap>
                    <Table>
                        <tbody>
                            <TR>
                                <TD borderLeft="0"></TD>

                                {data.map((item, index) => (
                                    <TD key={index}>{item.baseTime}</TD>
                                ))}
                            </TR>
                            <TR>
                                <TD borderLeft="0"></TD>

                                {data.map((item, index) => (
                                    <TD key={index} >
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <TD borderLeft="0">오전</TD>
                                                    <TD borderLeft="0">오후</TD>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </TD>
                                ))}
                            </TR>
                            <TR>
                                <TD borderLeft="0"></TD>
                                {data.map((item, index) => (

                                    <TD key={index} >
                                        <StyledIcon name={getMidStatus(item.wam)[0]} color={getMidStatus(item.wam)[2]} size="2rem" />
                                        <StyledIcon name={getMidStatus(item.wpm)[0]} color={getMidStatus(item.wpm)[2]} size="2rem" />
                                    </TD>
                                ))}
                            </TR>
                            <TR>
                                <TD borderLeft="0"> 날씨</TD>

                                {data.map((item, index) => (
                                    <TD key={index}>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <TD borderLeft="0">{item.wam}</TD>
                                                    <TD borderLeft="0">{item.wpm}</TD>
                                                </tr>
                                            </tbody>
                                        </Table>

                                    </TD>
                                ))}
                            </TR>
                            <TR>
                                <TD borderLeft="0">기온</TD>

                                {data.map((item, index) => (
                                    <TD key={index}>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <TD borderLeft="0">{item.tmn}°</TD>
                                                    <TD borderLeft="0">{item.tmx}°</TD>
                                                </tr>
                                            </tbody>
                                        </Table>

                                    </TD>
                                ))}
                            </TR>
                            <TR>
                                <TD borderLeft="0">강수</TD>

                                {data.map((item, index) => (
                                    <TD key={index}>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <TD borderLeft="0">{item.ram}%</TD>
                                                    <TD borderLeft="0">{item.rpm}%</TD>
                                                </tr>
                                            </tbody>
                                        </Table>

                                    </TD>
                                ))}
                            </TR>
                        </tbody>
                    </Table>
                </TableWrap>

            </Background>
        </>
    );
}



export const getMidStatus = (status) => {

    switch (status) {
        case '맑음':
            //맑음(이모티콘명, 배경색, 이모티콘색)
            return ["wi:day-sunny", "#A4DCF2", "#FFCD9F"];
        case '구름많음':
            return ["fluent:weather-partly-cloudy-day-20-regular", "#9eb5c5", "#FFCD9F"];
        case '구름많고 비':
            return ["fluent:weather-drizzle-20-regular", "#7d8da8", "#D9D9D9"];
        case '구름많고 눈':
            return ["fluent:weather-snow-20-regular", "#b7bfc6", "#A4DCF2"];
        case '구름많고 비/눈':
            return ["fluent:weather-rain-snow-20-regular", "#94a8b8", "#A4DCF2"]
        case '구름많고 소나기':
            return ["fluent:weather-drizzle-20-regular", "#d9e3ec", "#D9D9D9"]
        case '흐림':
            return ["fluent:weather-partly-cloudy-day-20-regular", "#9eb5c5", "#FFCD9F"];
        case '흐리고 비':
            return ["fluent:weather-drizzle-20-regular", "#A4DCF2", "#A4DCF2"];
        case '흐리고 비/눈':
            return ["fluent:weather-rain-snow-20-regular", "#94a8b8", "#A4DCF2"]
        case '흐리고 소나기':
            return ["fluent:weather-drizzle-20-regular", "#A4DCF2", "#A4DCF2"];
        default:
            return ["wi:day-sunny", "#A4DCF2", "#FFCD9F"];

    }

}

//아이콘 컴포넌트
export const StyledIcon = styled(Icon).attrs(props => ({
    icon: props.name,
    style: {
        fontSize: props.size,
    },
}))`

    margin-left:0.2rem;
  `;

const TR = styled.tr`

`;