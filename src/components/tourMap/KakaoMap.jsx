import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { KAKAO_MAP_DATA } from "../../utils/const/position";

const { kakao } = window;

export default function KakaoMap() {
  const [tourPositions, setTourPositions] = useState([]);

  useEffect(() => {
    fetch("/mock/tour_data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTourPositions(data.position);
      });
  }, []);

  console.log(tourPositions);
  useEffect(() => {
    const map = new kakao.maps.Map(document.getElementById("map"), {
      center: new kakao.maps.LatLng(
        KAKAO_MAP_DATA.CENTER_LAT,
        KAKAO_MAP_DATA.CENTER_LNG
      ),
      level: 13,
    });

    const clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 10,
    });

    const markers = tourPositions.map((tourPosition, idx) => {
      return new kakao.maps.Marker({
        position: new kakao.maps.LatLng(tourPosition.mapy, tourPosition.mapx),
      });
    });

    clusterer.addMarkers(markers);
  }, [tourPositions]);
  return <StMapWrapper id="map">hi</StMapWrapper>;
}

const StMapWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 72%;
`;
