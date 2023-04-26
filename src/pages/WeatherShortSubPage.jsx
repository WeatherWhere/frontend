import React, { useEffect, useState } from "react";
import ShortSub from "../components/weather/weatherShortSub/ShortSub";
import { PageWrap } from "./WeatherShortMainPage";

export default function WeatherShortSubPage() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
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
    <PageWrap>
      <ShortSub location={location} />
    </PageWrap>
  );
}
