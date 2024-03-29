import { useNavigate } from "react-router-dom";
import { Container } from "./WeatherShortMainNow";
import { StyledIcon } from "./WeatherShortMainNow";
import { Text } from "./WeatherShortMainNow";
import { MinMaxText } from "./WeatherShortMainNow";
import styled from "styled-components";

const Line = styled.div`
  border: 1px solid white;
  width: 2rem;
  transform: rotate(90deg);
`;

export const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const getWsdStatus = (wsd) => {
  if (wsd < 4) {
    return "약함";
  } else if (wsd < 9) {
    return "약간 강함";
  } else if (wsd < 14) {
    return "강함";
  } else {
    return "매우 강함";
  }
};

export default function ThreeSubData(props) {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate("weather/sub", { state: props.value });
  };

  const infoSize = {
    iconSize: "6vh",
    dataSize: "1.7vh",
    titleSize: "1.5vh",
  };

  return (
    <Container marginBottom="1rem" onClick={handleDetailClick} height={"25%"}>
      <MinMaxText padding="0.1rem">
        <IconWrap>
          <StyledIcon name="iwwa:humidity" size={infoSize.iconSize} />
        </IconWrap>
        <Text fontSize={infoSize.dataSize}>{props.value.reh}%</Text>
        <Text fontSize={infoSize.titleSize}>습도</Text>
      </MinMaxText>
      <Line />
      <MinMaxText padding="0.1rem">
        <IconWrap>
          <StyledIcon name="wi:umbrella" size={infoSize.iconSize} />
        </IconWrap>
        <Text fontSize={infoSize.dataSize}>{props.value.pop}%</Text>
        <Text fontSize={infoSize.titleSize}>강수확률</Text>
      </MinMaxText>
      <Line />
      <MinMaxText padding="0.1rem">
        <IconWrap>
          <StyledIcon
            name="fluent:weather-squalls-20-regular"
            size={infoSize.iconSize}
          />
        </IconWrap>
        <Text fontSize={infoSize.dataSize}>
          {getWsdStatus(props.value.wsd)}
        </Text>
        <Text fontSize={infoSize.titleSize}>바람</Text>
      </MinMaxText>
    </Container>
  );
}
