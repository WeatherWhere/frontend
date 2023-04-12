import React, { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

export default function KakaoMap() {
  useEffect(() => {
    const container = document.getElementById("map");

    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options);
  }, []);
  return <StMapWrapper id="map">hi</StMapWrapper>;
}

const StMapWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 72%;
`;
