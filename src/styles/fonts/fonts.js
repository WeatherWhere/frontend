import { createGlobalStyle } from "styled-components";
import MapoDPP from "./MapoDPP.woff2";

//전역 스타일 설정(styled-component)
const GlobalStyle = createGlobalStyle`
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

    font-family: 'Pretendard Variable';
   }

  button:hover {
    cursor: pointer;
  }
`;

export default GlobalStyle;
