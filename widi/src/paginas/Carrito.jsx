import { useState } from "react";
import { Link } from "react-router-dom";
import { AddRounded, DeleteOutlineRounded, RemoveRounded, WhatsApp } from "@mui/icons-material";
import { useCarrito } from "../context/CarritoContext";
import { useCatalogo } from "../context/CatalogoContext";
import { supabase, supabaseConfigurado, mensajeError } from "../lib/supabase";
import { WHATSAPP, formatearPrecio, urlImagen } from "../lib/formato";
import "../tienda/Tienda.css";

function armarMensaje({ numero, items, total, nombre }) {
  const lineas = items.map(
    (i) => `• ${i.cantidad} x ${i.marca} ${i.nombre} — ${formatearPrecio(i.precio * i.cantidad)}`
  );
  return [
    `¡Hola Widi Store! Quiero hacer este pedido${numero ? ` (#${numero})` : ""}:`,
    ...lineas,
    `Total: ${formatearPrecio(total)}`,
    nombre ? `Mi nombre es ${nombre}.` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function Carrito() {
  const { detalle, total, agregar, restar, quitar, vaciar } = useCarrito();
  const { recargar } = useCatalogo();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(null);

  const pedir = async () => {
    setError("");
    setEnviando(true);
    // La pestaña se abre ya, dentro del clic, para que el navegador no la bloquee
    const ventana = window.open("", "_blank");
    try {
      let numero = null;
      let items = detalle.map((i) => ({ ...i.perfume, cantidad: i.cantidad }));
      let totalFinal = total;

      if (supabaseConfigurado) {
        // El servidor verifica stock y calcula el total con los precios reales
        const { data, error: err } = await supabase.rpc("registrar_pedido", {
          p_items: detalle.map((i) => ({ id: i.perfume.id, cantidad: i.cantidad })),
          p_nombre: nombre,
          p_telefono: telefono,
        });
        if (err) throw err;
        numero = data.id;
        items = data.items;
        totalFinal = data.total;
      }

      const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        armarMensaje({ numero, items, total: totalFinal, nombre: nombre.trim() })
      )}`;
      if (ventana) ventana.location.href = url;
      else window.location.href = url;

      setEnviado({ numero, total: totalFinal, url });
      vaciar();
    } catch (e) {
      ventana?.close();
      setError(mensajeError(e));
      recargar(); // por si cambió el stock
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="carrito-listo">
        <h1 className="titulo-seccion">¡Pedido enviado!</h1>
        <p>
          {enviado.numero ? `Tu número de pedido es #${enviado.numero}. ` : ""}
          Terminá de coordinar el pago y la entrega por WhatsApp.
        </p>
        <p>
          Si no se abrió WhatsApp, <a href={enviado.url} target="_blank" rel="noopener noreferrer">tocá acá</a>.
        </p>
        <Link to="/" className="boton">Seguir mirando</Link>
      </div>
    );
  }

  if (!detalle.length) {
    return (
      <div className="vacio">
        <h1 className="titulo-seccion">Carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/" className="boton chico" style={{ marginTop: 14 }}>Ver perfumes</Link>
      </div>
    );
  }

  return (
    <div className="carrito">
      <h1 className="titulo-seccion">Carrito</h1>

      <ul className="carrito-lista">
        {detalle.map(({ perfume, cantidad }) => (
          <li key={perfume.id} className="carrito-item">
            <img src={urlImagen(perfume.imagen)} alt="" />
            <div className="carrito-datos">
              <p className="tarjeta-marca">{perfume.marca}</p>
              <p className="carrito-nombre">{perfume.nombre}</p>
              <p className="carrito-precio">{formatearPrecio(perfume.precio * cantidad)}</p>
              {cantidad > perfume.stock && (
                <p className="aviso-stock">Solo quedan {perfume.stock}. Ajustá la cantidad.</p>
              )}
            </div>
            <div className="carrito-cantidad">
              <button type="button" onClick={() => restar(perfume.id)} disabled={cantidad <= 1} aria-label="Restar uno">
                <RemoveRounded fontSize="small" />
              </button>
              <span aria-live="polite">{cantidad}</span>
              <button
                type="button"
                onClick={() => agregar(perfume)}
                disabled={cantidad >= perfume.stock}
                aria-label="Sumar uno"
                title={cantidad >= perfume.stock ? "No hay más stock" : ""}
              >
                <AddRounded fontSize="small" />
              </button>
            </div>
            <button type="button" className="carrito-quitar" onClick={() => quitar(perfume.id)} aria-label={`Quitar ${perfume.nombre}`}>
              <DeleteOutlineRounded />
            </button>
          </li>
        ))}
      </ul>

      <div className="carrito-pie">
        <p className="carrito-total">
          Total <strong>{formatearPrecio(total)}</strong>
        </p>

        <div className="carrito-datos-cliente">
          <div className="campo">
            <label htmlFor="nombre">Tu nombre (opcional)</label>
            <input id="nombre" className="entrada" value={nombre} maxLength={80} autoComplete="name" onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="telefono">Tu WhatsApp (opcional)</label>
            <input id="telefono" className="entrada" type="tel" value={telefono} maxLength={30} autoComplete="tel" onChange={(e) => setTelefono(e.target.value)} />
          </div>
        </div>

        {error && <p className="mensaje error" role="alert">{error}</p>}

        <button
          type="button"
          className="boton whatsapp ancho"
          onClick={pedir}
          disabled={enviando || detalle.some((i) => i.cantidad > i.perfume.stock)}
        >
          <WhatsApp fontSize="small" /> {enviando ? "Preparando pedido…" : "Pedir por WhatsApp"}
        </button>
        <p className="nota">Se abre WhatsApp con tu pedido armado para coordinar el pago y la entrega.</p>
        <button type="button" className="boton secundario chico" onClick={vaciar}>Vaciar carrito</button>
      </div>
    </div>
  );
}
