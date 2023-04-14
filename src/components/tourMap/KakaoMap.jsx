import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { KAKAO_MAP_DATA } from "../../utils/const/position";
import WeatherWhereLogo from "../../styles/img/WeatherWhereLogo.svg";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";

export default function KakaoMap() {
  const [level, setLevel] = useState(13);
  const [tourPositions, setTourPositions] = useState([]);

  const mapRef = useRef();

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  useEffect(() => {
    fetch("/mock/tour_data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTourPositions(data.position);
      });
  }, []);

  return (
    <Map
      center={{
        lat: KAKAO_MAP_DATA.CENTER_LAT,
        lng: KAKAO_MAP_DATA.CENTER_LNG,
      }}
      style={{ width: "100%", height: "72%" }}
      level={level}
      ref={mapRef}
      onZoomChanged={(map) => setLevel(map.getLevel())}
    >
      <MarkerClusterer
        averageCenter={true}
        minLevel={10}
        disableClickZoom={true}
        onClusterclick={onClusterclick}
      >
        {tourPositions.map((pos) => (
          <MapMarker
            key={`${pos.mapy}-${pos.mapx}`}
            position={{ lat: pos.mapy, lng: pos.mapx }}
            image={{
              src: WeatherWhereLogo,
              size: {
                width: 40,
                height: 45,
              },
            }}
          />
        ))}
      </MarkerClusterer>
      {/* <ZoomControl /> */}
    </Map>
  );
}
