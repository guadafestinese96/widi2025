import { useEffect, useMemo, useState } from "react";
import { AddRounded, RemoveRounded, StarBorderRounded, StarRounded } from "@mui/icons-material";
import { supabase, mensajeError } from "../lib/supabase";
import { useCatalogo } from "../context/CatalogoContext";
import { GENEROS, formatearPrecio, urlImagen } from "../lib/formato";

const VACIO = {
  id: null,
  marca: "",
  nombre: "",
  genero: "femenino",
  precio: "",
  stock: 1,
  descripcion: "",
  imagen: "",
  destacado: false,
  activo: true,
};

const TIPOS_FOTO = ["image/png", "image/jpeg", "image/webp"];
const MAX_FOTO = 5 * 1024 * 1024;

export default function AdminPerfumes() {
  const { recargar: recargarTienda } = useCatalogo();
  const [perfumes, setPerfumes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [aviso, setAviso] = useState({ tipo: "", texto: "" });
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [form, setForm] = useState(VACIO);
  const [foto, setFoto] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [aBorrar, setABorrar] = useState(null);

  const avisar = (tipo, texto) => {
    setAviso({ tipo, texto });
    if (tipo === "ok") setTimeout(() => setAviso({ tipo: "", texto: "" }), 3500);
  };

  const cargar = async () => {
    setCargando(true);
    const { data, error } = await supabase.from("perfumes").select("*").order("marca").order("nombre");
    if (error) avisar("error", mensajeError(error));
    else setPerfumes(data);
    setCargando(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  const marcas = useMemo(() => [...new Set(perfumes.map((p) => p.marca))].sort(), [perfumes]);

  const visibles = useMemo(() => {
    const t = busqueda.toLowerCase().trim();
    return perfumes
      .filter((p) => !t || `${p.marca} ${p.nombre}`.toLowerCase().includes(t))
      .filter((p) =>
        filtro === "sinStock" ? p.stock <= 0 : filtro === "ocultos" ? !p.activo : filtro === "destacados" ? p.destacado : true
      );
  }, [perfumes, busqueda, filtro]);

  /** Cambio rápido de un campo (stock, precio, visible, destacado) */
  const actualizar = async (perfume, cambios) => {
    const anterior = perfumes;
    setPerfumes((lista) => lista.map((p) => (p.id === perfume.id ? { ...p, ...cambios } : p)));
    const { error } = await supabase.from("perfumes").update(cambios).eq("id", perfume.id);
    if (error) {
      setPerfumes(anterior);
      avisar("error", mensajeError(error));
    } else {
      recargarTienda();
    }
  };

  const editar = (p) => {
    setForm({ ...VACIO, ...p, descripcion: p.descripcion ?? "", imagen: p.imagen ?? "" });
    setFoto(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nuevo = () => {
    setForm(VACIO);
    setFoto(null);
  };

  const elegirFoto = (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    if (!TIPOS_FOTO.includes(archivo.type)) {
      avisar("error", "La foto tiene que ser PNG, JPG o WEBP.");
      e.target.value = "";
      return;
    }
    if (archivo.size > MAX_FOTO) {
      avisar("error", "La foto pesa más de 5 MB. Probá con una más liviana.");
      e.target.value = "";
      return;
    }
    setFoto(archivo);
  };

  const subirFoto = async () => {
    const extension = foto.type === "image/png" ? "png" : foto.type === "image/webp" ? "webp" : "jpg";
    const ruta = `${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("perfumes").upload(ruta, foto, { contentType: foto.type });
    if (error) throw error;
    return supabase.storage.from("perfumes").getPublicUrl(ruta).data.publicUrl;
  };

  const guardar = async (e) => {
    e.preventDefault();
    const precio = Number(form.precio);
    const stock = Number(form.stock);
    if (!form.marca.trim() || !form.nombre.trim()) return avisar("error", "Completá la marca y el nombre.");
    if (!(precio >= 0) || form.precio === "") return avisar("error", "Ingresá un precio válido.");
    if (!Number.isInteger(stock) || stock < 0) return avisar("error", "El stock tiene que ser un número entero desde 0.");

    setGuardando(true);
    try {
      const imagen = foto ? await subirFoto() : form.imagen || null;
      const datos = {
        marca: form.marca.trim(),
        nombre: form.nombre.trim(),
        genero: form.genero,
        precio,
        stock,
        descripcion: form.descripcion.trim() || null,
        imagen,
        destacado: form.destacado,
        activo: form.activo,
      };
      const consulta = form.id
        ? supabase.from("perfumes").update(datos).eq("id", form.id)
        : supabase.from("perfumes").insert([datos]);
      const { error } = await consulta;
      if (error) throw error;
      avisar("ok", form.id ? `Guardaste los cambios de ${datos.nombre}.` : `Agregaste ${datos.nombre}.`);
      nuevo();
      await cargar();
      recargarTienda();
    } catch (err) {
      avisar("error", mensajeError(err));
    } finally {
      setGuardando(false);
    }
  };

  const borrar = async (p) => {
    const { error } = await supabase.from("perfumes").delete().eq("id", p.id);
    setABorrar(null);
    if (error) return avisar("error", mensajeError(error));
    avisar("ok", `Borraste ${p.nombre}.`);
    if (form.id === p.id) nuevo();
    await cargar();
    recargarTienda();
  };

  const vistaPrevia = useMemo(() => (foto ? URL.createObjectURL(foto) : null), [foto]);
  useEffect(() => () => vistaPrevia && URL.revokeObjectURL(vistaPrevia), [vistaPrevia]);
  const vistaFoto = vistaPrevia || (form.imagen ? urlImagen(form.imagen) : null);

  return (
    <div className="admin-dos">
      <form className="admin-panel" onSubmit={guardar}>
        <h2>{form.id ? `Editar ${form.nombre}` : "Agregar perfume"}</h2>

        <div className="campo">
          <label htmlFor="marca">Marca</label>
          <input id="marca" className="entrada" list="lista-marcas" maxLength={80} value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} />
          <datalist id="lista-marcas">
            {marcas.map((m) => <option key={m} value={m} />)}
          </datalist>
        </div>
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" className="entrada" maxLength={120} value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        </div>
        <div className="campo">
          <span className="etiqueta">Género</span>
          <div className="fichas">
            {GENEROS.map((g) => (
              <button key={g.valor} type="button" className="ficha" aria-pressed={form.genero === g.valor} onClick={() => setForm({ ...form, genero: g.valor })}>
                {g.nombre}
              </button>
            ))}
          </div>
        </div>
        <div className="admin-dos-campos">
          <div className="campo">
            <label htmlFor="precio">Precio ($)</label>
            <input id="precio" className="entrada" type="number" min="0" step="1" inputMode="numeric" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} />
          </div>
          <div className="campo">
            <label htmlFor="stock">Stock</label>
            <input id="stock" className="entrada" type="number" min="0" step="1" inputMode="numeric" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          </div>
        </div>
        <div className="campo">
          <label htmlFor="descripcion">Descripción (opcional)</label>
          <textarea id="descripcion" className="entrada" maxLength={600} placeholder="Notas, intensidad, para qué ocasión…" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
        </div>
        <div className="campo">
          <label htmlFor="foto">Foto</label>
          <div className="admin-foto">
            {vistaFoto ? <img src={vistaFoto} alt="Vista previa" /> : <span>Sin foto</span>}
            <input id="foto" type="file" accept="image/png,image/jpeg,image/webp" onChange={elegirFoto} />
          </div>
          <span className="ayuda">PNG con fondo transparente queda mejor. Máximo 5 MB.</span>
        </div>
        <label className="casilla">
          <input type="checkbox" checked={form.destacado} onChange={(e) => setForm({ ...form, destacado: e.target.checked })} />
          Mostrar en Destacados
        </label>
        <label className="casilla">
          <input type="checkbox" checked={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.checked })} />
          Visible en la tienda
        </label>

        {aviso.texto && <p className={`mensaje ${aviso.tipo}`} role="status">{aviso.texto}</p>}

        <div className="admin-acciones">
          <button type="submit" className="boton" disabled={guardando}>
            {guardando ? "Guardando…" : form.id ? "Guardar cambios" : "Agregar perfume"}
          </button>
          {form.id && <button type="button" className="boton secundario" onClick={nuevo}>Cancelar</button>}
        </div>
      </form>

      <section>
        <div className="admin-filtros">
          <input className="entrada" type="search" placeholder="Buscar" aria-label="Buscar perfume" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          <div className="fichas">
            {[
              ["todos", "Todos"],
              ["sinStock", "Sin stock"],
              ["destacados", "Destacados"],
              ["ocultos", "Ocultos"],
            ].map(([valor, nombre]) => (
              <button key={valor} type="button" className="ficha" aria-pressed={filtro === valor} onClick={() => setFiltro(valor)}>
                {nombre}
              </button>
            ))}
          </div>
          <p className="ayuda">{visibles.length} de {perfumes.length} perfumes</p>
        </div>

        {cargando ? (
          <p className="cargando">Cargando…</p>
        ) : (
          <ul className="admin-lista">
            {visibles.map((p) => (
              <li key={p.id} className={`admin-fila ${p.activo ? "" : "oculto"}`}>
                <img src={urlImagen(p.imagen)} alt="" />
                <div className="admin-fila-datos">
                  <strong>{p.nombre}</strong>
                  <span>{p.marca} · {formatearPrecio(p.precio)}</span>
                </div>

                <div className="admin-stock" aria-label={`Stock de ${p.nombre}`}>
                  <button type="button" disabled={p.stock <= 0} onClick={() => actualizar(p, { stock: p.stock - 1 })} aria-label="Restar uno al stock">
                    <RemoveRounded fontSize="small" />
                  </button>
                  <span className={p.stock <= 0 ? "sin-stock" : ""}>{p.stock}</span>
                  <button type="button" onClick={() => actualizar(p, { stock: p.stock + 1 })} aria-label="Sumar uno al stock">
                    <AddRounded fontSize="small" />
                  </button>
                </div>

                <div className="admin-fila-acciones">
                  <button type="button" className="admin-icono" aria-pressed={p.destacado} title={p.destacado ? "Quitar de destacados" : "Destacar"} onClick={() => actualizar(p, { destacado: !p.destacado })}>
                    {p.destacado ? <StarRounded fontSize="small" /> : <StarBorderRounded fontSize="small" />}
                  </button>
                  <button type="button" className="ficha" aria-pressed={p.activo} onClick={() => actualizar(p, { activo: !p.activo })}>
                    {p.activo ? "Visible" : "Oculto"}
                  </button>
                  <button type="button" className="boton chico secundario" onClick={() => editar(p)}>Editar</button>
                  {aBorrar === p.id ? (
                    <>
                      <button type="button" className="boton chico peligro" onClick={() => borrar(p)}>Sí, borrar</button>
                      <button type="button" className="boton chico secundario" onClick={() => setABorrar(null)}>No</button>
                    </>
                  ) : (
                    <button type="button" className="boton chico secundario" onClick={() => setABorrar(p.id)}>Borrar</button>
                  )}
                </div>
              </li>
            ))}
            {!visibles.length && <li className="vacio">No hay perfumes con ese filtro.</li>}
          </ul>
        )}
      </section>
    </div>
  );
}
