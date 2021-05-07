module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // parser: '@typescript-eslint/parser',
  // plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',

    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    eqeqeq: ['error', 'always'],
    // 'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
