import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getTourInfo } from "../../../utils/lib/api";

export default function SearchAddress(props) {
  const { setSearchedPositions } = props;

  const [searchAddress, setSearchAddress] = useState("");

  const getTourSearched = useCallback(async (key, token) => {
    try {
      const { data } = await getTourInfo(key);
      if (data.resultCode === 200) {
        setSearchedPositions(data.data);
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
            getTourSearched(
              `${process.env.REACT_APP_BASE_URL}/tour/search?contentTypeId=12&x=${location.x}&y=${location.y}`
            );
          }
        } else {
          console.log(result);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SearchOverlay>
      <input type="text" value={searchAddress} onChange={onSearchInputChange} />
      <button onClick={onAddressSearch}>검색</button>
    </SearchOverlay>
  );
}

export const SearchOverlay = styled.div`
  position: absolute;
  border-radius: 10px;
  z-index: 1000;
  padding: 4rem;
  top: 12px;
`;
