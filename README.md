# Brand Reputation — Sitio web + panel de publicación

Sitio estático (Eleventy) con un panel tipo CMS (PagesCMS) para publicar artículos
sin tocar código.

## Cómo publicar un artículo (una vez todo esté conectado)

1. Entra al panel: **https://app.pagescms.org** y elige el proyecto.
2. Clic en **Artículos → Nuevo**.
3. Llena: título, resumen, categoría, fecha, palabras clave, imagen de portada y el texto.
4. Clic en **Save / Publicar**.
5. En ~1 minuto el artículo aparece solo en https://agenciabrcom.com/blog.html
   con todo el código de GEO (schema), el sitemap actualizado y la portada.

No hay que arrastrar carpetas ni tocar HTML. El "motor" (Eleventy) genera la página
y el listado del blog automáticamente al guardar.

## Estructura del proyecto

- `src/` — todo el contenido del sitio
  - `index.html`, `milagros-oreja.html`, `cursos.html` — páginas hechas a mano (se copian tal cual)
  - `blog.njk` — listado del blog (se genera solo con los artículos)
  - `articulos/*.md` — cada artículo (los crea el panel)
  - `_includes/articulo.njk` — plantilla que arma cada artículo con su GEO/schema
  - `img/` — imágenes que sube el panel
- `.eleventy.js` — configuración del motor
- `.pages.yml` — configuración del panel (campos del editor)
- `netlify.toml` — despliegue (build: `npm run build`, publica `_site`)
