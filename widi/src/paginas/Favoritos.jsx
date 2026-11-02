import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import TarjetaPerfume from "../tienda/TarjetaPerfume";
import DetallePerfume from "../tienda/DetallePerfume";
import "../tienda/Tienda.css";

export default function Favoritos() {
  const { perfumesFavoritos } = useCarrito();
  const [abierto, setAbierto] = useState(null);

  return (
    <div>
      <h1 className="titulo-seccion">Favoritos</h1>
      {perfumesFavoritos.length ? (
        <div className="grilla">
          {perfumesFavoritos.map((p) => (
            <TarjetaPerfume key={p.id} perfume={p} alAbrir={setAbierto} />
          ))}
        </div>
      ) : (
        <div className="vacio">
          <p>Todavía no guardaste favoritos. Tocá el corazón de un perfume para guardarlo acá.</p>
          <Link to="/" className="boton chico" style={{ marginTop: 14 }}>Ver perfumes</Link>
        </div>
      )}
      <DetallePerfume perfume={abierto} alCerrar={() => setAbierto(null)} />
    </div>
  );
}
