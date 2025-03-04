import ListPerfumesCard from "../perfumesCard/ListPerfumesCard";
import { useContext, useEffect } from "react";
import VerTodos from "../verTodos/VerTodos.jsx";
import SearchContext from "../context/SearchContext.jsx";
import PerfumesDestacados from "../perfumesDestacados/PerfumesDestacados.jsx";
import styled from "styled-components";

const TitleIndex = styled.h1`
font-family: "Qwitcher Grypen", cursive;    
      text-transform: lowercase;
      text-shadow: #ff13a7 5px 2px 5px;
      font-size: 80px;
      font-weight: 500;
      text-align: center;
`



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
      <TitleIndex>Widi Store</TitleIndex>
      
      {search.length > 0 ? (
        searchedProducts.length > 0 ? (
          <ListPerfumesCard perfumes={searchedProducts} />
        ) : (
          <div>No se encontró el perfume</div>
        )
      ) : (
        <div>
        <PerfumesDestacados />
        <VerTodos />
        </div>
      )}

      

      
    </div>
  );
}
