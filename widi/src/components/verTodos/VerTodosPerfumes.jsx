import { useContext, useState } from "react";
import SearchContext from "../context/SearchContext";
import perfumes from "../perfumes.js";
import ListPerfumesCard from "../perfumesCard/ListPerfumesCard";
import styled from "styled-components";

const SelectContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: left;
  color:black;
  padding-left: 20px;
`

const SelectLabel = styled.label`
margin-left: 10px;
`
const SelectGender = styled.select`
font-family: "Poppins";
  padding: 5px;
  border: 1px solid var(--colorPrimario);
  background-color: var(--colorPrimario);
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  color:black;
`

const DestacadosH1 = styled.h1`
    font-size: 18px;
    text-align: center;
    color: var(--colorPrimario);
    margin-bottom: 20px;
`
const Option = styled.option`
    color: black;
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
      <DestacadosH1>Fragancias</DestacadosH1>
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
          <Option value="all" className="optionSelect" style={{color: "black"}}>TODOS</Option>
          <Option value="femenino" className="optionSelect">Femenino</Option>
          <Option value="masculino" className="optionSelect">Masculino</Option>
          <Option value="unisex" className="optionSelect">Unisex</Option>
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
