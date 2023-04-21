import { useCallback, useState } from "react";

import styled from "styled-components";
import { getTourInfo } from "../../../utils/lib/api";

export default function SearchAddress(props) {
  const { handleSearchedPositions } = props;

  const [searchAddress, setSearchAddress] = useState("");

  const getTourSearched = useCallback(async (key, searchLocation, token) => {
    try {
      const { data } = await getTourInfo(key);
      if (data.resultCode === 200) {
        handleSearchedPositions(data.data, searchLocation);
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
  };

  const onAddressSearch = async () => {
    try {
      const geocoder = new window.kakao.maps.services.Geocoder();
      await geocoder.addressSearch(searchAddress, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const location = result[0];
          if (location) {
            console.log(location);
            getTourSearched(
              `${process.env.REACT_APP_BASE_URL}/tour/search?contentTypeId=12&x=${location.x}&y=${location.y}`,
              location
            );
          }
        } else {
          console.log(result);
        }
      });
      setSearchAddress("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SearchOverlay>
      <StInput
        type="text"
        value={searchAddress}
        placeholder="지역을 입력하세요."
        onChange={onSearchInputChange}
      />
      <StButton onClick={onAddressSearch}>검색</StButton>
    </SearchOverlay>
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

  top: 6rem;
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
