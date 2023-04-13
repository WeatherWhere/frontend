import React from "react";
import Header from "../layout/Header";
import styled from "styled-components";
import AirRealTime from "../components/airRealTime/AirRealTime";


export default function AirPage() {

  const PageWrap = styled.div`
  height:100vh;
  `
  
  return (
    <PageWrap>
      <Header />
      <AirRealTime />
    </PageWrap>
  )
}
