import { useEffect, useRef } from "react";
import { CloseRounded, FavoriteBorderRounded, FavoriteRounded } from "@mui/icons-material";
import { useCarrito } from "../context/CarritoContext";
import { formatearPrecio, urlImagen } from "../lib/formato";

/** Ventana con el detalle de un perfume */
export default function DetallePerfume({ perfume, alCerrar }) {
  const dialogo = useRef(null);
  const { agregar, cantidadDe, esFavorito, alternarFavorito } = useCarrito();

  useEffect(() => {
    if (perfume) dialogo.current?.showModal();
    else dialogo.current?.close();
  }, [perfume]);

  if (!perfume) return <dialog ref={dialogo} className="detalle" />;

  const enCarrito = cantidadDe(perfume.id);
  const sinStock = perfume.stock <= 0;
  const favorito = esFavorito(perfume.id);

  return (
    <dialog
      ref={dialogo}
      className="detalle"
      onClose={alCerrar}
      onClick={(e) => e.target === dialogo.current && alCerrar()}
      aria-labelledby="detalle-nombre"
    >
      <button type="button" className="detalle-cerrar" onClick={alCerrar} aria-label="Cerrar">
        <CloseRounded />
      </button>
      <img src={urlImagen(perfume.imagen)} alt={perfume.nombre} className="detalle-foto" />
      <p className="tarjeta-marca">{perfume.marca}</p>
      <h2 id="detalle-nombre" className="detalle-nombre">{perfume.nombre}</h2>
      <p className="detalle-genero">{perfume.genero}</p>
      {perfume.descripcion && <p className="detalle-descripcion">{perfume.descripcion}</p>}
      <p className="detalle-precio">{formatearPrecio(perfume.precio)}</p>
      <p className="detalle-stock">
        {sinStock ? "Sin stock por ahora" : perfume.stock === 1 ? "Queda 1 unidad" : `Quedan ${perfume.stock} unidades`}
      </p>
      <div className="detalle-acciones">
        <button
          type="button"
          className="boton"
          disabled={sinStock || enCarrito > 0}
          onClick={() => agregar(perfume)}
        >
          {sinStock ? "Sin stock" : enCarrito ? "Ya está en el carrito" : "Agregar al carrito"}
        </button>
        <button
          type="button"
          className="boton secundario"
          aria-pressed={favorito}
          onClick={() => alternarFavorito(perfume.id)}
        >
          {favorito ? <FavoriteRounded fontSize="small" /> : <FavoriteBorderRounded fontSize="small" />}
          {favorito ? "En favoritos" : "Favorito"}
        </button>
      </div>
    </dialog>
  );
}
