import { ChevronRightRounded } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const VerTodosContainer = styled.div`
  display: flex;
  justify-content: end;
  font-size: 12px;
  align-items: center;
  color: black;
  margin-top: 20px;
`;
const MuiSvgIconRoot = styled.div`
  color: var(--colorPrimario);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function VerTodos() {
  return (
    <NavLink to={"/vertodos"}>
      <VerTodosContainer>
        <p>Ver Todos</p>
        <MuiSvgIconRoot>
          <ChevronRightRounded />
        </MuiSvgIconRoot>
      </VerTodosContainer>
    </NavLink>
  );
}
