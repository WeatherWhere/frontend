import React, { useState } from "react";
import SearchMap from "../components/tourMap/search/SearchMap";
import WeatherShortMainAll from "../components/weather/weatherShortMainAll/WeatherShortMainAll";
import { useParams } from "react-router-dom";
import { PageWrap } from "./WeatherShortMainPage";

export default function SearchMapPage() {
  const { lat, lng } = useParams();

  const [location] = useState({
    latitude: parseFloat(lat),
    longitude: parseFloat(lng),
  });

  return (
    <PageWrap>
      <SearchMap />
      <WeatherShortMainAll location={location} />
    </PageWrap>
  );
}
