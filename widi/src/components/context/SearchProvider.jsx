import { useState } from "react"
import SearchContext from "./SearchContext";

export default function SearchProvider({children}){
    const [search, setSearch] = useState("");

    return(
        <SearchContext.Provider value={{search,setSearch}}>
            {children}
        </SearchContext.Provider>
    )
}