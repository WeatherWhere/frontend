import React from "react";
import styled from "styled-components";
import KakaoMap from "../components/tourMap/KakaoMap";
import Temp from "../components/tourMap/Temp";
import Header from "../layout/Header"

export default function TourMap() {
  return (
    <RootPage>
      < Header/>
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
