import {
  AddShoppingCartRounded,
  CheckRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@mui/icons-material";
import { useCarrito } from "../context/CarritoContext";
import { formatearPrecio, urlImagen } from "../lib/formato";

/** Tarjeta de un perfume con botones de carrito y favorito */
export default function TarjetaPerfume({ perfume, alAbrir }) {
  const { agregar, cantidadDe, esFavorito, alternarFavorito } = useCarrito();
  const enCarrito = cantidadDe(perfume.id);
  const agotado = perfume.stock <= 0;
  const favorito = esFavorito(perfume.id);

  return (
    <article className={`tarjeta ${agotado ? "agotada" : ""}`}>
      <button type="button" className="tarjeta-foto" onClick={() => alAbrir(perfume)} aria-label={`Ver ${perfume.nombre}`}>
        <img src={urlImagen(perfume.imagen)} alt="" loading="lazy" />
        {agotado ? (
          <span className="cartel agotado">Sin stock</span>
        ) : perfume.stock <= 2 ? (
          <span className="cartel ultimas">{perfume.stock === 1 ? "Última unidad" : "Últimas unidades"}</span>
        ) : null}
      </button>

      <div className="tarjeta-texto">
        <h3 className="tarjeta-nombre">{perfume.nombre}</h3>
        <p className="tarjeta-marca">{perfume.marca}</p>

        <div className="tarjeta-pie">
          <p className="tarjeta-precio">{formatearPrecio(perfume.precio)}</p>
          <div className="tarjeta-acciones">
        <button
          type="button"
          className={`icono-boton ${enCarrito ? "activo" : ""}`}
          onClick={() => agregar(perfume)}
          disabled={agotado || enCarrito > 0}
          aria-label={enCarrito ? `${perfume.nombre} ya está en el carrito` : `Agregar ${perfume.nombre} al carrito`}
          title={agotado ? "Sin stock" : enCarrito ? "Ya está en el carrito (la cantidad se cambia desde el carrito)" : "Agregar al carrito"}
        >
          {enCarrito ? <CheckRounded /> : <AddShoppingCartRounded />}
        </button>
        <button
          type="button"
          className={`icono-boton ${favorito ? "activo" : ""}`}
          onClick={() => alternarFavorito(perfume.id)}
          aria-pressed={favorito}
          aria-label={favorito ? `Quitar ${perfume.nombre} de favoritos` : `Agregar ${perfume.nombre} a favoritos`}
        >
          {favorito ? <FavoriteRounded /> : <FavoriteBorderRounded />}
        </button>
          </div>
        </div>
      </div>
    </article>
  );
}
