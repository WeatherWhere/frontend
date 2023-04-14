import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherShortMainPage from "../pages/WeatherShortMainPage";
import AirPage from "../pages/AirPage";
import TourMap from "../pages/TourMap";
import ShortSub from "./weather/weatherShortSub/ShortSub";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/weather2/mid" element={<WeatherMid />} /> */}
        <Route path="/weather2/short/main" element={<WeatherShortMainPage />} />
        <Route path="/weather2/short/main/sub" element={<ShortSub />} />
        {/* <Route path="/weathershortsub" element={<WeatherShortSub/>} /> */}
        <Route path="/air2/realtime" element={< AirPage/>} />
        {/* <Route path="/air2/forecast" element={<AirForecast />} /> */}
        <Route path="/tour2/map" element={<TourMap />} />
      </Routes>
    </BrowserRouter>
  );
}
