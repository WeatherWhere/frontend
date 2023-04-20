import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../../styles/fonts/fonts";
import { CommonWrap, StyledImage } from "./TourCommon";

export default function TourDetail() {
  const [detailData, setCommonData] = useState(null);
  //const [tourPositions, setTourPositions] = useState(null);

  //관광 공통정보 받아오는 api
  const getWeatherMidForecast = useCallback(async (key, token) => {
    try {
      const response = await axios.get(key);
      setCommonData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetch("/mock/tour_data.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.position[0]);
        getWeatherMidForecast(
          `${process.env.REACT_APP_BASE_URL}/tour/api3?contentId=264570&contentTypeId=12`
        );
      });
  }, [getWeatherMidForecast]);

  return (
    <>
      <GlobalStyle />
      {detailData ? (
        <CommonWrap>
          <StyledImage
            thumbnail="true"
            src="http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg"
          />
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>{detailData.useTime}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TD borderLeft="0">이용시간 </TD>
                  <TD>{detailData.useTime}</TD>
                </tr>
                <tr>
                  <TD borderLeft="0">개요</TD>
                  <TD height="10rem"></TD>
                </tr>
              </tbody>
            </Table>
          </TableWrap>
        </CommonWrap>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export const TableWrap = styled.div`
  padding: 0.3rem;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const Table = styled.table`
  width: 95%;
  display: flex;
  align-items: center;
  color: #969696;
  font-size: 0.8rem;
  padding: 0.2rem 0;
  flex-direction: column;
`;

export const TD = styled.td`
  height: ${(props) => props.height};
  width: 90%;
  display: flex;
  text-align: center;
  padding: 0 0.3rem 0rem 0.3rem;
  overflow-y: scroll;
`;
