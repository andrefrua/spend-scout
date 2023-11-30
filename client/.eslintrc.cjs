module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    jest: true
  },
  extends: [
    "airbnb-typescript-prettier",
    "ts-react-important-stuff",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/strict",
    "plugin:react/jsx-runtime"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function"
      }
    ],
    "react/jsx-props-no-spreading": "off",
    "no-restricted-exports": "off",
    // We don't want to be forced to have a default export in all files
    "import/prefer-default-export": "off",
    // Needed to avoid the error when importing an alias defined on the paths property on tsconfig.json file
    "import/no-unresolved": "off",
    // Ignore the rule on object destructuring
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true }
    ],
    "react/require-default-props": "off"
  },
  overrides: [
    {
      files: ["**/*.test.{ts,tsx}", "vite.config.ts"],
      rules: {
        // We want to disable this rule for test files because we want to use the dependencies on the parent package.json
        "import/no-extraneous-dependencies": "off"
      }
    },
    {
      files: ["**/*.test.{ts,tsx}"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off"
      }
    },
    {
      files: ["*.cjs"],
      rules: {
        // Disable Typescript rules in cjs files
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      files: [
        "**/components/mui/**/*.{ts,tsx}",
        "**/components/**/*.styles.{ts,tsx}",
        "**/components/**/*.models.{ts,tsx}",
        "**/assets/**/*.{ts,tsx}"
      ],
      rules: {
        // TODO: We should try to enable this rule again in the future and fix the issues
        // Disable the no explicit any for components extended from MUI, due to typing issues
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
};
