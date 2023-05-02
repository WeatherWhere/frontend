import React, { useEffect, useRef, useState } from "react";
import WeatherShortMainAll from "../weather/weatherShortMainAll/WeatherShortMainAll";
import styled from "styled-components";
import TourCommon from "./TourCommon";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TourDetail from "./TourDetail";
import { CLOSE_ICON } from "../../utils/const/icon";
import { Icon } from "@iconify/react";
import AirSubBottom from "../airRealTime/AirSubBottom";

export default function TourInfoModal(props) {
  const handleWeatherClick = () => {
    setWeatherOrAir(true);
  };

  const handleAirClick = () => {
    setWeatherOrAir(false);
  };

  const { isOpen, setModalOpen, modalInfo } = props;
  console.log(`modalInfo`, modalInfo);

  const location = {
    latitude: modalInfo.latitude ? modalInfo.latitude : modalInfo.mapy,
    longitude: modalInfo.longitude ? modalInfo.longitude : modalInfo.mapx,
  };

  const [weatherOrAir, setWeatherOrAir] = useState(true);

  const modalRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        event.preventDefault();
        setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler, { passive: false });
    document.addEventListener("touchstart", handler, { passive: false }); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler); // 모바일 대응
    };
  });

  return (
    <RootPage ref={modalRef} isOpen={isOpen}>
      <Background>
        <StyledTabs defaultActiveKey="common" className="mb-3" justify>
          <Tab eventKey="common" title="공통 정보">
            <TourCommon
              modalInfo={modalInfo}
              setWeatherOrAir={setWeatherOrAir}
              weatherOrAir={weatherOrAir}
            />
            <TourButtonWrap>
              <TourButton
                onClick={handleWeatherClick}
                color={weatherOrAir ? "#BEE1A7" : "#969696"}
              >
                날씨
              </TourButton>
              <TourButton
                onClick={handleAirClick}
                color={weatherOrAir ? "#969696" : "#BEE1A7"}
              >
                대기
              </TourButton>
            </TourButtonWrap>
          </Tab>
          <Tab eventKey="detail" title="소개 정보">
            <TourDetail
              modalInfo={modalInfo}
              setWeatherOrAir={setWeatherOrAir}
              weatherOrAir={weatherOrAir}
            />
            <TourButtonWrap>
              <TourButton
                onClick={handleWeatherClick}
                color={weatherOrAir ? "#BEE1A7" : "#969696"}
              >
                날씨
              </TourButton>
              <TourButton
                onClick={handleAirClick}
                color={weatherOrAir ? "#969696" : "#BEE1A7"}
              >
                대기
              </TourButton>
            </TourButtonWrap>
          </Tab>
        </StyledTabs>
      </Background>

      {weatherOrAir ? (
        <WeatherShortMainAll location={location} />
      ) : (
        <AirSubBottom location={location} />
      )}

      <StClose name={CLOSE_ICON.name} onClick={() => setModalOpen(false)} />
    </RootPage>
  );
}
const StyledTabs = styled(Tabs)`
  .nav-link {
    color: #969696;
  }

  .nav-link.active {
    color: #bee1a7;
  }
`;

const Background = styled.div`
  height: 72%;
  align-items: center;
  box-shadow: 3px 3px 11px rgba(0, 128, 0, 0.2);
  margin: 0.4rem;
`;

const RootPage = styled.section`

  height: calc(var(--vh, 1vh) * 100 - 3.6rem);
  width: calc(var(--vw, 1vh) * 100);
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 1100;

  position: absolute;
  top: 0;
  translate: translate(-50%, -50%);
  animation: slide-up 0.8s ease;

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const StClose = styled(Icon).attrs((props) => ({
  icon: props.name,
}))`
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const TourButton = styled.button`
  background-color: #F9FFF5;
  color: ${(props) => props.color};

  &:active{
    background: ${(props) => props.color};
  }
  font-size: 0.9rem;
  border-radius:4px;
  border: none;
  margin:0.2rem;
}
`;

export const TourButtonWrap = styled.div`
  display: flex;
  position: absolute;
  left: 0.7rem;
  bottom: 28.5%;
  z-index: 100;
`;
