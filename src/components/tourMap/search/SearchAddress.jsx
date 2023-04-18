import {useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SearchAddress() {
  const [searchAddress, setSearchAddress] = useState("");
  const navigate = useNavigate();

  const onSearchInputChange = (event) => {
    setSearchAddress(event.target.value);
  };

  const onAddressSearch = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchAddress, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const location = result[0];
        if (location) {
        navigate(`/tour2/searchmap/${location.y}/${location.x}`);

        }

      }
    });
  };

  return (
    <SearchOverlay>
      <input type="text" value={searchAddress} onChange={onSearchInputChange} />
      <button onClick={onAddressSearch}>검색</button>
    </SearchOverlay>
  );
};



export const SearchOverlay = styled.div`
  position: absolute;
  border-radius: 10px;
  z-index:5;
  padding:4rem;
`;
