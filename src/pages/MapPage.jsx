import React from "react";
import styled from "styled-components";
import Temp from "../components/tourMap/Temp";
import Header from "../layout/Header";
import RecommendMap from "../components/tourMap/recommend/RecommendMap";

export default function TourMap() {
  return (
    <RootPage>
      <RecommendMap />
      <Temp />
    </RootPage>
  );
}

const RootPage = styled.section`
  display: flex;
  flex-direction: column;

  height: 100vh;
`;
