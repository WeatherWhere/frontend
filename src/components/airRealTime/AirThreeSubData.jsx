import styled from "styled-components";
import { IconWrap } from "../weather/weatherShortMainNow/ThreeSubData";
import {
  Container,
  MinMaxText,
  StyledIcon,
  Text,
} from "../weather/weatherShortMainNow/WeatherShortMainNow";

const Line = styled.div`
  border: 1px solid white;
  width: 2rem;
  transform: rotate(90deg);
`;

export default function AirThreeSubData(props) {
  const getKhaiGrade = (khaiGrade) => {
    switch (khaiGrade) {
      case 1:
        return "좋음";
      case 2:
        return "보통";
      case 3:
        return "나쁨";
      case 4:
        return "매우 나쁨";
      default:
        return "알수 없음";
    }
  };

  const infoSize = {
    iconSize: "4.5vh",
    dataSize: "1.6vh",
    titleSize: "1.4vh",
  };

  return (
    <Container>
      <MinMaxText padding="0.1rem" height={"25%"}>
        <IconWrap>
          <StyledIcon name="fa-solid:virus" size={infoSize.iconSize} />
        </IconWrap>
        <Text fontSize={infoSize.dataSize}>
          {props.airRealtimeData.pm10Value}㎍/㎥
        </Text>
        <Text fontSize={infoSize.titleSize}>미세먼지</Text>
      </MinMaxText>
      <Line />
      <MinMaxText padding="0.1rem">
        <IconWrap>
          <StyledIcon name="fa-solid:viruses" size={infoSize.iconSize} />
        </IconWrap>
        <Text fontSize={infoSize.dataSize}>
          {props.airRealtimeData.pm25Value}㎍/㎥
        </Text>
        <Text fontSize={infoSize.titleSize}>초미세먼지</Text>
      </MinMaxText>
      <Line />
      <MinMaxText padding="0.1rem">
        <IconWrap>
          <StyledIcon name="jam:airbnb" size={infoSize.iconSize} />
        </IconWrap>
        <Text fontSize={infoSize.dataSize}>
          {getKhaiGrade(props.airRealtimeData.khaiGrade)}
        </Text>
        <Text fontSize={infoSize.titleSize}>통합대기지수</Text>
      </MinMaxText>
    </Container>
  );
}
