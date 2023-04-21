import React from "react";
import styled from "styled-components";
import GlobalStyle from "../../../styles/fonts/fonts";

export default function Ranking(props) {
  const { allRank, handleSelected } = props;
  return (

    <CommonWrap>
      <GlobalStyle />
      <Table>
        <thead>
            <TR>
              <TH space="nowrap">오늘의 추천 관광지는?</TH>
            </TR>
        </thead>
        <Tbody>
          <TR>
            <TD borderLeft="0" space="nowrap" color="#BEE1A7" fontColor="white">랭킹</TD>

            {allRank.map((rankData, idx) => (
              <TD key={idx} onClick={() => handleSelected(rankData.spots)}>{idx + 1}위</TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">지역</TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>{rankData.rankValue.region}</TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">시군구</TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>{rankData.rankValue.sigungu}</TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#94AFE8" fontColor="white" borderLeft="0">관광기후지수</TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>{rankData.rankValue.tcigrade}</TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">일평균열쾌적성지수</TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>{rankData.rankValue.hdgrade}</TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">한낮열쾌적성지수</TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap"  key={idx}>{rankData.rankValue.hngrade}</TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">강수지수</TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>{rankData.rankValue.sigrade}</TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">일사지수</TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap"  key={idx}>{rankData.rankValue.rgrade}</TD>
            ))}
          </TR>

          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">바람지수</TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap"  key={idx}>{rankData.rankValue.wgrade}</TD>
            ))}
          </TR>
        </Tbody>
      </Table>
    </CommonWrap>




  );
}
export const CommonWrap = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  overflow-y: auto;
  overflow-y: scroll;
`

export const StyledImage = styled(Image)`
  height:60%;
  width:70%;
`;



export const Table = styled.table`
  display: flex;
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
  background-color: ${(props) => props.color || '#F9FFF5'} ;
  color:${(props) => props.fontColor || '#69765F'};

`;

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
const Tbody = styled.tbody`

overflow-y: scroll;
height:11rem;
`
