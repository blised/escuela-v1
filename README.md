# 📚 Material Didáctico de Ciberseguridad — CBTIS 95

Plataforma web de apoyo para la especialidad de **Ciberseguridad del CBTIS 95**. Permite consultar unidades, temas y recursos PDF, así como realizar prácticas interactivas de Python y pseudocódigo directamente en el navegador.

🔗 **Repositorio:** [blised/escuela-v1](https://github.com/blised/escuela-v1)

---

## 🚀 Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) | Framework principal (App Router) |
| [React](https://react.dev/) | Interfaz de usuario |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos base |
| [Supabase](https://supabase.com/) | Base de datos (PostgreSQL), autenticación y storage |
| [Supabase SSR](https://supabase.com/docs/guides/auth/server-side) | Manejo de sesión en servidor y middleware |
| [Monaco Editor](https://github.com/suren-atoyan/monaco-react) | Editor de código Python en el navegador |
| [Pyodide](https://pyodide.org/) | Ejecución de Python con WebAssembly en el navegador |
| [Cloudflare](https://www.cloudflare.com/) | Despliegue en producción (Workers / Pages) |

---

## 📁 Estructura del proyecto

```
escuela-v1/
├── public/
│   └── pdfs/                        # PDFs estáticos (respaldo local)
├── src/
│   ├── app/
│   │   ├── page.js                  # Página principal (tarjetas de unidades)
│   │   ├── unidad/[slug]/page.js    # Página dinámica por unidad
│   │   ├── practicas/[id]/page.js   # Página de práctica Python
│   │   ├── login/page.js            # Inicio de sesión
│   │   ├── signup/page.js           # Registro
│   │   ├── auth/callback/route.js   # Callback OAuth Google
│   │   └── admin/
│   │       ├── page.js              # Panel de administración
│   │       ├── practicas/           # CRUD prácticas Python
│   │       └── pseudocodigo/        # CRUD prácticas pseudocódigo
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Sidebar.js
│   │   ├── PDFviewer.js
│   │   ├── PythonPracticeRunner.js
│   │   ├── PseudocodePracticeRunner.js
│   │   ├── HomeClient.js
│   │   ├── UnidadClient.js
│   │   ├── UnitCard.js
│   │   ├── login-form.js
│   │   ├── signup-form.js
│   │   └── admin/
│   │       ├── AdminClient.js
│   │       ├── EditarTemaModal.js
│   │       ├── EditarUnidadModal.js
│   │       ├── EliminarTemaBtn.js
│   │       ├── EliminarUnidadBtn.js
│   │       ├── PracticaForm.js
│   │       └── PseudocodePracticaForm.js
│   ├── hooks/
│   │   └── useUser.js               # Hook para obtener usuario y rol
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.js            # Cliente Supabase (navegador)
│   │       └── server.js            # Cliente Supabase (servidor)
│   └── styles/
│       ├── globals.css
│       ├── UnidadPage.css
│       └── LoginPage.css
└── middleware.js                    # Protección de rutas /admin
```

---

## 🗄️ Base de datos (Supabase)

### Tablas

| Tabla | Descripción |
|---|---|
| `usuarios` | Perfiles de usuarios con roles (`admin` / `alumno`) |
| `unidades` | Unidades del curso con slug y orden |
| `temas` | Temas dentro de cada unidad con URL del PDF |
| `practicas_python` | Prácticas interactivas con editor de código Python |
| `practicas_pseudocodigo` | Prácticas de ordenamiento de bloques de pseudocódigo |

### Seguridad (Row Level Security)

- Cualquier visitante puede **leer** unidades, temas y prácticas publicadas
- Solo usuarios autenticados pueden ver su propio perfil
- Solo administradores pueden **crear, editar y eliminar** contenido
- Las políticas usan una función `is_admin()` para evitar recursión infinita en RLS

---

## ✨ Funcionalidades

### Para todos los visitantes
- Ver las 4 unidades del curso en tarjetas en la página principal
- Navegar a cada unidad y ver sus temas en un sidebar
- Previsualizar PDFs directamente en el navegador
- Descargar PDFs de cualquier tema
- Ver y completar prácticas interactivas de Python y pseudocódigo sin necesidad de cuenta

### Para usuarios registrados (alumnos)
- Iniciar sesión con correo y contraseña o con Google
- Registrarse con nombre, correo y contraseña
- Acceder a todo el contenido sin restricciones adicionales

### Para administradores
- Ver el enlace **Panel Admin** en el navbar
- **Gestionar unidades:** crear, editar título/descripción/slug y eliminar unidades desde la página principal
- **Gestionar temas:** agregar, editar (título, descripción, PDF) y eliminar temas dentro de cada unidad
- **Gestionar prácticas Python:** crear prácticas con código inicial, salida esperada y editor Monaco; editar y eliminar
- **Gestionar prácticas de pseudocódigo:** crear prácticas con bloques arrastrables, definir el orden correcto de la solución y retroalimentación; editar y eliminar
- **Gestionar usuarios:** ver todos los usuarios registrados y cambiar su rol entre `alumno` y `admin`

---

## 🐍 Prácticas de Python (Pyodide)

El alumno puede escribir y ejecutar código Python **directamente en el navegador** sin instalar nada, gracias a [Pyodide](https://pyodide.org/) (Python compilado a WebAssembly).

- Editor de código con resaltado de sintaxis (Monaco Editor)
- Soporte para `input()` mediante prompts del navegador
- Captura de `print()` y visualización de la salida
- Validación automática comparando la salida con la salida esperada definida por el admin
- Botón de reseteo al código inicial

---

## 📋 Prácticas de Pseudocódigo

El alumno ordena bloques de pseudocódigo para construir un algoritmo correcto.

- Bloques desordenados disponibles para seleccionar
- Área de construcción del algoritmo con flechas para reordenar
- Validación instantánea al presionar **Validar**
- Retroalimentación personalizada al responder correctamente
- Contador de intentos
- Botón de reseteo

---

## ⚙️ Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/blised/escuela-v1.git
cd escuela-v1

# Instalar dependencias
pnpm install

# Crear archivo de variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Iniciar el servidor de desarrollo
pnpm dev
```

### Variables de entorno requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=https://tuproyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

---

## 🌐 Despliegue

La aplicación está desplegada en **Cloudflare** usando OpenNext para compatibilidad con Next.js App Router.

---

## 👨‍💻 Autor

**Solis Molina Jesus Alberto** — E22080461  
CBTIS 95 · Especialidad en Ciberseguridad · Taller de Investigación II · 9SC  
Mérida, Yucatán — 2026
