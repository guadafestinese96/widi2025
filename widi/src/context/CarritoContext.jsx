import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCatalogo } from "./CatalogoContext";

const CarritoContext = createContext(null);

function leer(clave) {
  try {
    const guardado = JSON.parse(localStorage.getItem(clave) || "[]");
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    /* navegador sin almacenamiento: el carrito vive solo mientras la página está abierta */
  }
}

/**
 * Carrito y favoritos.
 * Se guardan solo los id y las cantidades: el precio y el stock siempre salen del catálogo actual,
 * así si cambiás un precio desde el panel, el carrito lo muestra actualizado.
 */
export function CarritoProvider({ children }) {
  const { perfumes } = useCatalogo();
  const [items, setItems] = useState(() => leer("widi_carrito"));
  const [favoritos, setFavoritos] = useState(() => leer("widi_favoritos"));

  useEffect(() => guardar("widi_carrito", items), [items]);
  useEffect(() => guardar("widi_favoritos", favoritos), [favoritos]);

  const porId = useMemo(() => new Map(perfumes.map((p) => [p.id, p])), [perfumes]);

  // Detalle del carrito con datos actualizados; descarta lo que ya no existe
  const detalle = useMemo(
    () =>
      items
        .map((i) => ({ perfume: porId.get(i.id), cantidad: i.cantidad }))
        .filter((i) => i.perfume),
    [items, porId]
  );

  const total = detalle.reduce((t, i) => t + i.perfume.precio * i.cantidad, 0);
  const cantidadTotal = detalle.reduce((t, i) => t + i.cantidad, 0);

  const cantidadDe = (id) => items.find((i) => i.id === id)?.cantidad ?? 0;

  /** Suma una unidad sin pasarse del stock. Devuelve false si no hay más stock. */
  const agregar = (perfume) => {
    const actual = cantidadDe(perfume.id);
    if (actual >= perfume.stock) return false;
    setItems((lista) =>
      actual
        ? lista.map((i) => (i.id === perfume.id ? { ...i, cantidad: i.cantidad + 1 } : i))
        : [...lista, { id: perfume.id, cantidad: 1 }]
    );
    return true;
  };

  const restar = (id) =>
    setItems((lista) =>
      lista.map((i) => (i.id === id ? { ...i, cantidad: Math.max(1, i.cantidad - 1) } : i))
    );

  const quitar = (id) => setItems((lista) => lista.filter((i) => i.id !== id));
  const vaciar = () => setItems([]);

  const esFavorito = (id) => favoritos.includes(id);
  const alternarFavorito = (id) =>
    setFavoritos((lista) => (lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]));

  const perfumesFavoritos = favoritos.map((id) => porId.get(id)).filter(Boolean);

  const valor = {
    detalle,
    total,
    cantidadTotal,
    cantidadDe,
    agregar,
    restar,
    quitar,
    vaciar,
    esFavorito,
    alternarFavorito,
    perfumesFavoritos,
  };

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  return useContext(CarritoContext);
}
