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

const DestacadosH1 = styled.h1`
  font-size: 18px;
  text-align: center;
  color: var(--colorPrimario);
  margin-bottom: 20px;
`;

export default function Favoritos(){
    const {favoritos} = useContext(CartContext);

    return(
        
            favoritos.length >0 ?
                (<div>
                    <DestacadosH1>Favoritos</DestacadosH1>
                    <FavContainer>
                    { favoritos.map(fav=>(
                        <UnFavorito perfume={fav} key={fav.id}/>
                        ))}
                    </FavContainer>
                </div>)

            : (<div>No hay favoritos</div>)
        
        
        
    )
}