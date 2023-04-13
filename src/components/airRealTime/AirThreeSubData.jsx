import styled from "styled-components";
import { Container, MinMaxText, StyledIcon, Text } from "../weatherShortMainNow/WeatherShortMainNow";

const Line = styled.div`
border: 1px solid white;
width: 2rem;
transform: rotate(90deg);
`;

export default function AirThreeSubData(props) {

    const getKhaiGrade = (khaiGrade) => {

        switch(khaiGrade){
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
    
    }


    return (

        <Container padding="1rem" marginBottom="1.6rem">
            <MinMaxText padding="0.1rem">
                <StyledIcon name="fa-solid:virus" size="2rem" />
                <Text fontSize="0.7rem">{props.airRealtimeData.pm10Value}㎍/㎥</Text>
            </MinMaxText>
            <Line />
            <MinMaxText padding="0.1rem">
                <StyledIcon name="fa-solid:viruses" size="2rem" />
                <Text fontSize="0.7rem">{props.airRealtimeData.pm25Value}㎍/㎥</Text> 
            </MinMaxText>
            <Line />
            <MinMaxText padding="0.1rem">
                <StyledIcon name="jam:airbnb" size="2rem" />
                <Text fontSize="0.7rem">{getKhaiGrade(props.airRealtimeData.khaiGrade)}</Text>
            </MinMaxText>
        </Container>


    )







}

