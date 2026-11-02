const pesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

/** 25000 → "$ 25.000" */
export function formatearPrecio(valor) {
  return pesos.format(Number(valor) || 0);
}

export const GENEROS = [
  { valor: "femenino", nombre: "Femenino" },
  { valor: "masculino", nombre: "Masculino" },
  { valor: "unisex", nombre: "Unisex" },
];

/** Las fotos viejas están en public/images; las nuevas se suben a Supabase y guardan la URL completa */
export function urlImagen(imagen) {
  if (!imagen) return "/images/perfumeIcon.png";
  if (/^https?:\/\//.test(imagen)) return imagen;
  return `/images/${imagen}`;
}

export const WHATSAPP = import.meta.env.VITE_WHATSAPP || "5491161950112";
export const INSTAGRAM = "widistoreok__";
