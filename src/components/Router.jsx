import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AirForecast from "../pages/AirForecast";
import AirRealtime from "../pages/AirRealtime";
import WeatherMid from "../pages/WeatherMid";
import WeatherShortMain from "../pages/WeatherShortMain";
import WeatherShortSub from "../pages/WeatherShortSub";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/weathermid" element={<WeatherMid />} />
        <Route path="/weathershortmain" element={<WeatherShortMain />} />
        <Route path="/weathershortsub" element={<WeatherShortSub />} />
        <Route path="/airrealtime" element={<AirRealtime />} />
        <Route path="/airforecast" element={<AirForecast />} />
      </Routes>
    </BrowserRouter>
  );
}
