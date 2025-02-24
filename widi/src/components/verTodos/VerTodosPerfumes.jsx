import { useContext, useState } from "react";
import SearchContext from "../context/SearchContext";
import perfumes from "../perfumes.js";
import ListPerfumesCard from "../perfumesCard/ListPerfumesCard";

export default function VerTodosPerfumes() {
  const { search, searchedProducts } = useContext(SearchContext);
  const [select, setSelect] = useState("all");

  const filterProductsByGender = (genero) => {
    const filteredProducts = perfumes.filter(
      (perfume) => perfume.genero.toLowerCase() === genero.toLowerCase()
    );
    return filteredProducts;
  };

  console.log(select)


  return (
    <div className="div">
      <div className="selectContainer">
        <label htmlFor="filterByGender">GENERO: </label>
        <select
          name="filterByGender"
          id="filterByGender"
          className="selectGender"
          onChange={(e) => {
            setSelect(e.target.value);
          }}
        >
          <option value="all" className="optionSelect">TODOS</option>
          <option value="femenino" className="optionSelect">Femenino</option>
          <option value="masculino" className="optionSelect">Masculino</option>
          <option value="unisex" className="optionSelect">Unisex</option>
        </select>
      </div>



      {search.length > 0 ? (
        searchedProducts.length > 0 ? (
          <ListPerfumesCard perfumes={searchedProducts} />
        ) : (
          <div>No se encontró el perfume</div>
        )
      ) : (
        select === "all" ?
        (<ListPerfumesCard perfumes={perfumes}/>) : 
        (<ListPerfumesCard perfumes={filterProductsByGender(select)}/>)
        
      )}
    </div>
  );
}
