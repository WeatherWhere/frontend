import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { KAKAO_MAP_DATA } from "../../utils/const/position";
import logotest from "../../styles/img/logotest.png";

const { kakao } = window;

export default function KakaoMap() {
  const [tourPositions, setTourPositions] = useState([]);

  const markerImgSrc = logotest;
  const markerImgSize = new kakao.maps.Size(64, 69);
  const markerOption = { offset: new kakao.maps.Point(27, 69) };

  const markerImg = new kakao.maps.MarkerImage(
    markerImgSrc,
    markerImgSize,
    markerOption
  );

  useEffect(() => {
    fetch("/mock/tour_data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTourPositions(data.position);
      });
  }, []);

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
      // disableClickZoom: true,
    });

    const markers = tourPositions.map((tourPosition, idx) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(tourPosition.mapy, tourPosition.mapx),
        image: markerImg,
      });

      const closeOverlay = () => {
        overlay.setMap(null);
      };

      const content = `<div className="wrap">
          <div className="info">
            <div className="title">
              ${tourPosition.title}
              <div
                class="close"
                onClick={handleCloseOverlay}
                title="닫기"
              ></div>
            </div>
            <div className="body">
              <div className="img">
                <img src=${logotest} alt="logo" width=${73} height=${70} />
              </div>
            </div>
          </div>
        </div>`;

      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: marker.getPosition(),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(map);
      });

      return marker;
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
