import React from "react";
import Temp from "../components/tourMap/Temp";
import RecommendMap from "../components/tourMap/recommend/RecommendMap";
import { PageWrap } from "./WeatherShortMainPage";

export default function RecommendMapPage() {
  return (
    <PageWrap>
      <RecommendMap />
      <Temp />
    </PageWrap>
  );
}
