import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from 'react-bootstrap/Image'
import GlobalStyle from "../../styles/fonts/fonts";

export default function TourCommon() {

  //const [commonData, setCommonData] = useState(null);
  const [tourPositions, setTourPositions] = useState(null);

  const overView = "경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. 경복궁은 동궐(창덕궁)s이나 서궐(경희궁)에 비해 위치가 북쪽에 있어 '북궐'이라 불리기도 했다. 경복궁은ㄴㄴㄴㄴㄴㄴㄴssㄴㅇ마ㅓ라버좌딥저ㅏㅣㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ ."

  //관광 공통정보 받아오는 api
  // const getWeatherMidForecast = async (key, token) => {
  //   try {
  //     const response = await axios.get(key);
  //     setCommonData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetch("/mock/tour_data.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.position[0]);
        setTourPositions(data.position[0]);
        // if (tourPositions) {
        //   getWeatherMidForecast(`/tour/common?contentId=264570&contentTypeId=12`);
        // }
      });

  }, []);

  return (
    <>
      <GlobalStyle />
      {tourPositions ?
        <CommonWrap>
          <StyledImage thumbnail="true" src={tourPositions.firstimage} />
            <Table>
              <thead>
                <TR>
                  <TH >{tourPositions.title}</TH>
                </TR>
              </thead>
              <tbody>
                <TR>
                  <TD space="nowrap" color="#BEE1A7" fontColor="white">홈페이지</TD>
                  <TD color="#F9FFF5">{tourPositions.zipcode}</TD>
                </TR>
                <TR>
                  <TD color="#BEE1A7" fontColor="white">주소</TD>
                  <TD color="#F9FFF5">{tourPositions.zipcode}</TD>
                </TR>
                <TR>
                  <TD color="#BEE1A7" fontColor="white">개요</TD>
                  <TD color="#F9FFF5">
                    <Scroll>
                      {overView}
                    </Scroll>
                  </TD>
                </TR>
              </tbody>
            </Table>
        </CommonWrap>
        :
        <div>Loading</div>}
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
    white-space: ${(props)=>props.space} ;
    padding:0.4rem;
    border-top: 0px;
    border-bottom: 0px;
    background-color: ${(props)=>props.color} ;
    color:${(props)=>props.fontColor || '#69765F' };
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
padding:0.2rem;
font-size:1.3rem;
text-decoration: underline;
text-decoration-color:#BEE1A7;
text-decoration-thickness: 6px;


`