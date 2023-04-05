import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AirForecast from "../pages/AirForecast";
import AirRealtime from "../pages/AirRealtime";
import WeatherMid from "../pages/WeatherMid";
import WeatherShortSub from "../pages/WeatherShortSub";
import WeatherShortMainPage from "../pages/WeatherShortMainPage";
import WeatherShortMain from "./WeatherShortMain";
import WeatherShortMainNow from "./WeatherShortMainNow";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/weathermid" element={<WeatherMid />} />
        <Route path="/weathershortmain" element={<WeatherShortMainPage />} />
        <Route path="/weathershortsub" element={<WeatherShortSub/>} />
        <Route path="/airrealtime" element={<AirRealtime />} />
        <Route path="/airforecast" element={<AirForecast />} />
      </Routes>
    </BrowserRouter>
  );
}
