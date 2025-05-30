import Footer from "../footer/Footer";
import RedesContainer from "../redes/RedesContainer";
import Header2 from "../header/Header2";
import styled from "styled-components";

const BodyLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const ChildrenContainer = styled.div`
    display: flex;
    margin-top: 140px;
    padding: 20px;
    justify-content: center;
    align-items: center;   
    padding-bottom: 80px;
`
export default function Layout({ children }) {
  return (
    <BodyLayout>
      <Header2/>
      <Footer/>
      
      <ChildrenContainer>{children}</ChildrenContainer>
      <RedesContainer/>
    </BodyLayout>
  );
}
