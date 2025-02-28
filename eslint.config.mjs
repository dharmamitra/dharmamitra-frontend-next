import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import reactPlugin from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import jsxA11y from "eslint-plugin-jsx-a11y"
import prettier from "eslint-plugin-prettier"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import importPlugin from "eslint-plugin-import"
import nextPlugin from "@next/eslint-plugin-next"

const ignorePatterns = [
  ".next/",
  "node_modules/",
  "yarn.lock",
  "coverage/",
  "test-results/",
  "playwright-report/",
  "blob-report/",
  "playwright/.cache/",
  "*.d.ts",
]

/** @type {import('eslint').Linter.Config} */
export default [
  // Global configuration
  {
    ignores: ignorePatterns,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },

  // Base configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // Main configuration for all files
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      prettier: prettier,
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
      "@next/next": nextPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      /**
       * JAVASCRIPT RULES
       */
      "prefer-const": "error",
      "no-var": "error",
      "no-unused-vars": "off", // duplicate with typescript-eslint/no-unused-vars
      "object-shorthand": "error",
      "quote-props": ["error", "as-needed"],
      "no-console": "error", // Enable no-console by default

      /**
       * TYPESCRIPT RULES
       */
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
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_|^[A-Z]",
        "ignoreRestSiblings": true,
        "args": "after-used"
      }],

      /**
       * REACT RULES
       */
      "react/jsx-fragments": ["error", "syntax"], // Shorthand syntax for React fragments
      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: ["ts", "tsx"],
        },
      ],
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // Not needed with TypeScript

       /**
       * NEXT.JS RULES
       */
       ...nextPlugin.configs.recommended.rules,
       ...nextPlugin.configs["core-web-vitals"].rules,
 

      /**
       * ACCESSIBILITY RULES
       */
      "jsx-a11y/no-autofocus": [
        2,
        {
          // focus order success criterion: https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html
          // TODO: review focus return handling.
          ignoreNonDOM: true,
        },
      ],

      /**
       * PRETTIER RULES
       */
      "prettier/prettier": "error",

     
      /**
       * IMPORT RULES
       */
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports.
            ["^\\u0000"],
            [
              // Node.js builtins prefixed with `react:`....
              "^react",
              "^react-native",
              "^next",
              "^axios",
              "^graphql",
              "^urql",
              "^pages",
              "^views",
              "^node:",
              // Packages.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              "^@?\\w",
            ],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ["^"],
            // Relative imports.
            // Anything that starts with a dot.
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

    },
  },

  /**
   * CUSTOM RULES
   */
  {
    // Allow console logs in server-side code
    files: [
      "**/app/next/api/**/*.ts", 
      "**/lib/ai/server-side-utils.ts"
    ],
    rules: {
      "no-console": "off",
    },
  },
]
