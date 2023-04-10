import styled from 'styled-components';
import logotest from '../styles/img/logotest.png'

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
  background-color: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 4.3rem;
  margin-left: auto;
  margin-right: auto;
`;

function Header() {
  return (
    <Container>
      <Logo src={logotest} alt="logo" onClick={()=> window.location.href='/weathershortmain'}/>
    </Container>
  );
}

export default Header;