import React, { useState } from "react";
import SearchMap from "../components/tourMap/search/SearchMap";
import WeatherShortMainAll from "../components/weather/weatherShortMainAll/WeatherShortMainAll";
import { PageWrap } from "./WeatherShortMainPage";
import TourInfoModal from "../components/tourInfo/TourInfoModal";
import AirSubBottom from "../components/airRealTime/AirSubBottom";

export default function SearchMapPage({ location }) {
  const [searchLocation, setSearchLocation] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [category, setCategory] = useState("weather");

  const handleCategory = (category) => {
    setCategory(category);
  };

  const showModal = (props) => {
    setModalInfo(props);
    setModalOpen(true);
  };

  return (
    <PageWrap>
      <SearchMap
        showModal={showModal}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        handleCategory={handleCategory}
      />
      {category === "weather" ? (
        <WeatherShortMainAll location={searchLocation} />
      ) : (
        <AirSubBottom location={searchLocation} />
      )}

      {modalOpen && (
        <TourInfoModal
          setModalOpen={setModalOpen}
          modalInfo={modalInfo}
          isOpen={modalOpen}
        />
      )}
    </PageWrap>
  );
}
