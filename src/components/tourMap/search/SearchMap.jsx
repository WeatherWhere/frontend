import { Map, MapMarker, useMap, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState } from "react";
import { MARKER } from "../../../utils/const/marker";
import LogoGroup from "../../../styles/img/LogoGroup.svg";
import SearchAddress from "./SearchAddress";
import styled from "styled-components";
import CustomOverlayBox from "../common/CustomOverlayBox";
import { Button } from "../../airRealTime/AirRealTime";

const SearchMap = (props) => {
  const { searchLocation, setSearchLocation, showModal, handleCategory } =
    props;

  const [searchedPositions, setSearchedPositions] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState();

  const normalOrigin = { x: 0, y: 0 }; // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
  const clickOrigin = { x: MARKER.MARKER_WIDTH + MARKER.SPRITE_GAP, y: 0 }; // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
  const overOrigin = {
    x: MARKER.MARKER_WIDTH + MARKER.OVER_MARKER_WIDTH + MARKER.SPRITE_GAP * 2,
    y: 0,
  }; // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표

  const handleSearchedPositions = (data, location) => {
    setSearchedPositions(data);
    setSearchLocation((prev) => ({
      ...prev,
      latitude: location.y,
      longitude: location.x,
    }));
  };

  const EventMarkerContainer = ({
    tourInfo,
    index,
    handleClick,
    isClicked,
  }) => {
    // 검색했을 시 위,경도는 mapx, mapy로 주고 있음.
    const { mapx, mapy } = tourInfo;
    const [isOver, setIsOver] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(isClicked);

    const map = useMap();
    const handleMarkerClick = (marker) => {
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
          onClick={handleMarkerClick}
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
        />
        {isModalOpen && (
          <CustomOverlayMap
            position={{ lat: mapy, lng: mapx }}
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
    <Map
      center={{ lat: searchLocation.latitude, lng: searchLocation.longitude }}
      isPanto={true}
      style={{
        width: "100%",
        height: "72%",
        borderRadius: "10px",
        position: "relative",
      }}
      level={9}
    >
      {searchedPositions.map((tourInfo, index) => (
        <EventMarkerContainer
          key={`EventMarkerContainer-${tourInfo.contentId}-${index}`}
          index={index}
          tourInfo={tourInfo}
          handleClick={() => setSelectedMarker(index)}
          isClicked={selectedMarker === index}
        />
      ))}
      <ButtonWrapper>
        <Button onClick={() => handleCategory("weather")}>날씨</Button>
        <Button onClick={() => handleCategory("air")}>대기</Button>
      </ButtonWrapper>
      <SearchAddress handleSearchedPositions={handleSearchedPositions} />
    </Map>
  );
};

export default SearchMap;

export const Text = styled.div`
  display: flex;
  font-size: 0.9rem;
  color: #969696;
`;

export const InfoWrap = styled.div`
display:flex
justify-content:center;
align-items:center;
width:100px;
height:100px;
`;

export const Img = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 28%;

  z-index: 1000;
`;
