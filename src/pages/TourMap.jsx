import React from "react";
import styled from "styled-components";
import Header2 from "../layout/Header2";
import KakaoMap from "../components/tourMap/KakaoMap";
import Temp from "../components/tourMap/Temp";

export default function TourMap() {
  return (
    <RootPage>
      <Header2 />
      <KakaoMap />
      <Temp />
    </RootPage>
  );
}

const RootPage = styled.section`
  display: flex;
  flex-direction: column;

  height: 100vh;
`;
