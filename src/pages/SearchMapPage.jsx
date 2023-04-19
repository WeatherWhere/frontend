import React, { useState } from "react";
import Header from "../layout/Header";
import SearchMap from "../components/tourMap/search/SearchMap";
import WeatherShortMainAll from "../components/weather/weatherShortMainAll/WeatherShortMainAll";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function SearchMapPage() {
  const { lat, lng } = useParams();

  const [location] = useState({
    latitude: parseFloat(lat),
    longitude: parseFloat(lng),
  });

  return (
    <RootPage>
      <SearchMap />
      <WeatherShortMainAll location={location} />
    </RootPage>
  );
}

const RootPage = styled.section`
  display: flex;
  flex-direction: column;

  height: 100vh;
`;
