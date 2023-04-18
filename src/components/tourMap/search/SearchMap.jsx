import { useParams } from "react-router-dom";
import { Map, MapMarker, MarkerClusterer, useMap, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { MARKER } from "../../../utils/const/marker";
import LogoGroup from "../../../styles/img/LogoGroup.svg";
import SearchAddress from "./SearchAddress";
import styled from "styled-components";

const SearchMap = () => {
    const [selectedMarker, setSelectedMarker] = useState();

    useEffect(() => {
        fetch("/mock/tour_data.json")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTourPositions(data.position);
            });
    }, []);

    const [tourPositions, setTourPositions] = useState([]);

    const { lat, lng } = useParams();

    const [center] = useState({
        // 지도의 초기 위치
        center: { lat: parseFloat(lat), lng: parseFloat(lng) },
        // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
        isPanto: true,
    });

    const EventMarkerContainer = ({
        tourInfo,
        handleClick,
        isClicked,
    }) => {
        const handleMarkerClick = (marker) => {
            map.panTo(marker.getPosition());
            handleClick();
          };

        const { mapx, mapy } = tourInfo;
        const map = useMap();

        const [isOver] = useState(false);
        const normalOrigin = { x: 0, y: 0 }; // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
        const clickOrigin = { x: MARKER.MARKER_WIDTH + MARKER.SPRITE_GAP, y: 0 }; // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
        const overOrigin = {
            x: MARKER.MARKER_WIDTH + MARKER.OVER_MARKER_WIDTH + MARKER.SPRITE_GAP * 2,
            y: 0,
        }; // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표

        let spriteOrigin = isOver ? overOrigin : normalOrigin;

        if (isClicked) {
            spriteOrigin = clickOrigin;
        }

        return (
            <MapMarker
                position={{ lat: mapy, lng: mapx }} // 마커를 표시할 위치
                image={{
                    src: LogoGroup,
                    size: {
                        width: MARKER.OVER_MARKER_WIDTH,
                        height: MARKER.OVER_MARKER_HEIGHT,
                    },
                    options: {
                        offset: {
                            x: MARKER.OFFSET_X,
                            y: MARKER.OFFSET_Y,
                        },
                        spriteSize: {
                            width: MARKER.SPRITE_WIDTH,
                            height: MARKER.SPRITE_HEIGHT,
                        },
                        spriteOrigin: spriteOrigin,
                    },
                }}
                onClick={handleMarkerClick}
            >
{isClicked && (
    <CustomOverlayMap position={{ lat: mapy, lng: mapx }} yAnchor={-0.5}>
        <InfoWrap>
        <Img src={tourInfo.firstImage} type="rectangle" />
        <Text>{tourInfo.title}</Text>
        </InfoWrap>

    </CustomOverlayMap>

      )}
            </MapMarker>
        );
    };







    return (
        <Map
            center={center.center}
            isPanto={center.isPanto}
            style={{ width: "100%", height: "66%", borderRadius: "10px", position: "relative" }}
            level={9}
        >
            <SearchAddress />

            <MarkerClusterer
                averageCenter={true}
                minLevel={10}
                disableClickZoom={true}
            >
                {tourPositions.map((tourInfo, index) => (
                    <EventMarkerContainer
                        key={`EventMarkerContainer-${tourInfo.contentId}`}
                        index={index}
                        tourInfo={tourInfo}
                        handleClick={() => setSelectedMarker(index)}
                        isClicked={selectedMarker === index}
                    />
                ))}

            </MarkerClusterer>



        </Map>

    );
};

export default SearchMap;


const Text = styled.div`
display:flex
font-size:0.9rem;
color:#969696
`

const InfoWrap = styled.div`
display:flex
justify-content:center;
align-items:center;
width:100px;
height:100px;
`
const Img = styled.img`
width:120px;
height:80px;
object-fit: cover;
`