import { createGlobalStyle } from "styled-components";
import MapoDPP from "./MapoDPP.woff2";

//전역 스타일 설정(styled-component)
const GlobalStyle = createGlobalStyle`
  #root {
    display:flex;
    justify-content: center;
  }
  :root {
       --vh: 100%;
       --vw: 100%;
   }

    @font-face {
        font-family: "MapoDPP";
        src: local("MapoDPP"),
        url(${MapoDPP}) format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    body {
        font-family: 'MapoDPP';
    }

    * {
    box-sizing: border-box;
    ::-webkit-scrollbar {
      display: none;
    }

   }

  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
