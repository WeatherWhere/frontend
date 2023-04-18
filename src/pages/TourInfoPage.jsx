import React, { useState } from "react";
import Header from "../layout/Header"
import SearchMap from "../components/tourMap/search/SearchMap";
import WeatherShortMainAll from "../components/weather/weatherShortMainAll/WeatherShortMainAll";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TourCommon from "../components/tourInfo/TourCommon";


export default function TourInfoPage() {

    const { lat, lng } = useParams();

    const [nowOrAir, setNowOrAir] = useState(true); 

    // const [location] = useState({
    //     latitude: parseFloat(lat),
    //     longitude: parseFloat(lng),
    //   });
    
    const [location] = useState({
        latitude: 37.517331925853,
        longitude: 127.047377408384,
      });
    
    return (
        <RootPage>
            <Header />
            <TourCommon/>
            <WeatherShortMainAll location={location}/>
        </RootPage>
    )
}

const RootPage = styled.section`
  display: flex;
  flex-direction: column;

  height: 100vh;
`;
