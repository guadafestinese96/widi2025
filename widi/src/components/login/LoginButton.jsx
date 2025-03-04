import { useAuth0 } from "@auth0/auth0-react"
import styled from "styled-components";
  
  const BtnLogin = styled.button`
   background-color: var(--colorPrimario);
    font-family: "Poppins";
    font-size: 10px;
    padding: 5px;
    border-radius: 5px;
    border: none;
    color: black;

    &:hover{
    background-color: var(--colorSecundario);
    cursor: pointer;
    }
  `
export default function LoginButton(){
    const {loginWithRedirect} = useAuth0();

    return(
        <BtnLogin onClick={()=>loginWithRedirect()}className="btnLogin">Iniciar Sesión</BtnLogin>    
    )
}