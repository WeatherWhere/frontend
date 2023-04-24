//단기예보(12시간) 컴포넌트
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { LineChart, Line } from "recharts";
import GlobalStyle from "../../../styles/fonts/fonts";
import { getWeatherShortMain } from "../../../utils/lib/api";
import { Icon } from "@iconify/react";

export default function ShortSub({ location }) {
  const [shortSubData, setShortSubData] = useState([]);

  const data = shortSubData.map((value, index) => {
    const hour = new Date(value.fcstDateTime).getHours();
    const isAM = hour < 12;
    const fcstDateTime = `${isAM ? "오전" : "오후"} ${hour % 12 || 12}시`;

    let pcpValue = value.pcp;
    if (pcpValue === "강수없음") {
      pcpValue = 0;
    } else {
      pcpValue = pcpValue.replace("mm", "");
    }

    let snoValue = value.sno;
    if (snoValue === "적설없음") {
      snoValue = 0;
    } else {
      snoValue = snoValue.replace("mm", "");
    }

    return {
      fcstDateTime,
      //풍속(동서성분)
      uuu: value.uuu,
      //풍속(남북성분)
      vvv: value.vvv,
      //파고
      wav: value.wav,
      //풍량
      vec: value.vec,
      //1시간 강수량(String-강수없음, 11mm)
      pcp: pcpValue,
      //1시간 신적설(String, 22mm)
      sno: snoValue,
    };
  });

  const getShortSubData = useCallback(async (key, token) => {
    await getWeatherShortMain(key)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const data = res.data.data;
          setShortSubData([...data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getShortSubData(
        `${process.env.REACT_APP_BASE_URL}/weather/forecast/short/sub?locationX=${location.latitude}&locationY=${location.longitude}`
      );
    }
  }, [location.latitude, location.longitude, getShortSubData]);

  return (
    <>
      <Background>
        <GlobalStyle />
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <TH>파고</TH>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.fcstDateTime}</TD>
                ))}
              </tr>
              <tr>
                <TD borderLeft="0" />
                <TD colSpan="12">
                  <ChartContainer>
                    <LineChart data={data} width={900} height={50}>
                      <Line
                        type="linear"
                        dataKey="wav"
                        stroke="#A4B9F2"
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
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.wav}M</TD>
                ))}
              </tr>
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr>
                <TH>풍향</TH>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.fcstDateTime}</TD>
                ))}
              </tr>
              <tr>
                <TD borderLeft="0" />
                <TD colSpan="12">
                  <ChartContainer>
                    <LineChart data={data} width={900} height={50}>
                      <Line
                        type="linear"
                        dataKey="vec"
                        stroke="#A8F2A4"
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
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.vec}deg</TD>
                ))}
              </tr>
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr>
                <TH>풍속</TH>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.fcstDateTime}</TD>
                ))}
              </tr>
              <tr>
                <TD borderLeft="0" />
                <TD colSpan="12">
                  <ChartContainer>
                    <LineChart data={data} width={900} height={50}>
                      <Line
                        type="linear"
                        dataKey="uuu"
                        stroke="#A4F2F0"
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
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.uuu}m/s</TD>
                ))}
              </tr>
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr>
                <TH>강수량</TH>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.fcstDateTime}</TD>
                ))}
              </tr>
              <tr>
                <TD borderLeft="0" />
                <TD colSpan="12">
                  <ChartContainer>
                    <LineChart data={data} width={900} height={50}>
                      <Line
                        type="linear"
                        dataKey="pcp"
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
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.pcp}mm</TD>
                ))}
              </tr>
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr>
                <TH>신적설</TH>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.fcstDateTime}</TD>
                ))}
              </tr>
              <tr>
                <TD borderLeft="0" />
                <TD colSpan="12">
                  <ChartContainer>
                    <LineChart data={data} width={900} height={50}>
                      <Line
                        type="linear"
                        dataKey="sno"
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
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.sno}mm</TD>
                ))}
              </tr>
            </tbody>
          </Table>
        </TableWrap>
      </Background>
    </>
  );
}

export const TableWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  padding: 0.3rem;
  overflow-x: auto;
`;

const Background = styled.div`
  display: flex;
  align-items: center;
  overflow-y: auto;
  justify-content: center;
  overflow-x: auto;
`;

const ChartContainer = styled.div`
  display: flex;
  margin: 0 1.1rem 0 1.1rem;
`;

const Table = styled.table`
  display: flex;
  align-items: center;
  position: relative;
  overflow-y: scroll;
  color: #969696;
  font-size: 0.7rem;
  margin: 0 auto;
  padding: 1rem 0;
  border-collapse: collapse;
  border-top: 1px solid #cdcdcd;
`;

const TD = styled.td`
  text-align: center;
  padding: 0 0.7rem 0.2rem 0.7rem;
  height: 1rem;
  white-space: nowrap;
  border-left: ${(props) => props.borderLeft || "1px dashed #CDCDCD"};
`;

const TH = styled.th`
  text-align: center;
`;

//아이콘 컴포넌트
export const StyledIcon = styled(Icon).attrs((props) => ({
  icon: props.name,
  style: {
    fontSize: props.size,
    color: props.color,
  },
}))``;
