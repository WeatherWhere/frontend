//단기예보(12시간) 컴포넌트
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { LineChart, Line } from "recharts";
import { getWeatherShortMain } from "../../../utils/lib/api";
import { getSkyStatus } from "../weatherShortMainNow/WeatherShortMainNow";
import { Icon } from "@iconify/react";
import { TableWrap } from "../weatherShortSub/ShortSub";

export default function WeatherShortMainAll({ location }) {
  const [shortMainData, setShortMainData] = useState([]);

  const data = shortMainData.map((value, index) => {
    const hour = new Date(value.fcstDateTime).getHours();
    const isAM = hour < 12;
    let fcstDateTime = `${isAM ? "오전" : "오후"} ${hour % 12 || 12}시`;
    if (index === 0) {
      fcstDateTime = "현재";
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

  const getShortMainData = useCallback(async (key, token) => {
    await getWeatherShortMain(key)
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 200) {
          const data = res.data.data;
          setShortMainData([...data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getShortMainData(
        `${process.env.REACT_APP_BASE_URL}/weather/forecast/short/main?locationX=${location.latitude}&locationY=${location.longitude}`
      );
    }
  }, [location.latitude, location.longitude, getShortMainData]);

  return (
    <>
      <Background>
        <TableWrap>
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
                  <TD key={index}>
                    <StyledIcon
                      name={getSkyStatus(item.sky, item.pty)[0]}
                      color={getSkyStatus(item.sky, item.pty)[2]}
                      size="2rem"
                    />
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
                <TD colSpan="12">
                  <ChartContainer>
                    <LineChart data={data} width={900} height={50}>
                      <Line
                        type="linear"
                        dataKey="tmp"
                        stroke="#A4DCF2"
                        strokeWidth={2}
                        curve="linear"
                        legendType="none"
                        dot={{ r: 5 }}
                      />
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
        </TableWrap>
      </Background>
    </>
  );
}

export const Background = styled.div`
    border-radius: 10px;
    display: flex;
    height: 28%;
    align-items: center;
    overflow-y: auto;
    overflow-y: hidden;.
    overflow-x: auto;
    overflow-y: scroll;
`;

const ChartContainer = styled.div`
  display: flex;
  margin: 0 1.1rem 0 1.1rem;
`;

export const Table = styled.table`
  display: flex;
  align-items: flex-start;
  position: relative;
  height: 100%;
  color: #969696;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  border-collapse: collapse;
  margin: auto;
  flex: 1;
  justify-content: center;
`;

export const TD = styled.td`
  text-align: center;
  padding: 0 0.3rem 0rem 0.3rem;
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
