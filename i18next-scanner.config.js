const fs = require("fs");

module.exports = {
  input: [
    "./src/**/*.{js,jsx}",
    // Use ! to filter out files or directories
    "!./src/**/*.spec.{js,jsx}"
  ],
  output: "./",
  options: {
    debug: true,
    func: {
      list: ["t", "i18next.t", "i18n.t"],
      extensions: [".js", ".jsx"]
    },
    lngs: ["en", "nb"],
    ns: ["resource"],
    defaultLng: "en",
    defaultNs: "resource",
    defaultValue: (lng, ns, key) => {
      if (lng === "en") {
        return key; // Use key as value for base language
      }
      return ""; // Return empty string for other languages
    },
    resource: {
      loadPath: "src/i18n/{{lng}}/{{ns}}.json",
      savePath: "src/i18n/{{lng}}/{{ns}}.json",
      jsonIndent: 4
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}"
    },
    // We disable the default trans parsing here and allow the transform function
    // defined below to take over. The default trans parsing code doesn't handle
    // some of the required babel transpiling we're using in this project, like Flow.
    trans: {
      component: "Trans",
      extensions: []
    }
  },
  transform: function customTransform(file, enc, done) {
    "use strict";
    const parser = this.parser;

    const options = {
      plugins: ["@babel/plugin-syntax-jsx"],
      presets: ["@babel/preset-flow"]
    };

    const content = fs.readFileSync(file.path, enc);

    const code = require("@babel/core").transform(content, options);
    parser.parseTransFromString(code.code);
    done();
  }
};
