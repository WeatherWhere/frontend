import React from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import ShortSub from "../components/weather/weatherShortSub/ShortSub";

const PageWrap = styled.section`
  height: 100vh;
`;
export default function WeatherShortSubPage({ location }) {
  return (
    <PageWrap>
      <ShortSub location={location} />
    </PageWrap>
  );
}
