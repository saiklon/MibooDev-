# NANO OS — Music Edition

Experiencia web instalable inspirada en el iPod nano de tercera generación.

## Funciones
- Reproductor de audio real mediante HTML Audio.
- Importación de archivos desde el dispositivo.
- Biblioteca persistente local con IndexedDB.
- Navegación por canciones, álbumes y artistas.
- Click Wheel, controles táctiles y teclado.
- Volumen, anterior/siguiente y posición de reproducción.
- PWA con manifiesto y Service Worker.

## Privacidad
Los archivos se guardan en IndexedDB en el dispositivo. No se suben a GitHub ni a un servidor. Borrar los datos del sitio puede eliminar la biblioteca. Los formatos reproducibles dependen de los códecs del navegador.

## Desarrollo
Sirve la carpeta con un servidor local (por ejemplo: python -m http.server 8000) y abre localhost:8000. PWA requiere HTTPS o localhost.

NANO OS es un proyecto independiente inspirado en un reproductor clásico. No es firmware de Apple ni controla un iPod físico.
