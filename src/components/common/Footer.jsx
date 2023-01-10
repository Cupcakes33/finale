import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <FooterButton>혼자</FooterButton>
      <FooterButton>같이</FooterButton>
      <FooterButton>책갈피</FooterButton>
      <FooterButton>마이</FooterButton>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const FooterButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #d9d9d9;
  border: none;
  cursor: pointer;
`;
