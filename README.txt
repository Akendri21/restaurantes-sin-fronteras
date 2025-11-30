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

Nota: Todos los datos se almacenan en el navegador (localStorage). Para resetear, elimina la clave "rsf_data_v2" en las herramientas del navegador o borra el almacenamiento local.
