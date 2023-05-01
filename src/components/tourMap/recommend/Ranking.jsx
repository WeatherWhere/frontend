import React from "react";
import styled from "styled-components";

export default function Ranking(props) {
  const { allRank, handleSelected } = props;
  return (
    <CommonWrap>
      <Table>
        <thead>
          <TR>
            <TH space="nowrap">오늘의 추천 관광지는?</TH>
            <TH2 space="nowrap">순위를 누르고 지도를 확대해보세요!</TH2>
          </TR>
        </thead>
        <Tbody>
          <TR>
            <TD borderLeft="0" space="nowrap" color="#BEE1A7" fontColor="white">
              랭킹
            </TD>

            {allRank.map((rankData, idx) => (
              <TD key={idx} onClick={() => handleSelected(rankData.spots)}>
                {idx + 1}위
              </TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">
              지역
            </TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>
                {rankData.rankValue.region}
              </TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">
              시군구
            </TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>
                {rankData.rankValue.sigungu}
              </TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#94AFE8" fontColor="white" borderLeft="0">
              관광기후지수
            </TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx} color="#F8F8FF" fontColor="#5F6176">
                {rankData.rankValue.tcigrade}
              </TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#E89495" fontColor="white" borderLeft="0">
              미세먼지
            </TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx} color="#FFF8F8" fontColor="#5F6176">
                {rankData.rankValue.pm10Grade}
              </TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#E89495" fontColor="white" borderLeft="0">
              초미세먼지
            </TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx} color="#FFF8F8" fontColor="#5F6176">
                {rankData.rankValue.pm25Grade}
              </TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">
              일평균열쾌적성지수
            </TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>
                {rankData.rankValue.hdgrade}
              </TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">
              한낮열쾌적성지수
            </TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>
                {rankData.rankValue.hngrade}
              </TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">
              강수지수
            </TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>
                {rankData.rankValue.sigrade}
              </TD>
            ))}
          </TR>
          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">
              일사지수
            </TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>
                {rankData.rankValue.rgrade}
              </TD>
            ))}
          </TR>

          <TR>
            <TD space="nowrap" color="#BEE1A7" fontColor="white" borderLeft="0">
              바람지수
            </TD>

            {allRank.map((rankData, idx) => (
              <TD space="nowrap" key={idx}>
                {rankData.rankValue.wgrade}
              </TD>
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
  height:28%
`;

export const StyledImage = styled(Image)`
  height: 60%;
  width: 70%;
`;

export const Table = styled.table`
  display: flex;
  color: #969696;
  font-size: 0.8rem;
  width: 100%;
  padding: 0.2rem 0;
  flex-direction: column;
  margin: 0.2rem;
  height:90%;
`;

export const TD = styled.td`
  text-align: center;
  padding: 0 0.3rem 0rem 0.3rem;
  overflow-y: scroll;
  align-items: center;
  white-space: ${(props) => props.space};
  padding: 0.4rem;
  border-top: 0px;
  border-bottom: 0px;
  background-color: ${(props) => props.color || "#F9FFF5"};
  color: ${(props) => props.fontColor || "#69765F"};
`;

const TR = styled.tr`
  border: 1px solid white;
  color: #69765f;
`;
const TH = styled.th`
  padding: 0.5rem;
  font-size: 1.1rem;
  text-decoration: underline;
  text-decoration-color: #bee1a7;
  text-decoration-thickness: 6px;
`;

const TH2 = styled.th`
  padding-left: 0.5rem;
  padding-top: 0.5rem;
  font-size: 0.6rem;
  text-decoration: underline;
  text-decoration-color: #bee1a7;
  text-decoration-thickness: 5px;
`;

const Tbody = styled.tbody`
  display: block;
  overflow-y: scroll;
`;
