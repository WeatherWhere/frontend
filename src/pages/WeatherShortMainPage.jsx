import React from "react";
import Header from "../layout/Header";
import WeatherShortMainNow from "../components/weatherShortMainNow/WeatherShortMainNow";

export default function WeatherShortMainPage() {
  return (
    <div>
      <Header />
      <WeatherShortMainNow />
    </div>
  );
}
