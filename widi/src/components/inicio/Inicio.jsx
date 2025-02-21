import ListPerfumesCard from "../perfumesCard/ListPerfumesCard";
import "./Inicio.css";
import { useContext, useEffect } from "react";
import perfumes from "../perfumes.js";
import VerTodos from "../verTodos/VerTodos.jsx";
import SearchContext from "../context/SearchContext.jsx";

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

  const { search } = useContext(SearchContext);

  const searchedProducts = perfumes.filter(
    (item) => (
      item.nombre.toLowerCase().includes(search.toLowerCase()) ||
      item.marca.toLowerCase().includes(search.toLowerCase()) 
    ));

  return (
    <div className="inicioContainer">
      <VerTodos />
        {search.length > 0 ? (searchedProducts.length >0? (
        <ListPerfumesCard perfumes={searchedProducts} />
      ): <div>No se encontró el perfume</div>) : (
        <ListPerfumesCard perfumes={perfumes} />
      )}
    </div>
  );
}
