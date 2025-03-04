import { useAuth0 } from "@auth0/auth0-react";
import { Person2Rounded } from "@mui/icons-material";
import styled from "styled-components";

const DivUser = styled.div`
 display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`
const ImgUser = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`
const H2user = styled.h2`
font-size: 10px;
  color: var(--colorPrimario);
`
const Puser = styled.p`
font-size: 8px;
  color: var(--colorPrimario);
`


export default function ProfileUser() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <DivUser>
      {isAuthenticated ? (
        <ImgUser src={user.picture} alt={user.name} />
      ) : (
        <Person2Rounded />
      )}
    </DivUser>
  );
}
