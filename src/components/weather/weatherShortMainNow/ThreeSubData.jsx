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

export default function ThreeSubData(props) {

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
    }

    return (

        <Container marginBottom="0.8rem">
            <MinMaxText padding="0.1rem">
                <StyledIcon name="iwwa:humidity" size="3rem" />
                <Text fontSize="0.7rem">{props.value.reh}%</Text>
            </MinMaxText>
            <Line />
            <MinMaxText padding="0.1rem">
                <StyledIcon name="wi:umbrella" size="3rem" />
                <Text fontSize="0.7rem">{props.value.pop}%</Text>
            </MinMaxText>
            <Line />
            <MinMaxText padding="0.1rem">
                <StyledIcon name="fluent:weather-squalls-20-regular" size="3rem" />
                <Text fontSize="0.7rem">{getWsdStatus(props.value.wsd)}</Text>
            </MinMaxText>
        </Container>


    )







}
