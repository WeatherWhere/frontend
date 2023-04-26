import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherShortMainPage from "../pages/WeatherShortMainPage";
import AirPage from "../pages/AirPage";
import WeatherShortSubPage from "../pages/WeatherShortSubPage";
import SearchMapPage from "../pages/SearchMapPage";
import Header from "../layout/Header";
import RecommendMapPage from "../pages/RecommendMapPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Header />}>
          <Route path="" element={<WeatherShortMainPage />} />
          <Route path="weather/sub" element={<WeatherShortSubPage />} />
          <Route path="air/realtime" element={<AirPage />} />
          <Route path="tour/search" element={<SearchMapPage />} />
          <Route path="tour/recommend" element={<RecommendMapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
