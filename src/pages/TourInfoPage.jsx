import React, { useState } from "react";
import WeatherShortMainAll from "../components/weather/weatherShortMainAll/WeatherShortMainAll";
import styled from "styled-components";
import TourCommon from "../components/tourInfo/TourCommon";
import GlobalStyle from "../styles/fonts/fonts";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TourDetail from "../components/tourInfo/TourDetail";

export default function TourInfoPage() {
  //const { lat, lng } = useParams();

  // const [location] = useState({
  //     latitude: parseFloat(lat),
  //     longitude: parseFloat(lng),
  //   });

  const [location] = useState({
    latitude: 37.517331925853,
    longitude: 127.047377408384,
  });

  return (
    <RootPage>
      <GlobalStyle />
      <Background>
        <StyledTabs defaultActiveKey="common" className="mb-3" justify>
          <Tab eventKey="common" title="공통 정보">
            <TourCommon />
          </Tab>
          <Tab eventKey="detail" title="소개 정보">
            <TourDetail />
          </Tab>
        </StyledTabs>
      </Background>
      <WeatherShortMainAll location={location} />
    </RootPage>
  );
}
const StyledTabs = styled(Tabs)`
  .nav-link {
    color: #969696;
  }

  .nav-link.active {
    color: #bee1a7;
  }
`;

const Background = styled.div`
  height: 66%;
  align-items: center;
  box-shadow: 3px 3px 70px rgba(0, 128, 0, 0.1);
  margin:0.4rem;
  border-radius:1%
  display:flex;
  flex-direction: column;

`;

const RootPage = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
