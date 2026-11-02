import { createContext, useContext, useEffect, useState } from "react";
import { supabase, supabaseConfigurado } from "../lib/supabase";

const AuthContext = createContext(null);

/**
 * Sesión del panel de administración (Supabase Auth).
 * esAdmin lo decide la base de datos (tabla admins), no el navegador.
 */
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [esAdmin, setEsAdmin] = useState(false);
  const [listo, setListo] = useState(!supabaseConfigurado);

  useEffect(() => {
    if (!supabaseConfigurado) return;

    const revisar = async (sesion) => {
      const user = sesion?.user ?? null;
      setUsuario(user);
      if (user) {
        const { data } = await supabase.rpc("es_admin");
        setEsAdmin(data === true);
      } else {
        setEsAdmin(false);
      }
      setListo(true);
    };

    supabase.auth.getSession().then(({ data }) => revisar(data.session));
    const { data } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      // Se difiere para no bloquear el aviso de Supabase
      setTimeout(() => revisar(sesion), 0);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const ingresar = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const salir = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ usuario, esAdmin, listo, ingresar, salir }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
