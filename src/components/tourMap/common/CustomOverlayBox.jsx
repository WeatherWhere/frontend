import React from "react";
import styled from "styled-components";
import ImgNotFound from "../../../styles/img/ImgNotFound.png";
import { CLOSE_ICON, RIGHT_ARROW_ICON } from "../../../utils/const/icon";
import { Icon } from "@iconify/react";

export default function CustomOverlayBox(props) {
  const { tourInfo, setIsModalOpen, showModal } = props;
  const { title, firstImage, addr } = tourInfo;
  const compressAddr = addr.split(" ");

  return (
    <StInfoWrap>
      <ImageWrapper>
        {firstImage ? <StImg src={firstImage} /> : <StImg src={ImgNotFound} />}
        <StClose
          name={CLOSE_ICON.name}
          onClick={() => setIsModalOpen(false)}
          color={firstImage ? "gray" : "white"}
        />
      </ImageWrapper>
      <BodyWrapper>
        <StBody>
          <StText>{title}</StText>
          <StAddr>{compressAddr[0] + " " + compressAddr[1]}</StAddr>
        </StBody>
        <StLink
          onClick={() => {
            showModal(tourInfo);
          }}
        >
          <StArrow name={RIGHT_ARROW_ICON.name} />
        </StLink>
      </BodyWrapper>
    </StInfoWrap>
  );
}

const StInfoWrap = styled.section`
  display: flex;
  flex-direction: column;

  width: 100px;
  height: 120px;

  background-color: white;

  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  z-index: 999;
`;

const ImageWrapper = styled.div`
  height: 60%;
`;

const StImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0px 0px;
`;

const StClose = styled(Icon).attrs((props) => ({
  icon: props.name,
}))`
  position: absolute;
  right: 2px;
  top: 2px;
`;

const BodyWrapper = styled.div`
  display: flex;
  height: 40%;
`;

const StBody = styled.div`
  width: 85%;
`;

const StLink = styled.div`
  display: flex;
  align-items: center;
  width: 15%;
  color: inherit;
`;

const StText = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  height: 65%;
  padding: 10px 0 0 4px;

  font-size: 0.7rem;
`;

const StAddr = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  height: 35%;
  padding-left: 4px;

  font-size: 0.5rem;
`;

const StArrow = styled(Icon).attrs((props) => ({
  icon: props.name,
  color: props.clolr,
}))``;
