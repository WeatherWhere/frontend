import React from "react";
import ShortSub from "../components/weather/weatherShortSub/ShortSub";
import { PageWrap } from "./WeatherShortMainPage";

export default function WeatherShortSubPage({ location }) {
  return (
    <PageWrap>
      <ShortSub location={location} />
    </PageWrap>
  );
}
