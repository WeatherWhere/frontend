import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import GlobalStyle from "../../styles/fonts/fonts";
import axios from "axios";
import ImgNotFound from "../../styles/img/ImgNotFound.png";

export default function TourCommon({ modalInfo }) {
  const [commonData, setCommonData] = useState(null);

  //관광 공통정보 받아오는 api
  const getWeatherMidForecast = async (key, token) => {
    try {
      const response = await axios.get(key);
      setCommonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (modalInfo) {
      getWeatherMidForecast(`${process.env.REACT_APP_BASE_URL}/tour/common?contentId=${modalInfo.contentId}&contentTypeId=${modalInfo.contentTypeId}`);
    }
  }, [modalInfo]);

  return (
    <>
      <GlobalStyle />
      {modalInfo &&commonData ? (
        <CommonWrap>
          {modalInfo.firstImage? <StyledImage thumbnail="true" src={modalInfo.firstImage} /> : <StyledImage thumbnail="true" src={ImgNotFound}/>}
          <Table>
            <thead>
              <TR>
                <TH >{modalInfo.title}</TH>
              </TR>
            </thead>
            <tbody>
              <TR>
                <TD space="nowrap" color="#BEE1A7" fontColor="white">우편번호</TD>
                <TD color="#F9FFF5">{modalInfo.zipcode}</TD>
              </TR>
              <TR>
                <TD color="#BEE1A7" fontColor="white">주소</TD>
                <TD color="#F9FFF5">{modalInfo.addr}</TD>
              </TR>
              <TR>
                <TD color="#BEE1A7" fontColor="white">개요</TD>
                <TD color="#F9FFF5">
                  <Scroll>
                    {commonData.overView}
                  </Scroll>
                </TD>
              </TR>
            </tbody>
          </Table>
        </CommonWrap>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export const CommonWrap = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  height:auto;
  justify-content:center;
`

export const StyledImage = styled(Image)`
  height:60%;
  width:70%;
`;



export const Table = styled.table`
    display: flex;
    align-items: center;
    color:#969696;
    font-size:0.8rem;
    padding: 0.2rem 0;
    flex-direction: column;
    margin:0.2rem;


`;

export const TD = styled.td`
    text-align: center;
    padding: 0 0.3rem 0rem 0.3rem;
    overflow-y: scroll;
    align-items: center;
    white-space: ${(props) => props.space} ;
    padding:0.4rem;
    border-top: 0px;
    border-bottom: 0px;
    background-color: ${(props) => props.color} ;
    color:${(props) => props.fontColor || '#69765F'};
`;

const Scroll = styled.div`
  overflow-y: scroll;
  height:8rem;
  display: flex;
  justify-content:center;

`
const TR = styled.tr`
border: 1px solid white;
color:#69765F;
`
const TH = styled.th`
padding:0.5rem;
font-size:1.3rem;
text-decoration: underline;
text-decoration-color:#BEE1A7;
text-decoration-thickness: 6px;


`
