import React from "react";
import styled from "styled-components";
import Header from "../layout/Header"
import WeatherShortMainNow from "../components/weather/weatherShortMainNow/WeatherShortMainNow"
import WeatherShortMainAll from "../components/weather/weatherShortMainAll/WeatherShortMainAll"

export default function WeatherShortMainPage() {

  const PageWrap = styled.section`
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
