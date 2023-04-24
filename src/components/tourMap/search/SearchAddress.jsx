import { useCallback, useState } from "react";

import styled from "styled-components";
import { getTourInfo } from "../../../utils/lib/api";
import GlobalStyle from "../../../styles/fonts/fonts";
import { StyledIcon } from "../../airRealTime/AirSubBottom";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          placeholder={isProper ? "      지역을 입력해주세요!" : "      잘못된 검색입니다."}
          onChange={onSearchInputChange}
          onKeyPress={onKeyPress}
        />
        <StButton onClick={onAddressSearch}>
        <StyledIcon name="ic:baseline-search" size="1.7rem" color="#8DAD7C"/>

        </StButton>
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
  border-radius: 20px;
  z-index: 1000;
  top: 3rem;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(243, 245, 242, 0.8);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
  border-radius: 15.5px;
  border: 1px solid #8DAD7C;
  height:2.4rem;
  `;

const StInput = styled.input`
  width: 100%;
  border-radius:10px;
  border: none;
  text-align:center;
  background-color: rgba(232, 250, 235, 0);
  color:#728D64;
  &:focus {
    outline: none;     
  }
  ::placeholder {
    color: #A3AE9D;
    letter-spacing: 0.1em;
    font-size:medium;
  }
`;

const StButton = styled.button`
  border: 0.01rem solid;
  border-radius:10px;
  border:0px;
  background-color: rgba(232, 250, 235, 0);

`;
