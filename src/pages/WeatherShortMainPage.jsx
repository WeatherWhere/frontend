import React from "react";
import WeatherShortMainNow from "../components/WeatherShortMainNow";
import WeatherShortMain from "../components/WeatherShortMain";
import Header from "../layout/Header";

export default function WeatherShortMainPage() {

  return (
    <div>
      <Header/>
      <WeatherShortMainNow />
    </div>
  );
}
