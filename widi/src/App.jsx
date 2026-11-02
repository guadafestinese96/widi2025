import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CatalogoProvider } from "./context/CatalogoContext";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./layout/Layout";
import Inicio from "./paginas/Inicio";
import Carrito from "./paginas/Carrito";
import Favoritos from "./paginas/Favoritos";
import Contacto from "./paginas/Contacto";

// El panel se descarga solo cuando alguien entra a /admin
const Admin = lazy(() => import("./admin/Admin"));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CatalogoProvider>
          <CarritoProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Inicio />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/contact" element={<Navigate to="/contacto" replace />} />
                <Route path="/vertodos" element={<Navigate to="/" replace />} />
              </Route>
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<p className="cargando">Cargando panel…</p>}>
                    <Admin />
                  </Suspense>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CarritoProvider>
        </CatalogoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
