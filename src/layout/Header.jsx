import styled from "styled-components";
import WeatherWhereLogoText from "../styles/img/WeatherWhereLogoText.svg";
import { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { StyledIcon } from "../components/weather/weatherShortMainNow/WeatherShortMainNow";

const Container = styled.header`
  display: flex;
  padding: 0.1rem;
  background-color: #fff;
  height: 3.2rem;
  z-index: 6;
`;

const Logo = styled.img`
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

function Header() {
  const [icons, setIcons] = useState([]);
  const path = window.location.pathname;

  useEffect(() => {
    switch (true) {
      case path.includes("/air"):
        setIcons([
          { name: "ph:sun-bold", color: "FFCD9F", link: "/" },
          { name: "uiw:map", color: "7DD178", link: "/tour/search" },
        ]);
        break;
      case path.includes("/tour"):
        setIcons([
          {
            name: "material-symbols:coronavirus-outline",
            color: "B4B4B4",
            link: "/air/realtime",
          },
          { name: "ph:sun-bold", color: "FFCD9F", link: "/" },
        ]);
        break;
      default:
        setIcons([
          {
            name: "material-symbols:coronavirus-outline",
            color: "B4B4B4",
            link: "/air/realtime",
          },
          { name: "uiw:map", color: "7DD178", link: "/tour/search" },
        ]);
    }
  }, [path]);

  return (
    <>
      <Container>
        <LeftWrapper>
          <StyledIcon
            name="material-symbols:menu-rounded"
            color="B4B4B4"
            size="2rem"
          />
        </LeftWrapper>
        <LogoWrapper>
          <Logo
            src={WeatherWhereLogoText}
            alt="logo"
            onClick={() => (window.location.href = "/")}
          />
        </LogoWrapper>
        <IconWrapper>
          {icons.map((icon, index) => (
            <Link key={icon.name} to={icon.link}>
              <StyledIcon
                key={icon.name}
                name={icon.name}
                size="2rem"
                color={icon.color}
                index={index}
                margin="0.2rem"
              />
            </Link>
          ))}
        </IconWrapper>
      </Container>
      <Outlet />
    </>
  );
}

export default Header;
