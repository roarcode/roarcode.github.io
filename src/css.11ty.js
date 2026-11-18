// Emits the bundled, hashed stylesheet (built in lib/css.js).
export default class {
  data() {
    return { permalink: (d) => d.css.file, eleventyExcludeFromCollections: true };
  }
  render(d) {
    return d.css.css;
  }
}
