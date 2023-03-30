import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherMid from "../pages/WeatherMid";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherMid />} />
      </Routes>
    </BrowserRouter>
  );
}
