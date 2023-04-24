import React, { useRef, useState } from "react";
import { KAKAO_MAP_DATA } from "../../../utils/const/position";
import { MARKER } from "../../../utils/const/marker";
import LogoGroup from "../..//../styles/img/LogoGroup.svg";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
  useMap,
} from "react-kakao-maps-sdk";
import CustomOverlayBox from "../common/CustomOverlayBox";

export default function RecommendMap(props) {
  const { showModal, selectedPositions } = props;
  const [level, setLevel] = useState(13);
  const [selectedMarker, setSelectedMarker] = useState();

  const mapRef = useRef();

  const normalOrigin = { x: 0, y: 0 }; // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
  const clickOrigin = { x: MARKER.MARKER_WIDTH + MARKER.SPRITE_GAP, y: 0 }; // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
  const overOrigin = {
    x: MARKER.MARKER_WIDTH + MARKER.OVER_MARKER_WIDTH + MARKER.SPRITE_GAP * 2,
    y: 0,
  }; // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표

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
    const { latitude, longitude } = tourInfo;

    const [isOver, setIsOver] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(isClicked);

    const map = useMap();
    const handleOverlayClick = (marker) => {
      handleClick();
      setIsModalOpen(true);
      map.panTo(marker.getPosition());
    };

    let spriteOrigin = isOver ? overOrigin : normalOrigin;

    if (isClicked) {
      spriteOrigin = clickOrigin;
    }

    return (
      <>
        <MapMarker
          position={{ lat: latitude, lng: longitude }} // 마커를 표시할 위치
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
          onClick={handleOverlayClick}
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
        />
        {isModalOpen && (
          <CustomOverlayMap
            position={{ lat: latitude, lng: longitude }}
            xAnchor={0.38}
            yAnchor={1.5}
            zIndex={999}
          >
            <CustomOverlayBox
              tourInfo={tourInfo}
              setIsModalOpen={setIsModalOpen}
              showModal={showModal}
            />
          </CustomOverlayMap>
        )}
      </>
    );
  };

  return (
    <>
      <Map
        center={{
          lat: KAKAO_MAP_DATA.CENTER_LAT,
          lng: KAKAO_MAP_DATA.CENTER_LNG,
        }}
        isPanto={true}
        style={{
          width: "100%",
          height: "72%",
          borderRadius: "10px",
          position: "relative",
        }}
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
          {selectedPositions.map((tourInfo, index) => (
            <EventMarkerContainer
              key={`EventMarkerContainer-${tourInfo.contentId}-${index}`}
              index={index}
              tourInfo={tourInfo}
              handleClick={() => setSelectedMarker(index)}
              isClicked={selectedMarker === index}
            />
          ))}
        </MarkerClusterer>
      </Map>
    </>
  );
}
