import ListPerfumesCard from "../perfumesCard/ListPerfumesCard";
import "./Inicio.css";
import { useContext, useEffect } from "react";
import VerTodos from "../verTodos/VerTodos.jsx";
import SearchContext from "../context/SearchContext.jsx";
import PerfumesDestacados from "../perfumesDestacados/PerfumesDestacados.jsx";
import {
  Favorite,
  Instagram,
  WhatsApp,
  WhatshotRounded,
} from "@mui/icons-material";

export default function Inicio() {
  useEffect(() => {
    const menuLi = document.querySelectorAll("#menu li");
    menuLi[0].classList.add("active");

    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));
  }, []);

  const { search, searchedProducts } = useContext(SearchContext);

  return (
    <div className="inicioContainer">
      <PerfumesDestacados />
      {search.length > 0 ? (
        searchedProducts.length > 0 ? (
          <ListPerfumesCard perfumes={searchedProducts} />
        ) : (
          <div>No se encontró el perfume</div>
        )
      ) : (
        ""
      )}

      <VerTodos />

      <Instagram />
      <WhatsApp />
    </div>
  );
}
