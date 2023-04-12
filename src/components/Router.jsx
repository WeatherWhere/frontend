import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AirForecast from "../pages/test/AirForecast";
import AirRealtime from "../pages/test/AirRealtime";
import WeatherMid from "../pages/test/WeatherMid";
import WeatherShortSub from "../pages/test/WeatherShortSub";
import WeatherShortMainPage from "../pages/WeatherShortMainPage";
import TourMap from "../pages/TourMap";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/weathermid" element={<WeatherMid />} /> */}
        <Route path="/weathershortmain" element={<WeatherShortMainPage />} />
        {/* <Route path="/weathershortsub" element={<WeatherShortSub />} /> */}
        {/* <Route path="/airrealtime" element={<AirRealtime />} /> */}
        {/* <Route path="/airforecast" element={<AirForecast />} /> */}
        <Route path="/tourmap" element={<TourMap />} />
      </Routes>
    </BrowserRouter>
  );
}
