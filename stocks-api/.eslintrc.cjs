module.exports = {
  root: true,
  "env": {
    "jest/globals": true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:prettier/recommended",
    "plugin:jest/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
}
