import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AirForecast from "../pages/AirForecast";
import WeatherMid from "../pages/WeatherMid";
import WeatherShortSub from "../pages/WeatherShortSub";
import WeatherShortMainPage from "../pages/WeatherShortMainPage";
import AirPage from "../pages/AirPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/weather2/mid" element={<WeatherMid />} />
        <Route path="/weather2/short/main" element={<WeatherShortMainPage />} />
        <Route path="/weathershortsub" element={<WeatherShortSub/>} />
        <Route path="/air2/realtime" element={< AirPage/>} />
        <Route path="/air2/forecast" element={<AirForecast />} />
        <Route path="/tourmap" element={<TourMap />} />
      </Routes>
    </BrowserRouter>
  );
}
