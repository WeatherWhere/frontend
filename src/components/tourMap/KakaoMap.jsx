import React, { useEffect, useRef, useState } from "react";
import { KAKAO_MAP_DATA } from "../../utils/const/position";
import { MARKER } from "../../utils/const/marker";
import LogoGroup from "../../styles/img/LogoGroup.svg";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  const [level, setLevel] = useState(13);
  const [tourPositions, setTourPositions] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState();

  const mapRef = useRef();

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  const EventMarkerContainer = ({
    tourInfo,
    index,
    handleClick,
    isClicked,
  }) => {
    const { mapx, mapy } = tourInfo;

    const [isOver, setIsOver] = useState(false);

    const normalOrigin = { x: 0, y: 0 }; // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
    const clickOrigin = { x: MARKER.MARKER_WIDTH + MARKER.SPRITE_GAP, y: 0 }; // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
    const overOrigin = {
      x: MARKER.MARKER_WIDTH + MARKER.OVER_MARKER_WIDTH + MARKER.SPRITE_GAP * 2,
      y: 0,
    }; // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표

    let spriteOrigin = isOver ? overOrigin : normalOrigin;

    if (isClicked) {
      spriteOrigin = clickOrigin;
    }

    return (
      <MapMarker
        position={{ lat: mapy, lng: mapx }} // 마커를 표시할 위치
        image={{
          src: LogoGroup,
          size: {
            width: MARKER.OVER_MARKER_WIDTH,
            height: MARKER.OVER_MARKER_HEIGHT,
          },
          options: {
            offset: {
              x: MARKER.OFFSET_X,
              y: MARKER.OFFSET_Y,
            },
            spriteSize: {
              width: MARKER.SPRITE_WIDTH,
              height: MARKER.SPRITE_HEIGHT,
            },
            spriteOrigin: spriteOrigin,
          },
        }}
        onClick={handleClick}
        onMouseOver={() => setIsOver(true)}
        onMouseOut={() => setIsOver(false)}
      ></MapMarker>
    );
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
        {tourPositions.map((tourInfo, index) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${tourInfo.contentId}`}
            index={index}
            tourInfo={tourInfo}
            handleClick={() => setSelectedMarker(index)}
            isClicked={selectedMarker === index}
          />
        ))}
      </MarkerClusterer>
      {/* <ZoomControl /> */}
    </Map>
  );
}
