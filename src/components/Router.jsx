import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherShortMainPage from "../pages/WeatherShortMainPage";
import AirPage from "../pages/AirPage";
import TourMap from "../pages/TourMap";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
          {/* <Route path="/weather2/mid" element={<WeatherMid />} /> */}
          <Route path="/" element={<WeatherShortMainPage location={location} />} />
          <Route path="/weather2/short/main/sub" element={<WeatherShortSubPage location={location} />} />
          {/* <Route path="/weathershortsub" element={<WeatherShortSub/>} /> */}
          <Route path="/air2/realtime" element={< AirPage location={location} />} />
          {/* <Route path="/air2/forecast" element={<AirForecast />} /> */}
          <Route path="/tour2/map" element={<TourMap />} />
        </Routes>
    </BrowserRouter>
  );
}
