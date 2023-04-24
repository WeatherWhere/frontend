import { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
    AIR_ICON,
    RECOMMEND_MAP_ICON,
    SEARCH_MAP_ICON,
    WEATHER_ICON,
    SUB_WEATHER
} from "../utils/const/icon";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import WeatherWhereLogoText from "../styles/img/WeatherWhereLogoText.svg";

export default function SideBar({ setShowSidebar }) {

    const iconList = [].concat(WEATHER_ICON, SUB_WEATHER, AIR_ICON, RECOMMEND_MAP_ICON, SEARCH_MAP_ICON);

    const modalRef = useRef(null);

    useEffect(() => {
        // 이벤트 핸들러 함수
        const handler = (event) => {
            // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                event.preventDefault();
                setShowSidebar(false);
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

    const toggleSidebar = () => {
        setShowSidebar(false);
    };


    return (
        <SideBarWrap ref={modalRef}>
            <Logo
                src={WeatherWhereLogoText}
                alt="logo"
                onClick={() => (window.location.href = "/")}
                height="5rem"
            />
            {iconList.map((icon, index) => (
                <>
                    <Link key={index} to={icon.link} onClick={toggleSidebar} style={{ textDecoration: 'none' }}>
                        <SideContainer >
                            <SideIcon size="2.5rem" name={icon.name} color={icon.color} />
                            <SideText>{icon.title}</SideText>
                        </SideContainer >

                    </Link>
                </>
            ))
            }
        </SideBarWrap >
    )
}

const SideText = styled.div`
   color:#737682;
   font-size:0.9rem;
`

export const SideIcon = styled(Icon).attrs((props) => ({
    icon: props.name,
    style: {
        fontSize: props.size,
    },
}))`
    /* 공통 스타일 요소 */
    color: white;
    padding: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right:1rem;
  `;

const SideBarWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding:1rem;
  height: 100vh;
  width: 60%;
  background-color: white;
  z-index: 10000;
  animation: slide-up 1s ease;
  box-shadow: 3px 3px 11px rgba(0, 0, 0, 0.1);
  display:flex;
  align-items:flex-star;
  flex-direction:column;
  @keyframes slide-up {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }`;

const SideContainer = styled.div`
    display:flex;
    align-items:center;
    width:100%;
    padding:0.5rem 0.4rem 0.5rem 0.4rem;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
    border-radius:20px;
    margin-bottom:1rem;

`


const Logo = styled.img`
  height: ${(props) => props.height};
  margin-bottom: 3rem;
`;