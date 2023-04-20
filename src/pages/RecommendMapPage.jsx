import React, { useState } from "react";
import Temp from "../components/tourMap/Temp";
import RecommendMap from "../components/tourMap/recommend/RecommendMap";
import { PageWrap } from "./WeatherShortMainPage";
import TourInfoModal from "../components/tourInfo/TourInfoModal";

export default function RecommendMapPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const showModal = (props) => {
    setModalInfo(props);
    setModalOpen(true);
  };

  return (
    <PageWrap>
      <RecommendMap showModal={showModal} />
      <Temp />
      {modalOpen && (
        <TourInfoModal
          setModalOpen={setModalOpen}
          modalInfo={modalInfo}
          isOpen={modalOpen}
        />
      )}
    </PageWrap>
  );
}
