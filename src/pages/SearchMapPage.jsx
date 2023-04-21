import React, { useCallback, useEffect, useState } from "react";
import SearchMap from "../components/tourMap/search/SearchMap";
import WeatherShortMainAll from "../components/weather/weatherShortMainAll/WeatherShortMainAll";
import { PageWrap } from "./WeatherShortMainPage";
import { getTourInfo } from "../utils/lib/api";

export default function SearchMapPage({ location }) {
  const getTourSearched = useCallback(async (key, token) => {
    try {
      const { data } = await getTourInfo(key);
      if (data.resultCode === 200) {
        console.log(data);
      } else {
        // 에러가 발생했을 경우
        console.log(data);
      }
    } catch (e) {
      // api 호출에 실패했을 경우
      console.log(e);
    }
  }, []);

  return (
    <PageWrap>
      <SearchMap location={location} />
      <WeatherShortMainAll location={location} />
    </PageWrap>
  );
}
