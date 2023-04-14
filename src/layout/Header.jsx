import styled from 'styled-components';
import WeatherWhereLogoText from '../styles/img/WeatherWhereLogoText.svg'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledIcon } from '../components/weather/weatherShortMainNow/WeatherShortMainNow';


const Container = styled.header`
  display: flex;
  padding: 0.3rem;
  background-color: #fff;
  height: 4.4rem;
`;

const Logo = styled.img`
height:4rem;
`

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
      case path.startsWith("/weather2"):
        setIcons([
          { name: "material-symbols:coronavirus-outline", color: "B4B4B4", link: "/air2/realtime" },
          { name: "uiw:map", color: "7DD178", link: "/tour2/map" }
        ]);
        break;
      case path.startsWith("/air"):
        setIcons([
          { name: "ph:sun-bold", color: "FFCD9F", link: "/weather2/short/main" },
          { name: "uiw:map", color: "7DD178", link: "/tour2/map" }
        ]);
        break;
      case path.startsWith("/tour"):
        setIcons([
          { name: "material-symbols:coronavirus-outline", color: "B4B4B4", link: "/air2/realtime" },
          { name: "ph:sun-bold", color: "FFCD9F", link: "/weather2/short/main" }
        ]);
        break;
      default:
        setIcons([]);
    }
  }, [path]);

  return (
    <Container>
      <LeftWrapper >
        <StyledIcon name="material-symbols:menu-rounded" color="B4B4B4" size="2rem" />
      </LeftWrapper>
      <LogoWrapper>
        <Logo
          src={WeatherWhereLogoText}
          alt="logo"
          onClick={() => (window.location.href = "/weather2/short/main")}
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
            />
          </Link>
        ))}
      </IconWrapper>
    </Container>

  );
}


export default Header;