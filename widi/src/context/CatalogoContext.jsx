import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase, supabaseConfigurado, mensajeError } from "../lib/supabase";
import perfumesLocales from "../lib/perfumesLocales.js";

const CatalogoContext = createContext(null);

/** Normaliza los datos (los viejos de perfumes.js tenían precio como texto y "img") */
function normalizar(p) {
  return {
    id: p.id,
    marca: p.marca,
    nombre: p.nombre,
    genero: String(p.genero || "unisex").toLowerCase(),
    precio: Number(p.precio) || 0,
    stock: Number(p.stock) || 0,
    imagen: p.imagen ?? p.img ?? null,
    descripcion: p.descripcion ?? "",
    destacado: Boolean(p.destacado),
    activo: p.activo !== false,
  };
}

/**
 * Catálogo de perfumes. Si Supabase está configurado lee la base;
 * si no (por ejemplo, la primera vez en tu compu) usa la lista local de perfumes.js.
 */
export function CatalogoProvider({ children }) {
  const [perfumes, setPerfumes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const recargar = useCallback(async () => {
    setCargando(true);
    setError("");
    try {
      if (supabaseConfigurado) {
        const { data, error: err } = await supabase
          .from("perfumes")
          .select("*")
          .eq("activo", true)
          .order("marca")
          .order("nombre");
        if (err) throw err;
        setPerfumes(data.map(normalizar));
      } else {
        setPerfumes(perfumesLocales.map(normalizar));
      }
    } catch (e) {
      setError(mensajeError(e));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargar();
  }, [recargar]);

  const valor = useMemo(
    () => ({ perfumes, cargando, error, recargar, busqueda, setBusqueda }),
    [perfumes, cargando, error, recargar, busqueda]
  );

  return <CatalogoContext.Provider value={valor}>{children}</CatalogoContext.Provider>;
}

export function useCatalogo() {
  return useContext(CatalogoContext);
}
