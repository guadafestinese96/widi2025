import {
    DeleteRounded,
    AddShoppingCartRounded,
    CheckRounded
  } from "@mui/icons-material";

import { useContext } from "react";
import CartContext from "../context/CartContext";
import styled from "styled-components";

const CardContainer = styled.div`
 display: flex;
  background-color: var(--colorSecundario);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  text-align: center;
  height: 150px;
  margin: 8px;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.5);
  text-transform: capitalize;
`

const CardImg = styled.img`
 width: 60px;
  height: 60px;
  margin: 5px;
`
const CardP = styled.p`
font-size: 10px;
  margin-top: 4px;
`

const CardH3 = styled.h3`
font-size: 9px;
`
const CardH4 = styled.h4`
font-size: 8px;
`
const BtnFavoritos = styled.button`
background-color: unset;
  border: none;
  cursor: pointer;

  &:hover{
  color: var(--colorPrimario);
  }
`
const ButtonsPerfumesCard = styled.div`
display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top:5px;
  width:100%;
`
const AddToCart = styled.button`
background-color: var(--colorSecundario);
  border: none;
  cursor: pointer;
  color: var(--colorPrimario);

  &:hover{
  color:black;
  }
`
const AddedToCart = styled.button`
background-color: var(--colorSecundario);
  border: none;
  cursor: pointer;
  color: var(--colorPrimario);
`


export default function UnFavorito({ perfume }) {
    const {deleteFromFavoritos, addToCart, cart} = useContext(CartContext);
    const isItemInCart = cart.find((item) => item.id === perfume.id);


    return (
      <CardContainer>
        <CardImg src={`/images/${perfume.img}`} alt="imgCard" />
        <CardH3>{perfume.marca}</CardH3>
        <CardH4>{perfume.nombre}</CardH4>
        <CardP>${perfume.precio}</CardP>

        <ButtonsPerfumesCard>

          {isItemInCart ? (
                    <AddedToCart className="addedToCart">
                      <CheckRounded />
                    </AddedToCart>
                  ) : (
                    <AddToCart className="addToCart" onClick={() => addToCart(perfume)}>
                      <AddShoppingCartRounded />
                    </AddToCart>
                  )}

          <BtnFavoritos className="btnFavoritos" onClick={()=>deleteFromFavoritos(perfume)}>
            <DeleteRounded style={{color: "#ff13a7"}}/>
          </BtnFavoritos>

          

        </ButtonsPerfumesCard>
      </CardContainer>
    );
  }
  