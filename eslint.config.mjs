import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JS/JSX com React
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    plugins: { js, react: pluginReact },
    extends: ["js/recommended", pluginReact.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
    settings: { react: { version: "detect" } },
    rules: {
    "react/react-in-jsx-scope": "off",
  },
  },

  // JSON
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"] },

  // Markdown
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },

  // CSS
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },

  // Ignorar arquivos
  {
    ignores: [
      "node_modules/",
      "android/",
      "ios/",
      ".expo/",
      "**/*.json",
      "babel.config.js",
    ],
  },
]);
