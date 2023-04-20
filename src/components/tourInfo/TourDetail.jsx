import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import GlobalStyle from "../../styles/fonts/fonts";

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
  },[]);

  useEffect(() => {
    fetch("/mock/tour_data.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.position[0]);
          getWeatherMidForecast(`${process.env.REACT_APP_BASE_URL}/tour/detail?contentId=264570&contentTypeId=12`);
      });

  }, [getWeatherMidForecast]);

  return (
    <>
      <GlobalStyle />
      {detailData ?
        <CommonWrap>
          <StyledImage thumbnail="true" src="http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg" />
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>강남</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TD space="nowrap">이용시간 </TD>
                  <TD>{detailData.useTime}</TD>
                </tr>
                <tr>
                  <TD >개요</TD>
                  <TD></TD>
                </tr>
              </tbody>
            </Table>
          </TableWrap>
        </CommonWrap>
        :
        <div>Loading</div>}
    </>
  );

}

const CommonWrap = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  height:auto;

`

const StyledImage = styled(Image)`
  height:60%;
  width:70%;
`;


const TableWrap = styled.div`
    padding:0.3rem;
    align-items: center;
    display: flex;
    justify-content:center;
`

const Table = styled.table`
    display: flex;
    align-items: center;
    color:#969696;
    font-size:0.9rem;
    padding: 0.2rem 0;
    flex-direction: column;
    margin:1rem;
`;

const TD = styled.td`
    text-align: center;
    padding: 0 0.3rem 0rem 0.3rem;
    overflow-y: scroll;
    align-items: center;
`;

