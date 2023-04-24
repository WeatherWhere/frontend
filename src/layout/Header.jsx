import styled from "styled-components";
import WeatherWhereLogoText from "../styles/img/WeatherWhereLogoText.svg";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { StyledIcon } from "../components/weather/weatherShortMainNow/WeatherShortMainNow";
import {
  AIR_ICON,
  RECOMMEND_MAP_ICON,
  SEARCH_MAP_ICON,
  WEATHER_ICON,
} from "../utils/const/icon";
import SideBar from "./SideBar";

export default function Header() {
  const [infoIcon, setInfoIcon] = useState(AIR_ICON);
  const [mapIcon, setMapIcon] = useState(SEARCH_MAP_ICON);

  const handleInfoIconClick = () => {
    if (infoIcon === AIR_ICON) {
      setInfoIcon(WEATHER_ICON);
    } else {
      setInfoIcon(AIR_ICON);
    }
  };

  const handleMapIconClick = () => {
    if (mapIcon === SEARCH_MAP_ICON) {
      setMapIcon(RECOMMEND_MAP_ICON);
    } else {
      setMapIcon(SEARCH_MAP_ICON);
    }
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Container>
        <LeftWrapper>
          <StyledIcon
            name="material-symbols:menu-rounded"
            color="B4B4B4"
            size="2rem"
          onClick={toggleSidebar}/>
        </LeftWrapper>
        {showSidebar && <SideBar setShowSidebar={setShowSidebar}/>}

        <LogoWrapper>
          <Logo
            src={WeatherWhereLogoText}
            alt="logo"
            onClick={() => (window.location.href = "/")}
          />
        </LogoWrapper>
        <IconWrapper>
          <Link key={infoIcon.name} to={infoIcon.link}>
            <StyledIcon
              key={infoIcon.name}
              name={infoIcon.name}
              size="2rem"
              color={infoIcon.color}
              margin="0.2rem"
              onClick={handleInfoIconClick}
            />
          </Link>
          <Link key={mapIcon.name} to={mapIcon.link}>
            <StyledIcon
              key={mapIcon.name}
              name={mapIcon.name}
              size="2rem"
              color={mapIcon.color}
              margin="0.2rem"
              onClick={handleMapIconClick}
            />
          </Link>
        </IconWrapper>
      </Container>
      {/* 일정한 뷰를 위해 Outlet을 감싸는 컴포넌트 필요 */}
      <Outlet />
    </>
  );
}



const Container = styled.header`
  display: flex;
  padding: 0.1rem;
  background-color: #fff;
  height: 3.6rem;
  width: calc(var(--vw, 1vh) * 100);
  z-index: 6;
`;

export const Logo = styled.img`
  height: 3rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

const LeftWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;
