import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const clave = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** true cuando el archivo .env tiene los datos de Supabase */
export const supabaseConfigurado = Boolean(url && clave);

export const supabase = supabaseConfigurado ? createClient(url, clave) : null;

/** Mensaje de error entendible a partir de un error de Supabase */
export function mensajeError(error) {
  const texto = error?.message || String(error || "");
  if (/invalid login credentials/i.test(texto)) return "El mail o la contraseña no coinciden.";
  if (/failed to fetch/i.test(texto)) return "No hay conexión. Revisá internet y probá de nuevo.";
  return texto || "Ocurrió un error. Probá de nuevo.";
}
