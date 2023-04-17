import React from "react";
import styled from "styled-components";
import Header from "../layout/Header"
import WeatherShortMainNow from "../components/weather/weatherShortMainNow/WeatherShortMainNow"
import WeatherShortMainAll from "../components/weather/weatherShortMainAll/WeatherShortMainAll"
import WeatherMidMainAll from "../components/weather/WeatherMidMainAll";
import { useState } from "react";


const PageWrap = styled.section`
  height:100vh;
`

export default function WeatherShortMainPage({ location }) {

  const [nowOrMid, setNowOrMid] = useState(true); 

  return (
    <PageWrap>
      <Header />
        <WeatherShortMainNow location={location} setNowOrMid={setNowOrMid}/>
        {nowOrMid ? (
        <WeatherShortMainAll location={location} />
      ) : (
        <WeatherMidMainAll location={location} />
      )}
    </PageWrap>
  )
}
