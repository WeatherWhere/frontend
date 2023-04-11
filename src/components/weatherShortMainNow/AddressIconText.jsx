import { useState } from "react";
import { Container } from "./WeatherShortMainNow";
import { StyledIcon } from "./WeatherShortMainNow";
import { Text } from "./WeatherShortMainNow";


export default function AddressIconText(props) {


    return (
        <>
        <Container marginTop="0.8rem" padding="1rem">
            <StyledIcon name="ri:map-pin-2-line" size="1.7rem" />
            <Text fontSize="1.4rem" padding="0.8rem">{props.latitude}</Text>
            <StyledIcon name="ic:baseline-search" size="1.7rem" />
        </Container>
        </>

    )


}