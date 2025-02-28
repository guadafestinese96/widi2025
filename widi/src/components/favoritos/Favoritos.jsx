import { useContext } from "react"
import CartContext from "../context/CartContext"
import UnFavorito from "./UnFavorito";

export default function Favoritos(){
    const {favoritos} = useContext(CartContext);

    return(
        <div className="favContainer">
            {favoritos.length>0 ? favoritos.map(fav=>(
                <UnFavorito perfume={fav} key={fav.id}/>
            )): <div>No hay favoritos</div>}
        </div>
    )
}