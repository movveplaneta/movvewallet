OPTIMIZACION PAGESPEED APLICADA

Cambios realizados:
- Conversión de imágenes grandes a WebP.
- Reducción de peso de logos, carrusel, tutoriales, transparencia y poster.
- Imágenes debajo del primer pantallazo con loading="lazy".
- Hero/logo principal con fetchpriority="high".
- Videos con preload="none" para no cargar MP4 antes de tiempo.
- CSS compactado.
- content-visibility para secciones no iniciales.
- Ajustes extra para móvil pequeño.

Después de subir:
1. Espera 1-5 minutos.
2. Prueba en incógnito.
3. Repite PageSpeed en móvil.
4. Si sigue bajo, el siguiente paso es mover el video MP4 pesado a YouTube/CDN o quitarlo del repo principal.
