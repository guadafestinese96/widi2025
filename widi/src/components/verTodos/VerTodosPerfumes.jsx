import { useContext, useState } from "react";
import SearchContext from "../context/SearchContext";
import perfumes from "../perfumes.js";
import ListPerfumesCard from "../perfumesCard/ListPerfumesCard";
import styled from "styled-components";

const SelectContainer = styled.div`
width: 100vw;
  display: flex;
  justify-content: left;
`

const SelectLabel = styled.label`
margin-left: 10px;
`
const SelectGender = styled.select`
font-family: "Poppins";
  padding: 5px;
  border: none;
  background-color: var(--colorPrimario);
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`




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
      <SelectContainer>
        <SelectLabel htmlFor="filterByGender">GENERO: </SelectLabel>
        <SelectGender
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
        </SelectGender>
      </SelectContainer>



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
