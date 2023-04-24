//단기예보(12시간) 컴포넌트
import styled from "styled-components";
import GlobalStyle from "./../../styles/fonts/fonts";
import { Icon } from "@iconify/react";
import { TableWrap } from "../weather/weatherShortSub/ShortSub";
import { Text } from "../weather/weatherShortMainNow/WeatherShortMainNow";
import { useCallback, useEffect, useState } from "react";
import { getAirRealtime } from "../../utils/lib/api";

export default function AirSubBottom({ location }) {
  const [airRealtimeData, setAirRealtimeData] = useState(null);

  const getAirRealtimeData = useCallback(async (key, token) => {
    try {
      const data = await getAirRealtime(key);
      setAirRealtimeData(data.data.data[0]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getAirRealtimeData(
        `${process.env.REACT_APP_BASE_URL}/air/realtime/data?x=${location.longitude}&y=${location.latitude}`
      );
    }
  }, [location.latitude, location.longitude, getAirRealtimeData]);

  return (
    <>
      {airRealtimeData ? (
        <Background>
          <GlobalStyle />
          <TableWrap>
            <Table>
              <tbody>
                <tr>
                  <TD borderLeft="0"></TD>
                  <TD>미세먼지</TD>
                  <TD>초미세먼지</TD>
                  <TD>통합대기환경</TD>
                  <TD>일산화탄소</TD>
                  <TD>오존</TD>
                  <TD>이황산가스</TD>
                </tr>
                <tr>
                  <TD borderLeft="0">지수</TD>
                  <TD>{airRealtimeData.pm10Grade}</TD>
                  <TD>{airRealtimeData.pm25Grade}</TD>
                  <TD>{airRealtimeData.khaiGrade}</TD>
                  <TD>{airRealtimeData.coGrade}</TD>
                  <TD>{airRealtimeData.o3Grade}</TD>
                  <TD>{airRealtimeData.so2Grade}</TD>
                </tr>
                <tr>
                  <TD borderLeft="0">농도</TD>
                  <TD>{airRealtimeData.pm10Value}㎍/㎥</TD>
                  <TD>{airRealtimeData.pm25Value}㎍/㎥</TD>
                  <TD>{airRealtimeData.khaiValue}ppm</TD>
                  <TD>{airRealtimeData.coValue.toFixed(2)}ppm</TD>
                  <TD>{airRealtimeData.o3Value.toFixed(2)}ppm</TD>
                  <TD>{airRealtimeData.so2Value.toFixed(2)}ppm</TD>
                </tr>
                <tr>
                  <TD borderLeft="0">위험도</TD>
                  <TD>
                    <StyledIcon
                      name={getAirQuality(airRealtimeData.pm10Grade)[0]}
                      color={getAirQuality(airRealtimeData.pm10Grade)[1]}
                      size="2rem"
                    />
                  </TD>
                  <TD>
                    <StyledIcon
                      name={getAirQuality(airRealtimeData.pm25Grade)[0]}
                      color={getAirQuality(airRealtimeData.pm25Grade)[1]}
                      size="2rem"
                    />
                  </TD>
                  <TD>
                    <StyledIcon
                      name={getAirQuality(airRealtimeData.khaiGrade)[0]}
                      color={getAirQuality(airRealtimeData.khaiGrade)[1]}
                      size="2rem"
                    />
                  </TD>
                  <TD>
                    <StyledIcon
                      name={getAirQuality(airRealtimeData.coGrade)[0]}
                      color={getAirQuality(airRealtimeData.coGrade)[1]}
                      size="2rem"
                    />
                  </TD>
                  <TD>
                    <StyledIcon
                      name={getAirQuality(airRealtimeData.o3Grade)[0]}
                      color={getAirQuality(airRealtimeData.o3Grade)[1]}
                      size="2rem"
                    />
                  </TD>
                  <TD>
                    <StyledIcon
                      name={getAirQuality(airRealtimeData.so2Grade)[0]}
                      color={getAirQuality(airRealtimeData.so2Grade)[1]}
                      size="2rem"
                    />
                  </TD>
                </tr>
              </tbody>
            </Table>
          </TableWrap>
        </Background>
      ) : (
        <Background>
          <GlobalStyle />
          <Text>Loading...</Text>
        </Background>
      )}
    </>
  );
}

const getAirQuality = (grade) => {
  switch (grade) {
    case 1:
      return ["ri:emotion-happy-line", "#273BBC"];
    case 2:
      return ["ri:emotion-normal-line", "#179501"];
    case 3:
      return ["mdi:emoticon-dead-outline", "#6E6E6E"];
    default:
      return ["mdi:emoticon-devil-outline", "#D65A5D"];
  }
};

const Background = styled.div`
    border-radius: 10px;
    height: 30%;
    display: flex;
    align-items: center;
    overflow-y: auto;
    overflow-y: hidden;.
    overflow-x: auto;
    justify-content: center; 
`;

const Table = styled.table`
  display: flex;
  align-items: center;
  position: relative;
  overflowy: scroll;
  color: #969696;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  border-collapse: collapse;
  margin: auto;
  flex: 1;
  justify-content: center;
`;

const TD = styled.td`
  text-align: center;
  padding: 0 0.7rem 1rem 0.7rem;
  height: 1rem;
  white-space: nowrap;
  border-left: ${(props) => props.borderLeft || "1px dashed #CDCDCD"};
`;

//아이콘 컴포넌트
export const StyledIcon = styled(Icon).attrs((props) => ({
  icon: props.name,
  style: {
    fontSize: props.size,
    color: props.color,
  },
}))``;
