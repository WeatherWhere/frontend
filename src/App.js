import { useEffect } from "react";
import Router from "./components/Router";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";

function App() {
  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01 >= 4.8 ? 4.8 : window.innerWidth * 0.01;

  const setScreenSize = () => {
    // 모바일 기준 -> 최대치 -> 갤럭시 S20 -> 논리적 가로 길이 480

    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  };

  useEffect(() => {
    setScreenSize();
  });

  return (
    <StRoot>
      <Router />
    </StRoot>
  );
}

const StRoot = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  /* width: calc(var(--vw, 1vh) * 100); */
`;
export default App;
