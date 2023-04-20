import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherShortMainPage from "../pages/WeatherShortMainPage";
import AirPage from "../pages/AirPage";
import WeatherShortSubPage from "../pages/WeatherShortSubPage";
import SearchMapPage from "../pages/SearchMapPage";
import Header from "../layout/Header";
import RecommendMapPage from "../pages/RecommendMapPage";

export default function Router() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Header />}>
          <Route
            path=""
            element={<WeatherShortMainPage location={location} />}
          />
          <Route
            path="weather/sub"
            element={<WeatherShortSubPage location={location} />}
          />
          <Route
            path="air/realtime"
            element={<AirPage location={location} />}
          />
          <Route path="tour/search" element={<SearchMapPage />} />
          <Route path="tour/recommend" element={<RecommendMapPage />} />
          {/* <Route path="tour/common" element={<TourInfoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
