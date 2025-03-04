import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";
import styled from "styled-components";

const ContactFormContainer = styled.form`
display: flex;
  flex-direction: column;
  background-color: var(--colorSecundario);
  padding: 10px;
  justify-content: center;
  align-items: left;
  width: 100%;
  border-radius: 10px;
  min-width: 290px;
  margin-top: 20px;
`
const LabelForm = styled.label`
margin-top: 10px;
`
const InputForm = styled.input`
padding: 5px;
  border-radius: 5px;
  border: none;
  width: 100%;
  font-family: "Poppins";
  font-size: 16px;
`

const InputNombre = styled.input`
text-transform: capitalize;
padding: 5px;
  border-radius: 5px;
  border: none;
  width: 100%;
  font-family: "Poppins";
  font-size: 16px;
`

const TextArea = styled.textarea`
font-size: 16px;
  resize: none;
  padding: 5px;
  text-transform: capitalize;
  border-radius: 5px;
  border: none;
  width: 100%;
  height: 100px;
  font-family: "Poppins";
`

const ButtonForm = styled.button`
background-color: var(--colorPrimario);
    padding: 5px;
    margin-top: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-family: "Poppins";
    width: 100%;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
`

const MensajeRespusta = styled.p`
text-align: center;
font-family: "Poppins";
font-size: 15px; 
`


/* con esto le saco los botones de flecha del input number
.inputWhatsapp::-webkit-outer-spin-button,
.inputWhatsapp::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

*/




export default function ContactForm() {
  const [state, handleSubmit] = useForm("xvgpjpkb");
  const [nombre, setNombre] = useState("")

  if (state.succeeded) {
    return (
        <div>
            <MensajeRespusta>¡ Gracias por tu consulta <strong>{nombre.toUpperCase()}</strong> !</MensajeRespusta>
             <MensajeRespusta>Te estaremos respondiendo a la brevedad.</MensajeRespusta>
        </div>
      
    );
  }
  return (
    <ContactFormContainer onSubmit={handleSubmit} className="contactForm">
      <LabelForm htmlFor="nombre" className="labelNombre">Nombre:</LabelForm>
      <InputNombre id="nombre" type="text" name="nombre" className="inputNombre" required 
        onChange={(e)=>{
            setNombre(e.target.value)
        }}
      />

      <LabelForm htmlFor="whatsapp">Whatsapp:</LabelForm>
      <InputForm id="whatsapp" type="number" name="nombre" className="inputWhatsapp" required/>

      <LabelForm htmlFor="email">Email:</LabelForm>
      <InputForm id="email" type="email" name="email" required/>

      <ValidationError prefix="Email" field="email" errors={state.errors} />
    

      <LabelForm htmlFor="message">Consulta:</LabelForm>
      <TextArea id="message" name="message" required/>

      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <ButtonForm type="submit" disabled={state.submitting}>
        Enviar
      </ButtonForm>
    </ContactFormContainer>
  );
}
