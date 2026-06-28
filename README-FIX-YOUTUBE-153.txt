FIX YOUTUBE ERROR 153

Se aplicaron estos cambios:
1. El iframe de YouTube ahora usa:
   referrerpolicy="strict-origin-when-cross-origin"

2. El embed ahora usa:
   https://www.youtube-nocookie.com/embed/

3. El JavaScript agrega origin automáticamente:
   origin=https://movveplaneta.site

4. Se agregó un enlace de respaldo:
   "Si el reproductor no carga, abrir directamente en YouTube"

IMPORTANTE:
- Prueba la página ya subida en https://movveplaneta.site/
- Si pruebas abriendo el HTML como archivo local (file://), YouTube puede seguir bloqueando embeds porque no hay un dominio real.
- Algunos videos pueden bloquear inserción desde la configuración del propio canal/video. En ese caso, solo abrirán directamente en YouTube.
