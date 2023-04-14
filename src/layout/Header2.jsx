import styled from "styled-components";
import logotest from "../styles/img/logotest.png";

const Logo = styled.img`
  height: 100%;
  width: auto;
`;

function Header2() {
  return (
    <StHeaderWrapper>
      <Logo
        src={logotest}
        alt="logo"
        onClick={() => (window.location.href = "/tourmap")}
      />
    </StHeaderWrapper>
  );
}

const StHeaderWrapper = styled.header`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 4.4rem; // 피그마 기준

  padding: 0.3rem 0 0.3rem 0;

  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

export default Header2;
