import { useMemo, useState } from "react";
import { useCatalogo } from "../context/CatalogoContext";
import TarjetaPerfume from "../tienda/TarjetaPerfume";
import DetallePerfume from "../tienda/DetallePerfume";
import { GENEROS } from "../lib/formato";
import "../tienda/Tienda.css";

const ORDENES = {
  marca: { nombre: "Marca A-Z", comparar: (a, b) => a.marca.localeCompare(b.marca) || a.nombre.localeCompare(b.nombre) },
  menor: { nombre: "Menor precio", comparar: (a, b) => a.precio - b.precio },
  mayor: { nombre: "Mayor precio", comparar: (a, b) => b.precio - a.precio },
};

function sinAcentos(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

export default function Inicio() {
  const { perfumes, cargando, error, recargar, busqueda, setBusqueda } = useCatalogo();
  const [genero, setGenero] = useState("todos");
  const [marca, setMarca] = useState("todas");
  const [orden, setOrden] = useState("marca");
  const [soloStock, setSoloStock] = useState(false);
  const [abierto, setAbierto] = useState(null);

  const marcas = useMemo(() => [...new Set(perfumes.map((p) => p.marca))].sort(), [perfumes]);
  const destacados = perfumes.filter((p) => p.destacado && p.stock > 0);

  const filtrados = useMemo(() => {
    const texto = sinAcentos(busqueda);
    return perfumes
      .filter((p) => !texto || sinAcentos(`${p.marca} ${p.nombre}`).includes(texto))
      .filter((p) => genero === "todos" || p.genero === genero)
      .filter((p) => marca === "todas" || p.marca === marca)
      .filter((p) => !soloStock || p.stock > 0)
      .sort((a, b) => (b.stock > 0) - (a.stock > 0) || ORDENES[orden].comparar(a, b));
  }, [perfumes, busqueda, genero, marca, orden, soloStock]);

  const hayFiltros = busqueda || genero !== "todos" || marca !== "todas" || soloStock;

  const limpiar = () => {
    setBusqueda("");
    setGenero("todos");
    setMarca("todas");
    setSoloStock(false);
  };

  return (
    <div className="inicio">
      <header className="portada">
        <h1 className="marca-texto">
          <span className="widi">Widi</span>
          <span className="store">store</span>
        </h1>
        <p className="lema">Tu perfume, <span>tu firma</span></p>
        <p className="portada-bajada">Fragancias con 30% de esencia pura: hasta 8 horas en la piel y 12 en la ropa.</p>
      </header>

      {cargando ? (
        <p className="cargando">Cargando perfumes…</p>
      ) : error ? (
        <div className="vacio">
          <p className="mensaje error">No pudimos cargar los perfumes. {error}</p>
          <button type="button" className="boton chico" onClick={recargar} style={{ marginTop: 12 }}>
            Reintentar
          </button>
        </div>
      ) : (
        <>
          {destacados.length > 0 && !hayFiltros && (
            <section className="destacados" aria-labelledby="titulo-destacados">
              <h2 id="titulo-destacados" className="titulo-seccion">Destacados</h2>
              <div className="fila-destacados">
                {destacados.map((p) => (
                  <TarjetaPerfume key={p.id} perfume={p} alAbrir={setAbierto} />
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="titulo-fragancias">
            <h2 id="titulo-fragancias" className="titulo-seccion">Fragancias</h2>

            <div className="filtros">
              <div className="fichas" role="group" aria-label="Género">
                <button type="button" className="ficha" aria-pressed={genero === "todos"} onClick={() => setGenero("todos")}>
                  Todos
                </button>
                {GENEROS.map((g) => (
                  <button
                    key={g.valor}
                    type="button"
                    className="ficha"
                    aria-pressed={genero === g.valor}
                    onClick={() => setGenero(g.valor)}
                  >
                    {g.nombre}
                  </button>
                ))}
              </div>

              <div className="filtros-fila">
                <label className="selector">
                  <span>Marca</span>
                  <select className="entrada" value={marca} onChange={(e) => setMarca(e.target.value)}>
                    <option value="todas">Todas</option>
                    {marcas.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </label>
                <label className="selector">
                  <span>Ordenar</span>
                  <select className="entrada" value={orden} onChange={(e) => setOrden(e.target.value)}>
                    {Object.entries(ORDENES).map(([clave, o]) => (
                      <option key={clave} value={clave}>{o.nombre}</option>
                    ))}
                  </select>
                </label>
                <label className="casilla">
                  <input type="checkbox" checked={soloStock} onChange={(e) => setSoloStock(e.target.checked)} />
                  Solo con stock
                </label>
              </div>
            </div>

            {busqueda && (
              <p className="resultado-busqueda">
                {filtrados.length} {filtrados.length === 1 ? "resultado" : "resultados"} para “{busqueda}”
              </p>
            )}

            {filtrados.length ? (
              <div className="grilla">
                {filtrados.map((p) => (
                  <TarjetaPerfume key={p.id} perfume={p} alAbrir={setAbierto} />
                ))}
              </div>
            ) : (
              <div className="vacio">
                <p>No encontramos perfumes con esos filtros.</p>
                {hayFiltros && (
                  <button type="button" className="boton chico" onClick={limpiar} style={{ marginTop: 12 }}>
                    Ver todos
                  </button>
                )}
              </div>
            )}
          </section>
        </>
      )}

      <DetallePerfume perfume={abierto} alCerrar={() => setAbierto(null)} />
    </div>
  );
}
