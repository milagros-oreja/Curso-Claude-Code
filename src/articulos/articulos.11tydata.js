module.exports = {
  // Todos los articulos usan esta plantilla
  layout: "articulo.njk",
  // Y viven en /articulos/<nombre-del-archivo>/
  eleventyComputed: {
    permalink: (data) => `/articulos/${data.page.fileSlug}/`,
  },
};
