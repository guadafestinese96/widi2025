import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "../tienda/Tienda.css";

export default function Contacto() {
  const [estado, enviar] = useForm("xvgpjpkb");
  const [nombre, setNombre] = useState("");

  if (estado.succeeded) {
    return (
      <div className="contacto-gracias">
        <p>¡Gracias por tu consulta, <strong>{nombre}</strong>!</p>
        <p>Te respondemos a la brevedad.</p>
      </div>
    );
  }

  return (
    <div className="contacto">
      <h1 className="titulo-seccion">Contacto</h1>
      <form onSubmit={enviar} className="contacto-form">
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" className="entrada" required autoComplete="name" onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="campo">
          <label htmlFor="whatsapp">WhatsApp</label>
          <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" className="entrada" required autoComplete="tel" />
        </div>
        <div className="campo">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className="entrada" required autoComplete="email" />
          <ValidationError prefix="Email" field="email" errors={estado.errors} />
        </div>
        <div className="campo">
          <label htmlFor="mensaje">Consulta</label>
          <textarea id="mensaje" name="message" className="entrada" required />
          <ValidationError prefix="Consulta" field="message" errors={estado.errors} />
        </div>
        <button type="submit" className="boton ancho" disabled={estado.submitting}>
          {estado.submitting ? "Enviando…" : "Enviar consulta"}
        </button>
      </form>
    </div>
  );
}
