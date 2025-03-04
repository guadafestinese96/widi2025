import Footer from "../footer/Footer";
import RedesContainer from "../redes/RedesContainer";
import Header2 from "./Header2";
import "./Layout.css";
import styled from "styled-components";

const BodyLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const ChildrenContainer = styled.div`
    display: flex;
    margin-top: 130px;
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
