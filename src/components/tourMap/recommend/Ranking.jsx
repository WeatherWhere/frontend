import React from "react";
import styled from "styled-components";

export default function Ranking(props) {
  const { allRank, handleSelected } = props;
  return (
    <StTempWrapper>
      {allRank.map((rankData, idx) => (
        <StSection key={idx} onClick={() => handleSelected(rankData.spots)}>
          <StRank>{idx + 1}위 추천</StRank>
          <StRegion>
            {rankData.rankValue.region} {rankData.rankValue.sigungu}
          </StRegion>
          <StHdGrade>hdgrade: {rankData.rankValue.hdgrade}</StHdGrade>
          <StHnGrade>hngrade: {rankData.rankValue.hngrade}</StHnGrade>
          <StRGrade>rggrade: {rankData.rankValue.rggrade}</StRGrade>
          <StSiGrade>sigrade: {rankData.rankValue.sigrade}</StSiGrade>
          <StTCI>tci: {rankData.rankValue.tci.toFixed(3)}</StTCI>
          <StWGrade>wgrade: {rankData.rankValue.wgrade}</StWGrade>
        </StSection>
      ))}
    </StTempWrapper>
  );
}

const StTempWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const StSection = styled.div`
  width: 100px;
`;

const StRank = styled.div`
  font-size: 1rem;
  align-items: center;
`;
const StRegion = styled.div`
  font-size: 0.7rem;
`;
const StHdGrade = styled.div`
  font-size: 0.6rem;
`;
const StHnGrade = styled.div`
  font-size: 0.6rem;
`;
const StRGrade = styled.div`
  font-size: 0.6rem;
`;
const StSiGrade = styled.div`
  font-size: 0.6rem;
`;
const StTCI = styled.div`
  font-size: 0.6rem;
`;
const StWGrade = styled.div`
  font-size: 0.6rem;
`;
