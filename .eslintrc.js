module.exports = {
  extends: [
    './node_modules/@ardoq/shared-configs/eslint-app',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    node: true,
  },
  rules: {
    'no-console': ['off'],
  }
};
