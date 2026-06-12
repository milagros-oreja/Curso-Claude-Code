module.exports = function (eleventyConfig) {
  // Las paginas estaticas (.html) se copian TAL CUAL, sin procesar.
  // Asi nunca se rompe nada de lo que ya esta hecho a mano.
  eleventyConfig.addPassthroughCopy("src/index.html");
  eleventyConfig.addPassthroughCopy("src/milagros-oreja.html");
  eleventyConfig.addPassthroughCopy("src/cursos.html");

  // Recursos estaticos
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/script.js");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Imagenes: las que ya estan en la raiz y las que suba el panel (carpeta img)
  eleventyConfig.addPassthroughCopy("src/*.webp");
  eleventyConfig.addPassthroughCopy("src/*.jpg");
  eleventyConfig.addPassthroughCopy("src/*.jpeg");
  eleventyConfig.addPassthroughCopy("src/*.png");
  eleventyConfig.addPassthroughCopy("src/img");

  // Coleccion de articulos (todos los .md de src/articulos)
  eleventyConfig.addCollection("articulos", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/articulos/*.md")
      .sort((a, b) => b.date - a.date); // mas nuevo primero
  });

  // Formatea una fecha como "12 de junio, 2026"
  const MESES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  eleventyConfig.addFilter("fechaLarga", function (dateObj) {
    const d = new Date(dateObj);
    return `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]}, ${d.getUTCFullYear()}`;
  });
  // Fecha ISO (YYYY-MM-DD) para el schema
  eleventyConfig.addFilter("fechaISO", function (dateObj) {
    return new Date(dateObj).toISOString().slice(0, 10);
  });

  // Calcula minutos de lectura a partir del HTML del articulo
  eleventyConfig.addFilter("minutosLectura", function (html) {
    const texto = String(html || "").replace(/<[^>]*>/g, " ");
    const palabras = texto.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(palabras / 200));
  });

  // Solo procesamos como plantilla: Nunjucks y Markdown.
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: false,
  };
};
