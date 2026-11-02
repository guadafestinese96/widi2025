# Widi Store

Tienda online de perfumes de Widi Store, con catálogo, carrito, favoritos, pedidos por WhatsApp y un panel de administración para cargar perfumes, precios, stock y fotos.

Hecha con **React + Vite** y **Supabase** (base de datos, login del panel y fotos).

## Cómo correrla en tu compu

```bash
cd widi
npm install
npm run dev        # http://localhost:5173
```

Sin configurar nada, la tienda muestra la lista original de perfumes (solo para ver). Para que use la base de datos y tener el panel, seguí estos pasos una sola vez.

## Puesta en marcha con Supabase

1. **Crear el proyecto** en [supabase.com](https://supabase.com) (plan gratis).
2. **Crear las tablas**: Supabase → *SQL Editor* → *New query* → pegá todo `supabase/schema.sql` → *Run*.
   Crea los perfumes (ya carga los 44 que había), los pedidos, las fotos y las reglas de seguridad.
3. **Crear tu usuario de admin**: *Authentication → Users → Add user → Create new user* con tu mail y una contraseña fuerte (tildá *Auto Confirm User*).
4. **Darle permiso de admin**: en el SQL Editor, con tu mail:
   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users where email = 'TU_MAIL';
   ```
5. **Cerrar el registro público**: *Authentication → Sign In / Providers → Email* → desactivá *Allow new users to sign up*. Así nadie más puede crearse una cuenta.
6. **Conectar la página**: copiá `.env.example` como `.env` y completalo con *Project Settings → API* (*Project URL* y la clave *anon / publishable*). Reiniciá `npm run dev`.
7. Entrá a `http://localhost:5173/admin` con tu usuario.

## Uso del panel (`/admin`)

- **Perfumes**: agregar, editar, borrar, subir foto, cambiar precio y stock (+ / −), marcar como *Destacado* (aparece arriba en la tienda) u *Oculto* (no se muestra).
- **Pedidos**: cada vez que alguien toca *Pedir por WhatsApp* queda registrado acá con número, productos y total.
  - **Confirmar (cobrado)**: descuenta el stock automáticamente.
  - **Cancelar**: si estaba confirmado, devuelve el stock.

## Publicarla en Vercel

1. Subí los cambios a GitHub.
2. En [vercel.com](https://vercel.com) → *Add New → Project* → elegí `widi2025`.
3. En *Root Directory* poné **`widi`**.
4. En *Environment Variables* cargá `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` y `VITE_WHATSAPP` (los mismos valores del `.env`).
5. *Deploy*.

## Seguridad

- El archivo `.env` **no se sube** a GitHub (está en `.gitignore`).
- La clave *anon / publishable* es pública por diseño: lo que protege los datos son las reglas de seguridad (RLS) de la base. Con esas reglas:
  - cualquiera puede **ver** los perfumes visibles, pero solo un usuario de la tabla `admins` puede crear, editar o borrar perfumes y subir fotos;
  - los pedidos se crean únicamente con la función `registrar_pedido`, que **toma los precios de la base** y verifica el stock, así que nadie puede cambiar un precio desde su navegador;
  - solo el admin ve los pedidos y puede confirmarlos o cancelarlos.
- **Nunca** pongas en la página ni en GitHub la clave *service_role* / *secret* de Supabase.
- Las fotos solo aceptan PNG, JPG o WEBP de hasta 5 MB.

## Estructura

```
widi/
├── public/images/        Fotos de los perfumes y logo
├── supabase/schema.sql   Tablas, reglas de seguridad y carga inicial
└── src/
    ├── App.jsx           Rutas
    ├── App.css           Colores y estilos generales de la marca
    ├── lib/              Conexión a Supabase, formato de precios, lista local
    ├── context/          Catálogo, carrito/favoritos y sesión del admin
    ├── layout/           Encabezado, menú rosa y barra de redes
    ├── paginas/          Inicio, Carrito, Favoritos, Contacto
    ├── tienda/           Tarjeta y detalle del perfume
    └── admin/            Panel: perfumes y pedidos
```

## Colores de la marca

| Color | Hex |
|---|---|
| Rosa claro | `#f6c7c6` |
| Crema | `#f3eee9` |
| Gris oscuro | `#1f1f1f` |

Tipografías: Bodoni Moda (nombres), Qwitcher Grypen (firma) y Poppins (texto).
