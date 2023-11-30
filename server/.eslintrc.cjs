module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.test.{ts,tsx}", "**/scripts/*.ts"]
      }
    ],
    "no-restricted-exports": "off",
    // We don't want to be forced to have a default export in all files
    "import/prefer-default-export": "off",
    // Needed to avoid the error when importing an alias defined on the paths property on tsconfig.json file
    "import/no-unresolved": "off",
    "@typescript-eslint/no-empty-interface": "off"
  },
  overrides: [
    {
      files: ["**/*.test.{ts,tsx}"],
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
      files: ["**/scripts/*.{ts,tsx}"],
      rules: {
        // TODO: We should try to enable this rule again in the future and fix the issues
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ],
  ignorePatterns: ["dist/"]
};
