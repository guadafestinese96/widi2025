import { useForm, ValidationError } from "@formspree/react";
import './ContactForm.css'
import { useState } from "react";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xvgpjpkb");
  const [nombre, setNombre] = useState("")

  if (state.succeeded) {
    return (
        <div>
            <p className="mensajeRespuesta">¡ Gracias por tu consulta <strong>{nombre.toUpperCase()}</strong> !</p>
             <p className="mensajeRespuesta">Te estaremos respondiendo a la brevedad.</p>
        </div>
      
    );
  }
  return (
    <form onSubmit={handleSubmit} className="contactForm">
      <label htmlFor="nombre" className="labelNombre">Nombre:</label>
      <input id="nombre" type="text" name="nombre" className="inputNombre" required 
        onChange={(e)=>{
            setNombre(e.target.value)
        }}
      />

      <label htmlFor="nombre">Whatsapp:</label>
      <input id="nombre" type="number" name="nombre" className="inputWhatsapp" required/>

      <label htmlFor="email">Email:</label>
      <input id="email" type="email" name="email" required/>

      <ValidationError prefix="Email" field="email" errors={state.errors} />
    

      <label htmlFor="message">Consulta:</label>
      <textarea id="message" name="message" required/>

      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        Enviar
      </button>
    </form>
  );
}
