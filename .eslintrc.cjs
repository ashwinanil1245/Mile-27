/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:hydrogen/recommended'],
  rules: {
    'no-unused-vars': 'off',
    'hydrogen/prefer-image-component': 'off',
  },
};
