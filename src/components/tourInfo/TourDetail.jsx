import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import GlobalStyle from "../../styles/fonts/fonts";
import axios from "axios";
import ImgNotFound from "../../styles/img/ImgNotFound.png";
import { TourButtonWrap, TourButton } from "./TourCommon";

export default function TourDetail({ modalInfo, setWeatherOrAir, weatherOrAir }) {

  const handleWeatherClick = () => {
    setWeatherOrAir(true);
  };

  const handleAirClick = () => {
    setWeatherOrAir(false);
  };
  
  const checkContentType = useCallback((response) => {
    switch (modalInfo.contentTypeId) {
      case 12:
        //관광지
        setTouristSpotState(prevState => {
          const newData = { ...prevState };
          //value값 state update
          Object.entries(response.data).forEach(([key, value]) => {
            newData[key].value = value;
          });
          return newData;
        });
        break;
      case 14:
        //문화시설
        setCultureState(prevState => {
          const newData = { ...prevState };
          //value값 state update
          Object.entries(response.data).forEach(([key, value]) => {
            newData[key].value = value;
          });
          return newData;
        });
        break;
      case 32:
        //숙박
        setLodgingState(prevState => {
          const newData = { ...prevState };
          //value값 state update
          Object.entries(response.data).forEach(([key, value]) => {
            newData[key].value = value;
          });
          return newData;
        });
        break;
      case 39:
        //음식점
        setFoodState(prevState => {
          const newData = { ...prevState };
          //value값 state update
          Object.entries(response.data).forEach(([key, value]) => {
            newData[key].value = value;
          });
          return newData;
        });
        break;
      default:
        break;

    }

  },[modalInfo]);

  const [touristSpotState, setTouristSpotState] = useState({
    chkBabyCarriage: { value: '', label: '유모차 대여 여부' },
    chkCreditCard: { value: '', label: '신용카드 사용가능 여부' },
    chkPet: { value: '', label: '반려동물 동반 가능 여부' },
    expGuide: { value: '', label: '체험안내 정보' },
    infoCenter: { value: '', label: '문의 및 안내' },
    parking: { value: '', label: '주차 시설' },
    restDate: { value: '', label: '쉬는 날' },
    useTime: { value: '', label: '이용 시간' }
  });

  const [cultureState, setCultureState] = useState({
    chkBabyCarriageCulture: { value: '', label: '유모차 대여 여부' },
    chkCreditCardCulture: { value: '', label: '신용카드 가능 여부' },
    chkPetCulture: { value: '', label: '반려동물 동반 가능 여부' },
    discountInfo: { value: '', label: '할인 정보' },
    infoCenterCulture: { value: '', label: '문의 및 안내' },
    parkingCulture: { value: '', label: '주차 시설' },
    parkingFee: { value: '', label: '주차 요금' },
    restDateCulture: { value: '', label: '쉬는 날' },
    useFee: { value: '', label: '이용 요금' },
    useTimeCulture: { value: '', label: '이용 시간' }
  });

  const [foodState, setFoodState] = useState({
    chkCreditCardFood: { value: '', label: '신용카드 가능 여부' },
    discountInfoFood: { value: '', label: '할인 정보' },
    firstMenu: { value: '', label: '대표 메뉴' },
    infoCenterFood: { value: '', label: '문의 및 안내' },
    kidsFacility: { value: '', label: '어린이놀이방 여부' },
    openTimeFood: { value: '', label: '영업 시간' },
    packing: { value: '', label: '포장 가능 여부' },
    parkingFood: { value: '', label: '주차 시설' },
    reservationFood: { value: '', label: '예약 안내' },
    restDateFood: { value: '', label: '쉬는 날' },
    seat: { value: '', label: '좌석 수' },
    smoking: { value: '', label: '금연/흡연 여부' },
    treatMenu: { value: '', label: '취급 메뉴' },
    lcnsno: { value: '', label: '인허가 번호' },
  });

  const [lodgingState, setLodgingState] = useState({
    checkinTime: { value: '', label: '입실 시간' },
    checkoutTime: { value: '', label: '퇴실 시간' },
    chkCooking: { value: '', label: '객실 내 취사 여부' },
    foodPlace: { value: '', label: '식음료장' },
    infoCenterLodging: { value: '', label: '문의 및 안내' },
    parkingLodging: { value: '', label: '주차 시설' },
    pickUp: { value: '', label: '픽업 서비스' },
    reservationLodging: { value: '', label: '예약 안내' },
    reservationUrl: { value: '', label: '예약 안내 홈페이지' },
    roomType: { value: '', label: '객실 유형' },
    subFacility: { value: '', label: '부대시설(기타)' },
    barbecue: { value: '', label: '바베큐장 여부' },
    beauty: { value: '', label: '뷰티시설 정보' },
    beverage: { value: '', label: '식음료장 여부' },
    bicycle: { value: '', label: '자전거 대여 여부' },
    campfire: { value: '', label: '캠프파이어 여부' },
    fitness: { value: '', label: '휘트니스 센터 여부' },
    karaoke: { value: '', label: '노래방 여부' },
    publicBath: { value: '', label: '공용 샤워실 여부' },
    publicPc: { value: '', label: '공용 PC실 여부' },
    sauna: { value: '', label: '사우나실 여부' },
    seminar: { value: '', label: '세미나실 여부' },
    sports: { value: '', label: '스포츠 시설 여부' },
    refundRegulation: { value: '', label: '환불규정' }
  });


  //관광 소개정보 받아오는 api
  const getWeatherMidForecast = useCallback(async () => {
    if (modalInfo) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/tour/detail?contentId=${modalInfo.contentId}&contentTypeId=${modalInfo.contentTypeId}`);
        checkContentType(response)
      } catch (error) {
        console.log(error);
      }
    }
  }, [checkContentType, modalInfo]);

  useEffect(() => {
    getWeatherMidForecast();
  }, [getWeatherMidForecast]);

  return (
    <>
      <GlobalStyle />
      {modalInfo && (touristSpotState || cultureState || lodgingState || foodState) ? (
        <CommonWrap>
          {modalInfo.firstImage ? <StyledImage thumbnail="true" src={modalInfo.firstImage} /> : <StyledImage thumbnail="true" src={ImgNotFound} />}
          <Table>
            <thead>
              <TR>
                <TH >{modalInfo.title}</TH>
              </TR>
            </thead>
            <Tbody>
              {Object.entries(touristSpotState).map(([key, value]) => {
                // value가 '없음'인 경우 렌더링을 생략
                if (value.value === '정보가 없습니다.') {
                  return null;
                }

                return (
                  <TR key={key}>
                    <TD space="nowrap" color="#BEE1A7" fontColor="white">{value.label}</TD>
                    <TD color="#F9FFF5">
                      <Scroll>
                      <div dangerouslySetInnerHTML={{ __html: value.value }}></div>
                      </Scroll>
                    </TD>
                  </TR>
                );
              })}
            </Tbody>
          </Table>
          <TourButtonWrap>
            <TourButton onClick={handleWeatherClick} color={weatherOrAir? "#BEE1A7" : "#969696"}>날씨</TourButton>
            <TourButton onClick={handleAirClick} color={weatherOrAir? "#969696" : "#BEE1A7"}>대기</TourButton>
          </TourButtonWrap>
        </CommonWrap>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export const CommonWrap = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  height:auto;
  justify-content:center;
`

export const StyledImage = styled(Image)`
  height:60%;
  width:70%;
`;



export const Table = styled.table`
  display: flex;
  align-items: center;
  color:#969696;
  font-size:0.8rem;
  padding: 0.2rem 0;
  flex-direction: column;
  margin:0.2rem;
`;

export const TD = styled.td`
  text-align: center;
  padding: 0 0.3rem 0rem 0.3rem;
  overflow-y: scroll;
  align-items: center;
  white-space: ${(props) => props.space} ;
  padding:0.4rem;
  border-top: 0px;
  border-bottom: 0px;
  background-color: ${(props) => props.color} ;
  color:${(props) => props.fontColor || '#69765F'};
`;

const Scroll = styled.div`

`
const TR = styled.tr`
  border: 1px solid white;
  color:#69765F;
`
const TH = styled.th`
  padding:0.5rem;
  font-size:1.3rem;
  text-decoration: underline;
  text-decoration-color:#BEE1A7;
  text-decoration-thickness: 6px;

`
const Tbody = styled.tbody`
  overflow-y: scroll;
  height:11rem;


`
