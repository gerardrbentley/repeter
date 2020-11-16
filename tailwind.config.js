const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./index.html",
      "./src/**/*.vue",
      "./src/**/*.js",
      "./src/**/*.ts",
      // etc.
    ],
  },
  theme: {},
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/typography")],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
