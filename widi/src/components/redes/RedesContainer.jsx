import { NavLink } from 'react-router-dom'
import { Instagram, WhatsApp } from '@mui/icons-material'
import styled from 'styled-components'

const RedesContainerDiv = styled.div`
display: flex;
    justify-content: space-between;
    width: 100vw;
    align-items: center;
    padding: 8px 25px 8px 25px;
    bottom: 0;
    position: fixed;
    background-color: var(--colorSecundario);
    border-radius: 25px 25px 0 0 ;
`
const IgWpContainer = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    color: black;
`
const IgWp = styled.div`
background-color: var(--colorPrimario);
    border-radius: 5px;
    padding: 5px;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    color: black;

    &:hover{
    color: var(--colorSecundario);
    }
`
const IgWpP = styled.p`
font-size: 12px;
    font-weight: bold;

    &:hover{
    color: var(--colorPrimario);
    transition: 0.5s;
    }
`
export default function RedesContainer(){
    const mensaje = encodeURIComponent("hola");

    return(
        <RedesContainerDiv>
        <NavLink to="https://www.instagram.com/widistoreok__" target="_blank">
          <IgWpContainer>
            <IgWp>
              <Instagram />
            </IgWp>
            <IgWpP>@widistoreok__</IgWpP>
          </IgWpContainer>
        </NavLink>

        <NavLink to="https://api.whatsapp.com/send/?phone=1161950112&text&type=phone_number&app_absent=0" target="_blank" text={mensaje}>
          <IgWpContainer>
            <IgWp>
              <WhatsApp />
            </IgWp>
            <IgWpP>+549 1161950112</IgWpP>
          </IgWpContainer>
        </NavLink>
      </RedesContainerDiv>
    )
}

