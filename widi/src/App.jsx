import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Inicio from "./components/inicio/Inicio";
import CartProvider from "./components/context/CartProvider";
import SearchProvider from "./components/context/SearchProvider";


function App() {
  return(
  <BrowserRouter>
  <SearchProvider>
  <CartProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        
      </Routes>
    </Layout>
    </CartProvider>
    </SearchProvider>
  </BrowserRouter>
  )
}

export default App;
