import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherShortMainPage from "../pages/WeatherShortMainPage";
import AirPage from "../pages/AirPage";
import WeatherShortSubPage from "../pages/WeatherShortSubPage";
import SearchMapPage from "../pages/SearchMapPage";
import Header from "../layout/Header";
import RecommendMapPage from "../pages/RecommendMapPage";
import TourInfoPage from "../pages/TourInfoPage";

export default function Router() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  // useEffect(() => {
  //   const getLocation = () => {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLocation({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   };

  //   console.log("routes" + location.longitude)
  //   getLocation();

  //   // 1시간(3,600,000밀리초)마다 위치 정보를 갱신합니다.
  //   const intervalId = setInterval(() => {
  //     getLocation();
  //   }, 3600000);

  //   // 컴포넌트가 언마운트될 때 interval을 해제합니다.
  //   return () => clearInterval(intervalId);
  // }, [location.longitude, location.latitude]);

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
          <Route path="tour/common" element={<TourInfoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
