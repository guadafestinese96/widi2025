import { useContext } from "react"
import CartContext from "../context/CartContext"
import UnFavorito from "./UnFavorito";
import styled from "styled-components";

const FavContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100vw;
flex-wrap:wrap;
`
export default function Favoritos(){
    const {favoritos} = useContext(CartContext);

    return(
        <FavContainer>
            {favoritos.length>0 ? favoritos.map(fav=>(
                <UnFavorito perfume={fav} key={fav.id}/>
            )): <div>No hay favoritos</div>}
        </FavContainer>
    )
}