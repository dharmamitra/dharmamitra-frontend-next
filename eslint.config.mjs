import js from "@eslint/js";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next"
import { defineConfig } from "eslint/config"
import prettierConfig from "eslint-config-prettier/flat"
import importPlugin from "eslint-plugin-import"
import jsxA11y from "eslint-plugin-jsx-a11y"
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths"
import prettierPlugin from "eslint-plugin-prettier"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals";


/** @type {import('eslint').Linter.Config} */
const eslintConfig = defineConfig([
  {
    ignores: [
      ".next/",
      "node_modules/",
      "next.config.js",
      "next-i18next.config.js",
      "next-seo.config.js",
      "eslint.config.mjs",
      "yarn.lock",
      "**/*.d.ts",
    ],
  },
  {
    ...prettierConfig,
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
      prettier: prettierPlugin,
      "no-relative-import-paths": noRelativeImportPaths,
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
        NodeListOf: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: "module",
      },
      sourceType: "module",
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        {
          args: "none",
          caughtErrors: "none",
          ignoreRestSiblings: true,
          vars: "all",
        },
      ],
    },
  },
   {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "prettier/prettier": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            [
              "^react",
              "^react-native",
              "^next",
              "^axios",
              "^graphql",
              "^urql",
              "^pages",
              "^views",
              "^@?\\w",
            ],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "off",
      "import/no-duplicates": "error",
      "import/no-anonymous-default-export": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...jsxA11y.configs.recommended.rules,
      "@next/next/no-img-element": "error",
      "jsx-a11y/no-autofocus": [
        2,
        {
          // focus order success criterion: https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html
          // TODO: review focus return handling.
          ignoreNonDOM: true,
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
    languageOptions: {
      parser: tsEslintParser,
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
       "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_|^[A-Z]",
          ignoreRestSiblings: true,
          args: "after-used",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  // TARGETED OVERRIDES
  {
    files: ["./src/lib/api/*.ts"],
    rules: {
      "no-use-before-define": "off",
    },
  },
  {
    files: ["./src/components/memoized-markdown.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
])

export default eslintConfig
