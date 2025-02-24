import { ChevronRightRounded } from "@mui/icons-material";
import "./VerTodos.css";
import { NavLink } from "react-router-dom";

export default function VerTodos() {
  return (
    <NavLink to={"/vertodos"}>
      <div className="verTodosContainer">
        <p>Ver Todos</p>
        <ChevronRightRounded />
      </div>
    </NavLink>
  );
}
