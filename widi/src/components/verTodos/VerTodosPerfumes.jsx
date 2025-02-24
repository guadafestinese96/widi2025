import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import perfumes from '../perfumes.js'
import ListPerfumesCard from "../perfumesCard/ListPerfumesCard";

export default function VerTodosPerfumes() {
  const { search, searchedProducts } = useContext(SearchContext);

  return (
    <div className="div">
      {search.length > 0 ? (
        searchedProducts.length > 0 ? (
          <ListPerfumesCard perfumes={searchedProducts} />
        ) : (
          <div>No se encontró el perfume</div>
        )
      ) : (
        <ListPerfumesCard perfumes={perfumes} />
      )}
    </div>
  );
}
