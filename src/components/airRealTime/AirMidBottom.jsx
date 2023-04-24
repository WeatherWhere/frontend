import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";

import { getWeatherShortMain } from "../../utils/lib/api";
import { TableWrap } from "../weather/weatherShortSub/ShortSub";
import styled from "styled-components";

export default function AirMidBottom({ address }) {
  const today = new Date(); // 현재 날짜 및 시간을 가져옴
  const formattedDate = today.toISOString().substr(0, 10); // yyyy-MM-dd 형식으로 변환

  const [airMidData, setAirMidData] = useState([]);

  const data = airMidData.map((value, index) => {
    let baseDate = value.baseDate;
    const date = new Date(baseDate);
    const options = { weekday: "short" };
    let weekday = date.toLocaleDateString("ko-KR", options);
    if (index === 0) {
      weekday = "오늘";
    }
    return {
      weekday,
      forecast: value.forecast,
      reliability: value.reliability,
    };
  });

  const getShortMainData = useCallback(async (key, token) => {
    await getWeatherShortMain(key)
      .then((res) => {
        if (res.data.resultCode === 200) {
          const data = res.data.data;
          setAirMidData([...data]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (address) {
      getShortMainData(
        `${process.env.REACT_APP_BASE_URL}/air/forecast/data?addr=${address.address_name}&baseDate=${formattedDate}`
      );
    }
  }, [address, getShortMainData, formattedDate]);

  return (
    <>
      <Background>
        <TableWrap>
          <Table>
            <tbody>
              <tr>
                <TD borderLeft="0"></TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.weekday}</TD>
                ))}
              </tr>
              <tr>
                <TD borderLeft="0">신뢰도</TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.reliability}</TD>
                ))}
              </tr>
              <tr>
                <TD borderLeft="0">위험도</TD>

                {data.map((item, index) => (
                  <TD key={index}>{item.forecast}</TD>
                ))}
              </tr>

              <tr>
                <TD borderLeft="0"></TD>
                {data.map((item, index) => (
                  <TD key={index}>
                    <StyledIcon
                      name={getAirQuality(item.forecast)[0]}
                      color={getAirQuality(item.forecast)[1]}
                      size="2rem"
                    />
                  </TD>
                ))}
              </tr>
            </tbody>
          </Table>
        </TableWrap>
      </Background>
    </>
  );
}

const Background = styled.div`
    border-radius: 10px;
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

const getAirQuality = (grade) => {
  switch (grade) {
    case "좋음":
      return ["ri:emotion-happy-line", "#273BBC"];
    case "보통":
      return ["ri:emotion-normal-line", "#179501"];
    case "나쁨":
      return ["mdi:emoticon-dead-outline", "#6E6E6E"];
    default:
      return ["mdi:emoticon-devil-outline", "#D65A5D"];
  }
};
