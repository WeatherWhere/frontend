import { useCallback, useState } from "react";

import styled from "styled-components";
import { getTourInfo } from "../../../utils/lib/api";

export default function SearchAddress(props) {
  const { handleSearchedPositions } = props;

  const [searchAddress, setSearchAddress] = useState("");
  const [isProper, setIsProper] = useState(true);

  const getTourSearched = useCallback(async (key, searchLocation, token) => {
    try {
      const { data } = await getTourInfo(key);
      if (data.resultCode === 200) {
        handleSearchedPositions(data.data, searchLocation);
        setIsProper(true);
      } else {
        // 에러가 발생했을 경우
        console.log(data);
      }
    } catch (e) {
      // api 호출에 실패했을 경우
      console.log(e);
    }
  }, []);

  const onSearchInputChange = (event) => {
    setSearchAddress(event.target.value);
    setIsProper(true);
  };

  const onAddressSearch = async () => {
    // 입력된 정보가 없을 경우에는 요청을 처리하지 않도록 예외처리
    if (searchAddress === "") {
      setIsProper(false);
      return;
    }
    try {
      const geocoder = new window.kakao.maps.services.Geocoder();
      await geocoder.addressSearch(searchAddress, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const location = result[0];
          if (location) {
            getTourSearched(
              `${process.env.REACT_APP_BASE_URL}/tour/search?contentTypeId=12&x=${location.x}&y=${location.y}`,
              location
            );
          }
          return;
        } else {
          // 잘못된 주소를 입력하여 status == ZERO_RESULT인 경우
          console.log("??");
          setIsProper(false);
        }
      });
      setSearchAddress("");
    } catch (e) {
      console.log(e);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onAddressSearch();
    }
  };
  console.log(isProper);

  return (
    <>
      <SearchOverlay>
        <StInput
          type="text"
          value={searchAddress}
          placeholder={isProper ? "지역을 입력하세요." : "잘못된 검색입니다."}
          onChange={onSearchInputChange}
          onKeyPress={onKeyPress}
        />
        <StButton onClick={onAddressSearch}>검색</StButton>
      </SearchOverlay>
    </>
  );
}

export const SearchOverlay = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 18rem;
  height: 2rem;
  border-radius: 10px;
  z-index: 1000;

  top: 3rem;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StInput = styled.input`
  width: 80%;
  outline: none;
`;

const StButton = styled.button`
  width: 20%;
  border: 0.01rem solid;
  background-color: white;
  border-radius: 0 10px 10px 0;
`;
