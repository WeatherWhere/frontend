import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from 'react-bootstrap/Image'
import GlobalStyle from "../../styles/fonts/fonts";

export default function TourCommon() {

  const [commonData, setCommonData] = useState(null);
  const [tourPositions, setTourPositions] = useState(null);

  const overView = "경복궁은 1395년 태조 이성계에 의해서 새로운 조선왕조의 법궁으로 지어졌다. 경복궁은 동궐(창덕궁)이나 서궐(경희궁)에 비해 위치가 북쪽에 있어 '북궐'이라 불리기도 했다. 경복궁은 5대 궁궐 가운데 으뜸의 규모와 건축미를 자랑한다. 경복궁 근정전에서 즉위식을 가진 왕들을 보면 제2대 정종, 제4대 세종, 제6대 단종, 제7대 세조, 제9대 성종, 제11대 중종, 제13대 명종 등이다. 경복궁은 임진왜란 때 상당수의 건물이 불타 없어진 아픔을 갖고 있으며, 고종 때에 흥선대원군의 주도 아래 7,700여칸에 이르는 건물들을 다시 세웠다. 그러나 또 다시 명성황후 시해사건이 일어나면서 왕조의 몰락과 함께 경복궁도 왕궁으로서의 기능을 상실하고 말았다. 경복궁에는 조선시대의 대표적인 건축물인 경회루와 향원정의 연못이 원형대로 남아 있으며, 근정전의 월대와 조각상들은 당시의 조각미술을 대표한다. 현재 흥례문 밖 서편에는 국립고궁 박물관이 위치하고 있고, 경복궁 내 향원정의 동편에는 국립민속 박물관이 위치하고 있다."

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
    fetch("/mock/tour_data.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.position[0]);
        setTourPositions(data.position[0]);
        // if (tourPositions) {
        //   getWeatherMidForecast(`/tour/api4?contentId=264570&contentTypeId=12`);
        // }
      });

  }, []);

  return (
    <>
      <GlobalStyle />
      {tourPositions ?
        <CommonWrap>
          <StyledImage thumbnail="true" src={tourPositions.firstimage} />
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>{tourPositions.title}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TD borderLeft="0">우편번호 </TD>
                  <TD>{tourPositions.zipcode}</TD>
                </tr>
                <tr>
                  <TD borderLeft="0">개요</TD>
                  <TD height="10rem">{overView}</TD>
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

export const StyledImage = styled(Image)`
height:60%;
width:60%;
`;

export const CommonWrap = styled.div`
flex-direction: column;
display: flex;
align-items: center;
flex:1;

`

export const TableWrap = styled.div`
    padding:0.3rem;
    align-items: center;
    display: flex;
justify-content:center;
`

export const Table = styled.table`
  width:95%;
    display: flex;
    align-items: center;
    color:#969696;
    font-size:0.8rem;
    padding: 0.2rem 0;
    flex-direction: column;
`;

export const TD = styled.td`
    height: ${(props)=>props.height};
    width:90%;
    display: flex;
    text-align: center;
    padding: 0 0.3rem 0rem 0.3rem;
    overflow-y: scroll;

`;
    

