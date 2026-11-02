import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  EmailRounded,
  FavoriteRounded,
  HomeRounded,
  Instagram,
  SearchRounded,
  ShoppingCartRounded,
  WhatsApp,
} from "@mui/icons-material";
import { useCatalogo } from "../context/CatalogoContext";
import { useCarrito } from "../context/CarritoContext";
import { INSTAGRAM, WHATSAPP } from "../lib/formato";
import "./Layout.css";

const SECCIONES = [
  { ruta: "/", nombre: "Inicio", icono: <HomeRounded /> },
  { ruta: "/carrito", nombre: "Carrito", icono: <ShoppingCartRounded /> },
  { ruta: "/favoritos", nombre: "Favoritos", icono: <FavoriteRounded /> },
  { ruta: "/contacto", nombre: "Contacto", icono: <EmailRounded /> },
];

export default function Layout() {
  const { busqueda, setBusqueda } = useCatalogo();
  const { cantidadTotal } = useCarrito();
  const { pathname } = useLocation();
  const navegar = useNavigate();

  const indiceActivo = Math.max(0, SECCIONES.findIndex((s) => s.ruta === pathname));
  const mensajeConsulta = encodeURIComponent("¡Hola Widi Store! Te quiero consultar por ");

  const buscar = (texto) => {
    setBusqueda(texto);
    // La búsqueda funciona desde cualquier página: muestra los resultados en el inicio
    if (pathname !== "/") navegar("/");
  };

  return (
    <>
      <header className="encabezado">
        <NavLink to="/" aria-label="Widi Store, ir al inicio">
          <img src="/images/widiLogo2025.png" alt="" className="logo" width="46" height="46" />
        </NavLink>
        <label className="buscador">
          <SearchRounded fontSize="small" />
          <span className="solo-lectores">Buscar perfume</span>
          <input
            type="search"
            placeholder="Buscar perfume o marca"
            value={busqueda}
            onChange={(e) => buscar(e.target.value)}
          />
        </label>
      </header>

      <nav className="menu-rosa" aria-label="Secciones">
        <ul style={{ "--indice": indiceActivo }}>
          {SECCIONES.map((s, i) => (
            <li key={s.ruta} className={i === indiceActivo ? "activo" : ""}>
              <NavLink to={s.ruta} aria-label={s.nombre} title={s.nombre} end>
                <span className="icono">{s.icono}</span>
                {s.ruta === "/carrito" && cantidadTotal > 0 && (
                  <span className="contador" aria-label={`${cantidadTotal} productos`}>
                    {cantidadTotal}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
          <span className="indicador" aria-hidden="true"></span>
        </ul>
      </nav>

      <main className="contenido">
        <Outlet />
      </main>

      <footer className="redes">
        <a href={`https://www.instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer">
          <span className="red-icono"><Instagram fontSize="small" /></span>
          @{INSTAGRAM}
        </a>
        <a href={`https://wa.me/${WHATSAPP}?text=${mensajeConsulta}`} target="_blank" rel="noopener noreferrer">
          <span className="red-icono"><WhatsApp fontSize="small" /></span>
          Escribinos
        </a>
      </footer>
    </>
  );
}
