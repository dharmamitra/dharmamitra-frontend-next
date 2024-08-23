import path from "node:path"
import { fileURLToPath } from "node:url"
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat"
import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import prettier from "eslint-plugin-prettier"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import globals from "globals"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      "**/.next/",
      "**/node_modules/",
      "**/yarn.lock",
      "**/coverage/",
      "**/test-results/",
      "**/playwright-report/",
      "**/blob-report/",
      "playwright/.cache/",
      "**/*.d.ts",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "next",
      "eslint:recommended",
      "prettier",
      //   "next/core-web-vitals",
      "plugin:@next/next/core-web-vitals",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "plugin:jsx-a11y/recommended",
    ),
  ),
  {
    plugins: {
      prettier: fixupPluginRules(prettier),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "prefer-const": "error",
      "no-var": "error",
      "no-console": "error",
      "no-unused-vars": "error",
      "object-shorthand": "error",
      "quote-props": ["error", "as-needed"],

      "@typescript-eslint/array-type": [
        "error",
        {
          default: "array",
        },
      ],

      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "never",
        },
      ],

      // duplicate rule
      "@typescript-eslint/no-unused-vars": "off",
      // Shorthand syntax for React
      "react/jsx-fragments": ["error", "syntax"],

      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: ["ts", "tsx"],
        },
      ],
      // Checks rules of Hooks
      "react-hooks/rules-of-hooks": "error",
      // Checks effect dependencies
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports.
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
              "^node:",
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              "^@?\\w",
            ],
            ["^"],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ["^\\."],
            ["^\\u0000"],
          ],
        },
      ],

      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-anonymous-default-export": "off",
      "prettier/prettier": "error",

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
]
