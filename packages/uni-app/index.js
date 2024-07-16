const vueConfig = require('@jsxiaosi/eslint-config-vue');
const parserVue = require('vue-eslint-parser');
const parserTs = require('@typescript-eslint/parser');

module.exports = [
  ...vueConfig,
  {
    files: ['*.nvue'],
    parser: parserVue,
    parserOptions: {
      parser: parserTs,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
  {
    // 添加uni-app支持
    globals: {
      uni: true,
      wx: true,
    },
  },
];
