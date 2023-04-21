import React, { useCallback, useEffect, useState } from "react";
import RecommendMap from "../components/tourMap/recommend/RecommendMap";
import { PageWrap } from "./WeatherShortMainPage";
import TourInfoModal from "../components/tourInfo/TourInfoModal";
import { getTourInfo } from "../utils/lib/api";
import Ranking from "../components/tourMap/recommend/Ranking";

export default function RecommendMapPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const showModal = (props) => {
    setModalInfo(props);
    setModalOpen(true);
  };

  // 랭킹에 따라서 보여줄 positions들
  const [selectedPositions, setSelectedPositions] = useState([]);

  const [allRank, setAllRank] = useState([]);

  const handleSelected = (spots) => {
    setSelectedPositions(spots);
  };

  const getTourRecommend = useCallback(async (key, token) => {
    try {
      const { data } = await getTourInfo(key);
      if (data.resultCode === 200) {
        const rankingArr = data.data;
        setAllRank(rankingArr);

        /*
        const allData = [];
        rankingArr.forEach((data) => {
          allData.push(...data.spots);
        });
        */

        // 지도에 띄울 장소들을 배열로 저장.
        // 초기화는 allPositions로 할 예정이었는데 데이터의 양이 많아 성능 이슈
        // 따라서 우선 1등 지역의 장소들로 진행.
        setSelectedPositions(rankingArr[0].spots);
      } else {
        // 에러가 발생했을 경우
        console.log(data);
      }
    } catch (e) {
      // api 호출에 실패했을 경우
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getTourRecommend(`${process.env.REACT_APP_BASE_URL}/tour/recommend`);
  }, [getTourRecommend]);
  console.log(selectedPositions);

  return (
    <PageWrap>
      <RecommendMap
        showModal={showModal}
        selectedPositions={selectedPositions}
      />
      <Ranking allRank={allRank} handleSelected={handleSelected} />
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
