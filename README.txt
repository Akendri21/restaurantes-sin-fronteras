RESTAURANTES SIN FRONTERAS - Sistema de Gestión (v2)
==================================================

Cambios incluidos en esta versión:
- Proyecto multi-página (index, restaurantes, menus, facturacion, reportes, opiniones).
- Plantilla de factura imprimible (assets/invoice_print.html) para abrir en nueva ventana y generar PDF desde el navegador.
- Internacionalización (ES/EN) con selector de idioma.
- Sistema simulado de roles de usuario (Admin, Staff, Viewer) con permisos:
  - Admin: acceso completo.
  - Staff: no puede eliminar (botones de eliminar deshabilitados).
  - Viewer: solo lectura (formularios y botones principales deshabilitados).
- Datos iniciales (5 restaurantes, 10 platillos cada uno) persistidos en localStorage bajo "rsf_data_v2".
- Abre con Live Server en VS Code sin necesidad de consola.

Instrucciones:
1. Extrae el ZIP.
2. Abre la carpeta en VS Code.
3. Usa Live Server para abrir cualquiera de las páginas (index.html recomendado).
4. Para probar roles: botón "Login" -> seleccionar Admin/Staff/Viewer.
5. Para imprimir factura: en la página de Facturación, generar factura y usar "Imprimir" en la lista (abre plantilla imprimible).

Nota: dar creditos a DMZ.B.ala.4.2.0

Despliegue del backend (opcional)
-------------------------------
1) Este proyecto tiene un backend mínimo en `server/` (Node/Express + lowdb) que proporciona API y protección de páginas con JWT.
2) Para ejecutarlo localmente:
  - Instala Node.js 18+.
  - Desde la carpeta `server` ejecuta:
    ```powershell
    cd server
    npm install
    npm start
    ```
  - Visita http://localhost:3000/login.html y usa los usuarios precargados (DUEÑO/DUEÑO123 etc).
3) Para producción:
  - Configura `JWT_SECRET` como variable de entorno.
  - Implementa el servidor en un host (Railway, Render, Heroku, Vercel Serverless no recomendable) y actualiza `API_BASE` en `assets/app.js` si el dominio difiere.
  - Asegura CORS para permitir orígenes seguros, o despliega frontend y backend en el mismo dominio para que las cookies HttpOnly funcionen sin problemas.

  Ejecutar con Docker (opcional)
  ----------------------------
  1) Construir imagen desde la carpeta `server`:
    ```powershell
    cd server
    docker build -t rsf-server .
    ```
  2) Ejecutar contenedor:
    ```powershell
    docker run -p 3000:3000 -e JWT_SECRET=super-secret -d rsf-server
    ```
  3) Accede a http://localhost:3000/login.html

Advertencia de seguridad:
 - Las cookies HttpOnly/Session y JWT en este demo son para pruebas. No usar en producción sin reforzar seguridad, HTTPS, protección CSRF y uso de DB real para usuarios.

