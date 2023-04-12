import React from "react";
import Header from "../layout/Header";
import WeatherShortMainNow from "../components/weatherShortMainNow/WeatherShortMainNow";
import WeatherShortMainAll from "../components/weatherShortMainAll/WeatherShortMainAll";
import styled from "styled-components";


export default function WeatherShortMainPage() {

  const PageWrap = styled.div`
  height:100vh;
  `
  
  return (
    <PageWrap>
      <Header />
      <WeatherShortMainNow />
      <WeatherShortMainAll />
    </PageWrap>
  )
}
