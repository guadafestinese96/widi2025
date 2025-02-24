import { useState } from "react";
import SearchContext from "./SearchContext";
import perfumes from "../perfumes.js";
import ListPerfumesCard from "../perfumesCard/ListPerfumesCard.jsx";

export default function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const searchedProducts = perfumes.filter(
    (item) =>
      item.nombre.toLowerCase().includes(search.toLowerCase()) ||
      item.marca.toLowerCase().includes(search.toLowerCase())
  );

  

  return (
    <SearchContext.Provider value={{ search, setSearch, searchedProducts }}>
      {children}
    </SearchContext.Provider>
  );
}
