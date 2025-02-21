import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Inicio from "./components/inicio/Inicio";
import CartProvider from "./components/context/CartProvider";
import SearchProvider from "./components/context/SearchProvider";
import ContactForm from "./components/formulario/ContactForm";


function App() {
  return(
  <BrowserRouter>
  <SearchProvider>
  <CartProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/contact" element={<ContactForm/>}/>
      </Routes>
    </Layout>
    </CartProvider>
    </SearchProvider>
  </BrowserRouter>
  )
}

export default App;
