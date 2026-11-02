import { useEffect, useState } from "react";
import { supabase, mensajeError } from "../lib/supabase";
import { useCatalogo } from "../context/CatalogoContext";
import { formatearPrecio } from "../lib/formato";

const ESTADOS = [
  ["pendiente", "Pendientes"],
  ["confirmado", "Confirmados"],
  ["cancelado", "Cancelados"],
  ["todos", "Todos"],
];

/** Pedidos que llegaron por WhatsApp. Confirmar descuenta el stock; cancelar uno confirmado lo devuelve. */
export default function AdminPedidos() {
  const { recargar: recargarTienda } = useCatalogo();
  const [pedidos, setPedidos] = useState([]);
  const [estado, setEstado] = useState("pendiente");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [aCancelar, setACancelar] = useState(null);
  const [procesando, setProcesando] = useState(null);

  const cargar = async () => {
    setCargando(true);
    setError("");
    let consulta = supabase.from("pedidos").select("*").order("created_at", { ascending: false }).limit(200);
    if (estado !== "todos") consulta = consulta.eq("estado", estado);
    const { data, error: err } = await consulta;
    if (err) setError(mensajeError(err));
    else setPedidos(data);
    setCargando(false);
  };

  useEffect(() => {
    cargar();
  }, [estado]);

  const ejecutar = async (funcion, pedido) => {
    setProcesando(pedido.id);
    setError("");
    const { error: err } = await supabase.rpc(funcion, { p_id: pedido.id });
    setProcesando(null);
    setACancelar(null);
    if (err) return setError(mensajeError(err));
    await cargar();
    recargarTienda();
  };

  const linkCliente = (telefono) => {
    const numero = String(telefono || "").replace(/\D/g, "");
    return numero ? `https://wa.me/${numero}` : null;
  };

  return (
    <div>
      <div className="admin-filtros">
        <div className="fichas">
          {ESTADOS.map(([valor, nombre]) => (
            <button key={valor} type="button" className="ficha" aria-pressed={estado === valor} onClick={() => setEstado(valor)}>
              {nombre}
            </button>
          ))}
        </div>
        <p className="ayuda">Cuando cobres un pedido, tocá Confirmar: se descuenta el stock solo.</p>
      </div>

      {error && <p className="mensaje error" role="alert">{error}</p>}

      {cargando ? (
        <p className="cargando">Cargando…</p>
      ) : pedidos.length ? (
        <div className="admin-pedidos">
          {pedidos.map((p) => (
            <article key={p.id} className={`admin-pedido ${p.estado}`}>
              <header>
                <strong>Pedido #{p.id}</strong>
                <span className={`estado ${p.estado}`}>{p.estado}</span>
              </header>
              <p className="ayuda">{new Date(p.created_at).toLocaleString("es-AR")}</p>
              {(p.nombre || p.telefono) && (
                <p>
                  {p.nombre}
                  {p.telefono && (
                    <>
                      {p.nombre ? " · " : ""}
                      {linkCliente(p.telefono) ? (
                        <a href={linkCliente(p.telefono)} target="_blank" rel="noopener noreferrer">{p.telefono}</a>
                      ) : (
                        p.telefono
                      )}
                    </>
                  )}
                </p>
              )}
              <ul>
                {p.items.map((i) => (
                  <li key={i.id}>
                    {i.cantidad} × {i.marca} {i.nombre} <span>{formatearPrecio(i.precio * i.cantidad)}</span>
                  </li>
                ))}
              </ul>
              <p className="admin-pedido-total">Total {formatearPrecio(p.total)}</p>
              <div className="admin-acciones">
                {p.estado === "pendiente" && (
                  <button type="button" className="boton chico" disabled={procesando === p.id} onClick={() => ejecutar("confirmar_pedido", p)}>
                    Confirmar (cobrado)
                  </button>
                )}
                {p.estado !== "cancelado" &&
                  (aCancelar === p.id ? (
                    <>
                      <button type="button" className="boton chico peligro" disabled={procesando === p.id} onClick={() => ejecutar("cancelar_pedido", p)}>
                        Sí, cancelar
                      </button>
                      <button type="button" className="boton chico secundario" onClick={() => setACancelar(null)}>No</button>
                    </>
                  ) : (
                    <button type="button" className="boton chico secundario" onClick={() => setACancelar(p.id)}>Cancelar pedido</button>
                  ))}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="vacio">No hay pedidos {estado !== "todos" ? `${ESTADOS.find((e) => e[0] === estado)[1].toLowerCase()}` : ""}.</p>
      )}
    </div>
  );
}
