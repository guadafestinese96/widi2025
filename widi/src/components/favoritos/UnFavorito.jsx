import {
    DeleteRounded,
  } from "@mui/icons-material";
  import "../perfumesCard/PerfumesCard.css";
import { useContext } from "react";
import CartContext from "../context/CartContext";

  export default function UnFavorito({ perfume }) {
    const {deleteFromFavoritos} = useContext(CartContext);


    return (
      <div className="cardContainer">
        <img src={`/images/${perfume.img}`} alt="imgCard" />
        <h3>{perfume.marca}</h3>
        <h4>{perfume.nombre}</h4>
        <p>${perfume.precio}</p>

        <div className="buttonsPerfumesCard">
          <button className="btnFavoritos" onClick={()=>deleteFromFavoritos(perfume)}>
            <DeleteRounded />
          </button>
        </div>
      </div>
    );
  }
  