import { useForm, ValidationError } from "@formspree/react";
import './ContactForm.css'

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xvgpjpkb");
  if (state.succeeded) {
    return (
      <p>Gracias por su consulta! Le estaremos respondiendo a la brevedad.</p>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="contactForm">
      <label htmlFor="nombre" className="labelNombre">Nombre:</label>
      <input id="nombre" type="text" name="nombre" required/>

      <label htmlFor="nombre">Whatsapp:</label>
      <input id="nombre" type="number" name="nombre" className="inputWhatsapp" required/>

      <label htmlFor="email">Email:</label>
      <input id="email" type="email" name="email" />

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
