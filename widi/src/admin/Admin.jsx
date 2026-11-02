import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabaseConfigurado, mensajeError } from "../lib/supabase";
import AdminPerfumes from "./AdminPerfumes";
import AdminPedidos from "./AdminPedidos";
import "./Admin.css";

function Ingreso() {
  const { ingresar } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      await ingresar(email.trim(), password);
    } catch (err) {
      setError(mensajeError(err));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="admin-ingreso" onSubmit={enviar}>
      <img src="/images/widiLogo2025.png" alt="Widi Store" width="96" height="96" />
      <h1>Panel de Widi</h1>
      <div className="campo">
        <label htmlFor="email">Mail</label>
        <input id="email" type="email" className="entrada" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="campo">
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" className="entrada" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p className="mensaje error" role="alert">{error}</p>}
      <button className="boton ancho" type="submit" disabled={enviando}>{enviando ? "Ingresando…" : "Ingresar"}</button>
      <Link to="/" className="admin-volver">Volver a la tienda</Link>
    </form>
  );
}

export default function Admin() {
  const { usuario, esAdmin, listo, salir } = useAuth();
  const [seccion, setSeccion] = useState("perfumes");

  if (!supabaseConfigurado) {
    return (
      <div className="admin-aviso">
        <h1>Falta conectar la base de datos</h1>
        <p>
          Creá el archivo <code>.env</code> con los datos de Supabase (copiá <code>.env.example</code>) y reiniciá{" "}
          <code>npm run dev</code>. Los pasos están en el README.
        </p>
        <Link to="/" className="boton">Volver a la tienda</Link>
      </div>
    );
  }

  if (!listo) return <p className="cargando">Cargando…</p>;
  if (!usuario) return <Ingreso />;

  if (!esAdmin) {
    return (
      <div className="admin-aviso">
        <h1>Esta cuenta no es administradora</h1>
        <p>Ingresaste como {usuario.email}, pero no tiene permiso para el panel.</p>
        <button type="button" className="boton" onClick={salir}>Salir</button>
      </div>
    );
  }

  return (
    <div className="admin">
      <header className="admin-encabezado">
        <img src="/images/widiLogo2025.png" alt="" width="40" height="40" />
        <strong>Panel</strong>
        <nav className="admin-pestanas" aria-label="Secciones del panel">
          <button type="button" aria-pressed={seccion === "perfumes"} onClick={() => setSeccion("perfumes")}>Perfumes</button>
          <button type="button" aria-pressed={seccion === "pedidos"} onClick={() => setSeccion("pedidos")}>Pedidos</button>
        </nav>
        <div className="admin-cuenta">
          <Link to="/">Ver tienda</Link>
          <button type="button" onClick={salir}>Salir</button>
        </div>
      </header>
      <main className="admin-contenido">
        {seccion === "perfumes" ? <AdminPerfumes /> : <AdminPedidos />}
      </main>
    </div>
  );
}
