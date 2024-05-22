const javascriptRules = {
  "prefer-const": "error",
  "no-var": "error",
  "no-unused-vars": "error",
  "object-shorthand": "error",
  "quote-props": ["error", "as-needed"],
}

const typescriptRules = {
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
  "@typescript-eslint/no-unused-vars": "off", // duplicate rule
}

const reactRules = {
  "react/jsx-fragments": ["error", "syntax"], // Shorthand syntax for React fragments
  "react/jsx-filename-extension": [
    "warn",
    {
      extensions: ["ts", "tsx"],
    },
  ],
  "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
  "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  "react/react-in-jsx-scope": "off",
  "react/prop-types": "off",
}

const importRules = {
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
}

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "next",
    "eslint:recommended",
    "prettier",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: [
    "prettier",
    "@typescript-eslint",
    "react",
    "react-hooks",
    "simple-import-sort",
  ],
  rules: {
    ...javascriptRules,
    ...typescriptRules,
    ...reactRules,
    ...importRules,
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
  settings: {
    react: {
      version: "detect",
    },
  },
}
